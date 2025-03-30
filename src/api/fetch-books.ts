import { endpoints } from "./endpoints";
import { BookData } from "../types";

export default async function fetchBooks(): Promise<BookData[]> {
  const url = endpoints.allBooks;

  const res = await fetch(url, { cache: "force-cache" });

  const jsonData = await res.json();

  return jsonData;
}
