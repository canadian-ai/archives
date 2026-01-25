import { put, list } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

// Upload a cover image to Vercel Blob
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const magazineId = formData.get("magazineId") as string;

    if (!file || !magazineId) {
      return NextResponse.json(
        { error: "Missing file or magazineId" },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob with a consistent path
    const blob = await put(`covers/${magazineId}.jpg`, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({
      url: blob.url,
      magazineId,
    });
  } catch (error) {
    console.error("Cover upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// Check if a cover exists
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const magazineId = searchParams.get("magazineId");

    if (!magazineId) {
      return NextResponse.json(
        { error: "Missing magazineId" },
        { status: 400 }
      );
    }

    // List blobs with the specific prefix
    const { blobs } = await list({
      prefix: `covers/${magazineId}`,
    });

    if (blobs.length > 0) {
      return NextResponse.json({
        exists: true,
        url: blobs[0].url,
      });
    }

    return NextResponse.json({ exists: false });
  } catch (error) {
    console.error("Cover check error:", error);
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}
