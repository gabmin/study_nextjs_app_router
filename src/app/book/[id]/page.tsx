import style from "./page.module.css";
import fetctTargetBooks from "@/api/fetch-target-books";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id: paramsId } = await params;
  const targetBook = await fetctTargetBooks(
    Array.isArray(paramsId) ? "" : paramsId,
  );

  if (!targetBook) return <>오류가 발생하였습니다.</>;

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
