import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import fetchBooks from "@/api/fetch-books";

async function Footer() {
  const response = await fetchBooks();
  const bookCount = response.length;

  return (
    <>
      <footer>
        <div>제작 @winterlood</div>
        <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
      </footer>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
