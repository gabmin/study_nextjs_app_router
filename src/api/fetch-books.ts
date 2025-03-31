import { endpoints } from "./endpoints";
import { BookData } from "../types";
import { notFound } from "next/navigation";

export async function fetchBooks(): Promise<BookData[]> {
  const url = endpoints.allBooks;

  const res = await fetch(url, { cache: "force-cache" });

  const jsonData = await res.json();

  return jsonData;
}

export async function fetchRandomBooks(): Promise<BookData[]> {
  const url = endpoints.randomBooks;

  const res = await fetch(url, { next: { revalidate: 3 } });

  const resData = await res.json();
  return resData;
}

export async function fetchSearchBooks(text: string): Promise<BookData[]> {
  const url = endpoints.searchBooks;

  try {
    const res = await fetch(`${url}/?q=${text}`, { cache: "force-cache" });
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

export async function fetctTargetBooks(id: string): Promise<BookData | null> {
  const url = `${endpoints.allBooks}/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
    }
    const jsonData = await res.json();

    return jsonData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
