import { BookData } from "../types";
import { endpoints } from "./endpoints";

export default async function fetchSearchBooks(
  text: string,
): Promise<BookData[]> {
  const url = endpoints.searchBooks;

  try {
    const res = await fetch(`${url}/?q=${text}`);
    if (!res.ok) {
      throw new Error();
    }
    const resData = res.json();
    return resData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
