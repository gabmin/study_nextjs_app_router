// 에러페이지는 서버든 클리이언트든 모두에서 동작해야하기 떄문에 클라이언트 컴포넌트로 만들어야한다
"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// reset 기능은 클라이언트 측에서만 재실행하는 기능이기 때문에 서버컴포넌트는 재실행 되지 않는다.
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생하였습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            // UI를 변경시키는 모든 로직을 일괄적으로 동작시킴
            router.refresh(); // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링한다.
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
