// IndexedDB wrapper for caching PDFs locally
const DB_NAME = 'CanadianAIMagazineCache';
const STORE_NAME = 'pdfs';
const DB_VERSION = 1;

interface CachedPDF {
  id: string;
  url: string;
  data: ArrayBuffer;
  timestamp: number;
}

class PDFCache {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  async get(id: string): Promise<ArrayBuffer | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const cached = request.result as CachedPDF | undefined;
        resolve(cached?.data || null);
      };
    });
  }

  async set(id: string, url: string, data: ArrayBuffer): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const cached: CachedPDF = {
        id,
        url,
        data,
        timestamp: Date.now(),
      };
      const request = store.put(cached);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async has(id: string): Promise<boolean> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(!!request.result);
    });
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const pdfCache = new PDFCache();

// Helper function to fetch PDF with caching
export async function fetchPDFWithCache(
  id: string,
  originalUrl: string,
  onProgress?: (loaded: number, total: number) => void
): Promise<ArrayBuffer> {
  // Try to get from cache first
  const cached = await pdfCache.get(id);
  if (cached) {
    console.log('[v0] PDF loaded from cache:', id);
    return cached;
  }

  console.log('[v0] Fetching PDF from network:', id);

  // Build proxy URL
  const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(originalUrl)}`;

  // Fetch with progress tracking
  const response = await fetch(proxyUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
  }

  const contentLength = response.headers.get('content-length');
  const total = contentLength ? parseInt(contentLength, 10) : 0;

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    chunks.push(value);
    loaded += value.length;

    if (onProgress && total > 0) {
      onProgress(loaded, total);
    }
  }

  // Combine chunks into single ArrayBuffer
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const combined = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  const arrayBuffer = combined.buffer;

  // Cache the PDF
  try {
    await pdfCache.set(id, originalUrl, arrayBuffer);
    console.log('[v0] PDF cached successfully:', id);
  } catch (error) {
    console.warn('[v0] Failed to cache PDF:', error);
  }

  return arrayBuffer;
}
