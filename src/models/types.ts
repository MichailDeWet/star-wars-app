export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  url: string;
};

export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  url: string;
};

export type TSortable = "alpha" | "number" | "time";
export type TSortDirection = "asc" | "desc";

export type TableHeadings<T> = {
  key: keyof T;
  label: string;
  width: string;
  sortableType?: TSortable;
};
