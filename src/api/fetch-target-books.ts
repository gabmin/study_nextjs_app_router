import { notFound } from "next/navigation";
import { BookData } from "../types";
import { endpoints } from "./endpoints";

export default async function fetctTargetBooks(
  id: string,
): Promise<BookData | null> {
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
