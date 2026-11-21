import { put, list } from "@vercel/blob";
import { timingSafeEqual } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";

const MAX_COVER_BYTES = 5 * 1024 * 1024;
const VALID_ID = /^[a-zA-Z0-9_-]{1,100}$/;

function authorized(request: NextRequest): boolean {
  const secret = process.env.COVER_UPLOAD_SECRET;
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!secret || !token) return false;
  const expected = Buffer.from(secret);
  const supplied = Buffer.from(token);
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}

// Covers are writable only by a caller holding COVER_UPLOAD_SECRET.
export async function POST(request: NextRequest) {
  if (!process.env.COVER_UPLOAD_SECRET) {
    return NextResponse.json({ error: "Cover uploads are not configured" }, { status: 503 });
  }
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const magazineId = formData.get("magazineId");
    if (!(file instanceof File) || typeof magazineId !== "string" || !VALID_ID.test(magazineId)) {
      return NextResponse.json({ error: "Invalid file or magazineId" }, { status: 400 });
    }
    if (file.type !== "image/jpeg" || file.size === 0 || file.size > MAX_COVER_BYTES) {
      return NextResponse.json({ error: "A JPEG under 5MB is required" }, { status: 400 });
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (bytes.length < 3 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
      return NextResponse.json({ error: "Invalid JPEG content" }, { status: 400 });
    }
    const blob = await put(`covers/${magazineId}.jpg`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: "image/jpeg",
    });
    return NextResponse.json({ url: blob.url, magazineId });
  } catch (error) {
    console.error("Cover upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const magazineId = new URL(request.url).searchParams.get("magazineId");
    if (!magazineId || !VALID_ID.test(magazineId)) {
      return NextResponse.json({ error: "Invalid magazineId" }, { status: 400 });
    }
    const { blobs } = await list({ prefix: `covers/${magazineId}.jpg` });
    const match = blobs.find((blob) => blob.pathname === `covers/${magazineId}.jpg`);
    return match
      ? NextResponse.json({ exists: true, url: match.url })
      : NextResponse.json({ exists: false });
  } catch (error) {
    console.error("Cover check error:", error);
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}
