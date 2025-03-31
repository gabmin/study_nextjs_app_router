import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { fetchBooks, fetchRandomBooks } from "@/api/fetch-books";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

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

export const dynamic = "force-dynamic";

// 서버 컨포넌트로 실행
export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense
          fallback={
            <>
              <BookListSkeleton count={3} />
            </>
          }
        >
          <RecommendBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense
          fallback={
            <>
              <BookListSkeleton count={10} />
            </>
          }
        >
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
