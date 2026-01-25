"use client";

// Type for PDF.js module
type PDFjsLib = typeof import("pdfjs-dist");

// PDF.js is loaded dynamically to avoid SSR issues with DOMMatrix
let pdfjsLib: PDFjsLib | null = null;
let pdfjsLoadPromise: Promise<PDFjsLib> | null = null;

async function loadPdfJs(): Promise<PDFjsLib> {
  // Return cached instance
  if (pdfjsLib) {
    return pdfjsLib;
  }
  
  // Return existing promise if already loading
  if (pdfjsLoadPromise) {
    return pdfjsLoadPromise;
  }
  
  // Create new loading promise
  pdfjsLoadPromise = (async () => {
    const lib = await import("pdfjs-dist");
    lib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${lib.version}/build/pdf.worker.mjs`;
    pdfjsLib = lib;
    return lib;
  })();
  
  return pdfjsLoadPromise;
}

// IndexedDB for client-side caching
const DB_NAME = "canadian-ai-covers";
const STORE_NAME = "covers";
const DB_VERSION = 1;

interface CachedCover {
  id: string;
  dataUrl: string;
  blobUrl?: string;
  timestamp: number;
}

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

async function getCachedCover(id: string): Promise<CachedCover | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  } catch {
    return null;
  }
}

async function setCachedCover(cover: CachedCover): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(cover);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch {
    // Silently fail
  }
}

// Check if cover exists in Blob storage
async function checkBlobCover(magazineId: string): Promise<string | null> {
  try {
    const response = await fetch(
      `/api/cover/upload?magazineId=${encodeURIComponent(magazineId)}`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.exists && data.url) {
        return data.url;
      }
    }
    return null;
  } catch {
    return null;
  }
}

// Upload cover to Blob storage
async function uploadCoverToBlob(
  magazineId: string,
  dataUrl: string
): Promise<string | null> {
  try {
    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Create form data
    const formData = new FormData();
    formData.append("file", blob, `${magazineId}.jpg`);
    formData.append("magazineId", magazineId);

    // Upload to API
    const uploadResponse = await fetch("/api/cover/upload", {
      method: "POST",
      body: formData,
    });

    if (uploadResponse.ok) {
      const data = await uploadResponse.json();
      return data.url;
    }
    return null;
  } catch {
    return null;
  }
}

// Generate cover from PDF
async function generateCoverFromPDF(pdfUrl: string): Promise<string> {
  // Load PDF.js dynamically
  const pdfjs = await loadPdfJs();
  
  // Fetch PDF via proxy
  const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch PDF");
  }

  const arrayBuffer = await response.arrayBuffer();

  // Load PDF
  const loadingTask = pdfjs.getDocument({
    data: arrayBuffer,
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
  });

  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);

  // Render at high resolution for quality
  const scale = 2;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to get canvas context");
  }

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  // Convert to JPEG data URL
  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

  // Cleanup
  page.cleanup();
  pdf.destroy();

  return dataUrl;
}

// Main function to get cover with multi-layer caching
export async function getCover(
  magazineId: string,
  pdfUrl: string,
  onProgress?: (status: string) => void
): Promise<string> {
  // 1. Check IndexedDB cache first (fastest)
  const cachedCover = await getCachedCover(magazineId);
  if (cachedCover) {
    // If we have a blob URL, use that
    if (cachedCover.blobUrl) {
      onProgress?.("Loaded from cache");
      return cachedCover.blobUrl;
    }
    // Otherwise use the data URL
    onProgress?.("Loaded from cache");
    return cachedCover.dataUrl;
  }

  // 2. Check Vercel Blob storage (persistent, CDN-cached)
  onProgress?.("Checking cloud storage...");
  const blobUrl = await checkBlobCover(magazineId);
  if (blobUrl) {
    // Cache in IndexedDB for future
    await setCachedCover({
      id: magazineId,
      dataUrl: blobUrl,
      blobUrl,
      timestamp: Date.now(),
    });
    onProgress?.("Loaded from cloud");
    return blobUrl;
  }

  // 3. Generate from PDF
  onProgress?.("Generating cover...");
  const dataUrl = await generateCoverFromPDF(pdfUrl);

  // 4. Upload to Blob storage for persistence
  onProgress?.("Saving to cloud...");
  const uploadedUrl = await uploadCoverToBlob(magazineId, dataUrl);

  // 5. Cache in IndexedDB
  await setCachedCover({
    id: magazineId,
    dataUrl,
    blobUrl: uploadedUrl || undefined,
    timestamp: Date.now(),
  });

  onProgress?.("Complete");
  return uploadedUrl || dataUrl;
}
