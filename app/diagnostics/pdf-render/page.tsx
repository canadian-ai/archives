import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMagazineById } from "@/lib/magazine-data";
import { PdfRenderDiagnostic } from "./pdf-render-diagnostic";

export const metadata: Metadata = {
  title: "PDF render diagnostic | Canadian AI Archives",
  robots: { index: false, follow: false },
};

interface DiagnosticPageProps {
  searchParams: Promise<{ id?: string; page?: string }>;
}

export default async function PdfRenderDiagnosticPage({
  searchParams,
}: DiagnosticPageProps) {
  const query = await searchParams;
  const magazine = getMagazineById(query.id ?? "vol-1");

  if (!magazine) {
    notFound();
  }

  const requestedPage = Number.parseInt(query.page ?? "1", 10);
  const pageNumber = Number.isFinite(requestedPage)
    ? Math.max(1, requestedPage)
    : 1;

  return (
    <PdfRenderDiagnostic
      magazine={magazine}
      pageNumber={pageNumber}
    />
  );
}
