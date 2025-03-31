"use client";

import { useActionState, useEffect, useRef } from "react";
import style from "./review-item.module.css";
import deleteReviewAction from "@/app/actions/delete-review.action";

export default function RevoewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" readOnly hidden value={reviewId} />
      <input name="bookId" readOnly hidden value={bookId} />
      {isPending ? (
        <div>...</div>
      ) : (
        <div
          className={style.delete_btn}
          onClick={() => formRef.current?.requestSubmit()}
        >
          삭제하기
        </div>
      )}
    </form>
  );
}
