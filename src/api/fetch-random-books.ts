import { BookData } from "../types";
import { endpoints } from "./endpoints";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = endpoints.randomBooks;

  const res = await fetch(url, { next: { revalidate: 3 } });

  const resData = await res.json();
  return resData;
}
