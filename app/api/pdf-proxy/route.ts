export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response('Missing URL parameter', { status: 400 });
  }

  try {
    // Fetch the PDF from the external source
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CanadianAIArchives/1.0)',
      },
    });

    if (!response.ok) {
      return new Response('Failed to fetch PDF', { status: response.status });
    }

    // Get the PDF data
    const pdfData = await response.arrayBuffer();

    // Return the PDF with proper headers
    return new Response(pdfData, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error proxying PDF:', error);
    return new Response('Error fetching PDF', { status: 500 });
  }
}
