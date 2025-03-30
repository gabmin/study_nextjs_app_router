import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import fetchSearchBooks from "@/api/fetch-search-books";
import delay from "@/utils/delay";

async function SearchBooks({ params }: { params: string }) {
  await delay(5000);
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
    <div>
      <SearchBooks params={query} />
    </div>
  );
}
