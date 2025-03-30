import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import fetchBooks from "@/api/fetch-books";
import fetchRandomBooks from "@/api/fetch-random-books";

// 클라언트 컴포넌트와 서버 컴포넌트로 구분하기 위해 분리
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

// 클라언트 컴포넌트와 서버 컴포넌트로 구분하기 위해 분리
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

// 서버 컨포넌트로 실행
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
