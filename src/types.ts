export interface Page {
  id: number;
  status: "draft" | "published";
  sort: number;
  foreign_key: number | null;
  url: string;
  title: string;
  children: Page[];
}
