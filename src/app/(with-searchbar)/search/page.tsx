import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { fetchSearchBooks } from "@/api/fetch-books";

import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchBooks({ params }: { params: string }) {
  const searchBooks = await fetchSearchBooks(params);

  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";

  return (
    <Suspense fallback={<BookListSkeleton count={3} />}>
      <SearchBooks params={query} />
    </Suspense>
  );
}
