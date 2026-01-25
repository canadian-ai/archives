export interface Magazine {
  id: string;
  title: string;
  volume: number;
  date: string;
  year: number;
  pdfUrl: string;
  coverColor: string;
}

const coverColors = [
  "from-blue-600/20 to-cyan-600/20",
  "from-emerald-600/20 to-teal-600/20",
  "from-violet-600/20 to-purple-600/20",
  "from-amber-600/20 to-orange-600/20",
  "from-rose-600/20 to-pink-600/20",
  "from-indigo-600/20 to-blue-600/20",
];

export const magazines: Magazine[] = [
  { id: "vol-1", title: "Canadian AI", volume: 1, date: "September 1984", year: 1984, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%201%20-%20September%201984.pdf", coverColor: coverColors[0] },
  { id: "vol-2", title: "Canadian AI", volume: 2, date: "December 1984", year: 1984, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%202%20-%20December%201984.pdf", coverColor: coverColors[1] },
  { id: "vol-3", title: "Canadian AI", volume: 3, date: "March 1985", year: 1985, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%203%20-%20March%201985.pdf", coverColor: coverColors[2] },
  { id: "vol-4", title: "Canadian AI", volume: 4, date: "June 1985", year: 1985, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%204%20-%20June%201985.pdf", coverColor: coverColors[3] },
  { id: "vol-5", title: "Canadian AI", volume: 5, date: "September 1985", year: 1985, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%205%20-%20September%201985.pdf", coverColor: coverColors[4] },
  { id: "vol-6", title: "Canadian AI", volume: 6, date: "December 1985", year: 1985, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%206%20-%20December%201985.pdf", coverColor: coverColors[5] },
  { id: "vol-7", title: "Canadian AI", volume: 7, date: "March 1986", year: 1986, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%207%20-%20March%201986.pdf", coverColor: coverColors[0] },
  { id: "vol-8", title: "Canadian AI", volume: 8, date: "June 1986", year: 1986, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%208%20-%20June%201986.pdf", coverColor: coverColors[1] },
  { id: "vol-9", title: "Canadian AI", volume: 9, date: "September 1986", year: 1986, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%209%20-%20September%201986.pdf", coverColor: coverColors[2] },
  { id: "vol-10", title: "Canadian AI", volume: 10, date: "January 1987", year: 1987, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2010%20-%20January%201987.pdf", coverColor: coverColors[3] },
  { id: "vol-11", title: "Canadian AI", volume: 11, date: "April 1987", year: 1987, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2011%20-%20April%201987.pdf", coverColor: coverColors[4] },
  { id: "vol-12", title: "Canadian AI", volume: 12, date: "July 1987", year: 1987, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2012%20-%20July%201987.pdf", coverColor: coverColors[5] },
  { id: "vol-13", title: "Canadian AI", volume: 13, date: "October 1987", year: 1987, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2013%20-%20October%201987.pdf", coverColor: coverColors[0] },
  { id: "vol-14", title: "Canadian AI", volume: 14, date: "January 1988", year: 1988, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2014%20-%20January%201988.pdf", coverColor: coverColors[1] },
  { id: "vol-15", title: "Canadian AI", volume: 15, date: "April 1988", year: 1988, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2015%20-%20April%201988.pdf", coverColor: coverColors[2] },
  { id: "vol-16", title: "Canadian AI", volume: 16, date: "July 1988", year: 1988, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2016%20-%20July%201988.pdf", coverColor: coverColors[3] },
  { id: "vol-17", title: "Canadian AI", volume: 17, date: "October 1988", year: 1988, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2017%20-%20October%201988.pdf", coverColor: coverColors[4] },
  { id: "vol-18", title: "Canadian AI", volume: 18, date: "January 1989", year: 1989, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2018%20-%20January%201989.pdf", coverColor: coverColors[5] },
  { id: "vol-19", title: "Canadian AI", volume: 19, date: "April 1989", year: 1989, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2019%20-%20April%201989.pdf", coverColor: coverColors[0] },
  { id: "vol-20", title: "Canadian AI", volume: 20, date: "July 1989", year: 1989, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2020%20-%20July%201989.pdf", coverColor: coverColors[1] },
  { id: "vol-21", title: "Canadian AI", volume: 21, date: "October 1989", year: 1989, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2021%20-%20October%201989.pdf", coverColor: coverColors[2] },
  { id: "vol-22", title: "Canadian AI", volume: 22, date: "January 1990", year: 1990, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2022%20-%20January%201990.pdf", coverColor: coverColors[3] },
  { id: "vol-23", title: "Canadian AI", volume: 23, date: "April 1990", year: 1990, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2023%20-%20April%201990.pdf", coverColor: coverColors[4] },
  { id: "vol-24", title: "Canadian AI", volume: 24, date: "July 1990", year: 1990, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2024%20-%20July%201990.pdf", coverColor: coverColors[5] },
  { id: "vol-25", title: "Canadian AI", volume: 25, date: "November 1990", year: 1990, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2025%20-%20November%201990.pdf", coverColor: coverColors[0] },
  { id: "vol-26", title: "Canadian AI", volume: 26, date: "February 1991", year: 1991, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2026%20-%20February%201991.pdf", coverColor: coverColors[1] },
  { id: "vol-27", title: "Canadian AI", volume: 27, date: "Summer 1991", year: 1991, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2027%20-%20Summer%201991.pdf", coverColor: coverColors[2] },
  { id: "vol-28", title: "Canadian AI", volume: 28, date: "Autumn 1991", year: 1991, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2028%20-%20Autumn%201991.pdf", coverColor: coverColors[3] },
  { id: "vol-29", title: "Canadian AI", volume: 29, date: "Summer 1992", year: 1992, pdfUrl: "https://www.caiac.ca/sites/default/files/shared/canai-archives/CAI%20Volume%2029%20-%20Summer%201992.pdf", coverColor: coverColors[4] },
];

export function getMagazineById(id: string): Magazine | undefined {
  return magazines.find((m) => m.id === id);
}

export function getMagazinesByYear(year: number): Magazine[] {
  return magazines.filter((m) => m.year === year);
}

export function getYears(): number[] {
  return [...new Set(magazines.map((m) => m.year))].sort();
}
