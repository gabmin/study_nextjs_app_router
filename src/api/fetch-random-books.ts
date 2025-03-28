import { BookData } from "../types";
import { endpoints } from "./endpoints";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = endpoints.randomBooks;

  try {
    const res = await fetch(url, { next: { revalidate: 3 } });
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
