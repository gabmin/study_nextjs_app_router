import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import fetchBooks from "@/api/fetch-books";
import fetchRandomBooks from "@/api/fetch-random-books";

async function AllBooks() {
  const allBooks = await fetchBooks();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecommendBooks() {
  const recommendBooks = await fetchRandomBooks();

  return (
    <div>
      {recommendBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecommendBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
