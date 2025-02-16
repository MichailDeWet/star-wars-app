export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

export type TSortable = "alpha" | "number" | "time";
export type TSortDirection = "asc" | "desc";

export type TableHeadings = {
  key: keyof Film;
  label: string;
  width: string;
  sortableType?: TSortable;
};
