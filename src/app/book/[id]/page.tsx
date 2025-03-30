import { notFound } from "next/navigation";
import style from "./page.module.css";
import fetctTargetBooks from "@/api/fetch-target-books";

// generateStaticParams로 명시하지 않은 페이지는 404 페이지로 이동시킴
// 데이터가 존재하더라도 id:4 페이지로 접근하면 404 페이지 노출
// export const dynamicParams = false;

// 동적 경로에 1,2,3 페이지를 명시해서 정적 페이지로 만들어 놓을 수 있음
// 마치 ISR on-demand 방식과 유사함 (풀라우트 캐시로서 저장됨 - .next 폴더)
// getStaticPath
export function generateStaticParams() {
  return [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id: paramsId } = await params;
  const targetBook = await fetctTargetBooks(
    Array.isArray(paramsId) ? "" : paramsId,
  );

  if (!targetBook) {
    notFound();
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    targetBook;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
