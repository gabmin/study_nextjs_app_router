import { endpoints } from "./endpoints";
import { BookData } from "../types";

export default async function fetchBooks(): Promise<BookData[]> {
  const url = endpoints.allBooks;

  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) {
      throw new Error();
    }
    const jsonData = await res.json();

    return jsonData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
