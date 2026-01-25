import { notFound } from "next/navigation";
import { getMagazineById, magazines } from "@/lib/magazine-data";
import { ViewerClient } from "./viewer-client";

interface ViewerPageProps {
  params: Promise<{ id: string }>;
}

export default async function ViewerPage({ params }: ViewerPageProps) {
  const { id } = await params;
  const magazine = getMagazineById(id);

  if (!magazine) {
    notFound();
  }

  const currentIndex = magazines.findIndex((m) => m.id === id);
  const prevMagazine = currentIndex > 0 ? magazines[currentIndex - 1] : null;
  const nextMagazine =
    currentIndex < magazines.length - 1 ? magazines[currentIndex + 1] : null;

  return (
    <ViewerClient
      magazine={magazine}
      prevMagazine={prevMagazine}
      nextMagazine={nextMagazine}
      totalMagazines={magazines.length}
    />
  );
}
