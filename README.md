# Nextjs App Router

## 목차

#### 1. [기타 정보](#기타-정보)

#### 2. [페이지 라우팅 설정](#2-페이지-라우팅-설정)

#### 3. [서버 컴포넌트](#3-서버-컴포넌트-server-component)

#### 4. [네비게이팅](#4-네비게이팅)

#### 5. [데이터 페칭](#5-데이터-페칭)

#### 6. [페이지 캐싱](#6-페이지-캐싱)

#### 7. [스트리밍](#스트리밍-streaming)

#### 8. [서버 액션](#서버-액션-server-actions)

#### 9. [고급 라우팅 패턴](#6-고급-라우팅-패턴)

#### 10. [최적화 및 SEO](#최적화-및-seo)

## 기타 정보

### 환경변수

환경 변수 생성시 `NEXT_PUBLIC` 라는 접두가 붙어야 nextjs에서 인식을 할 수 있다.

```
NEXT_PUBLIC_API_SERVER_URL=http://localhost
NEXT_PUBLIC_API_DEPLOY_SERVER_URL=https://.../
```

<br/>

### 버튼이 아닌 엘리먼트 form 태그로 이용하기

```typescript
export default function RevoewItemDeleteButton() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef}>
      <div
        className={style.delete_btn}
        onClick={() => formRef.current?.requestSubmit()}
      >
        삭제하기
      </div>
    </form>
  );
}
```

<br/>

### favicon 설정

app 폴더에 favicon.ico를 위치시키면 next.js에서 자동적으로 파비콘 이미지로 변경해준다.

<br/>

### 모달 뒷 배경 눌렀을때 뒤로가기 기능 구현

```typescript
export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <dialog
      className={style.modal}
      ref={dialogRef}
      onClose={() => router.back()}
      onClick={(e) => {
        // nodeName에 대한 타입이 아직 지정되어 있지 않아서 any로 명시함
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement,
  );
}
```

<br/>

### submit() vs requestSubmit()

#### submit()

- 폼을 강제로 제출할 때 사용됨
- 이벤트(submit 이벤트)가 발생하지 않음 (onsubmit 핸들러나 addEventListener('submit', ...)에 등록된 함수가 실행되지 않음)
- 유효성 검사(novalidate 속성이 없을 경우 required 등)가 자동으로 실행되지 않음

### requestSubmit()

- 브라우저가 실제 사용자가 제출하는 것처럼 동작하게 만듦.
- submit 이벤트가 정상적으로 발생함 (이벤트 리스너가 실행됨)
- 기본적인 폼의 유효성 검사가 수행됨.
- 특정한 submit 버튼을 지정할 수도 있음.

```javascript
const submitButton = document.getElementById("submitBtn");

// 특정 버튼을 지정하여 requestSubmit 실행
form.requestSubmit(submitButton);
```

<br/>

## 페이지 라우팅 설정

### 라우팅

`page.tsx`만 페이지로써 인식되어 라우팅 기능을 사용할 수 있음

```
- app
  ㄴ page.tsx
  ㄴ search
    ㄴ page.tsx
  ㄴ book
    ㄴ[id] // 동적 경로
      ㄴ page.tsx
    ㄴ [...id]  // 캐치 올 세그먼트
      ㄴ page.tsx
```

<br/>

### Params

모든 페이지는 props로 Params를 전달 받는다.
searchParams이라는 파라미터로 Promise 객체를 전달 받는다.

```typescript
export default async function Page ({searchParams}: {searchParams: Promise<id: string>}) {
  const { q } = await searchParams

  return (
    <>
    </>
  )
}
```

<br/>

### 레이아웃 설정

`layout.tsx`라는 이름으로 파일을 생성하주면 해당 페이지 및 하위의 모든 페이지에 레이아웃을 적용할 수 있다.
![레이아웃 설정](./public/readme/스크린샷%202025-04-01%20오후%208.12.19.png)
![레이아웃 설정2](./public/readme/스크린샷%202025-04-01%20오후%208.13.28.png)

```typescript
import { ReactNode } from "react";

export default function Layout({
  children.
} : {
  children: ReactNode
}) {
  return (
    <div>
      레이아웃 컨포넌트
      { children }
    </div>
  )
}
```

<br/>

### 라우트 그룹

만약 index 페이지에 레아이웃이 적용되어 있고 하위의 특정 페이지에는 레이아웃을 적용되지않게 하려면 라우트 그룹을 사용해야한다.
경로상에 아무런 영향을 미치지 않고 단지 그룹핑만 해주는 기능

```
- app
  ㄴ page.tsx   ----> index 페이지
  ㄴ layout.tsx
  ㄴ search
    ㄴ page.tsx
  ㄴ book
    ㄴ page.tsx   ----> 해당 페이지에는 레이아웃을 적용시키지 않고 싶을 경우

- app
  ㄴ (with-searchbar)
    ㄴ page.tsx   ----> index 페이지
    ㄴ layout.tsx
    ㄴ search
      ㄴ page.tsx
  ㄴ book
    ㄴ page.tsx   ----> 레이아웃에 영향을 받지 않음
```

<br/>

## 서버 컴포넌트 (Server Component)

![서버컨포넌트](./public/readme/스크린샷%202025-04-01%20오후%208.29.18.png)

페이지 라우트 버전에서는 하이드레이션을 위해 JS Bundle 파일을 불러오는데, 이때 하이드레이션에 필요없는 컴포넌트까지 다 불러오기 떄문에 성능저하가 발생함

이러한 다시 불러올 필요가 없는 컨포넌트(서버에서만 실행되는 컴포넌트)들을 서버 컨포넌트라고 한다.

공식문서에는 페이지 대부분을 서버 컨포넌트로 구성하고 필요한 경우에는 클라이언트 컨포넌트로 만들라고 권장한다.

서버컴포넌트는 서버에서만 실행되기 떄문에 클라이언트에서 실행되는 React Hook을 사용할 수 없다. (client 컴포넌트이라고 명시해야한다.)

```typescript
"use client";

export default function Page() {
  return <></>;
}
```

<br/>

### 주의 사항

1.  서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안된다.
    클라이언트 컴포넌트에서만 실행되는 리액트 훅을 사용할 수 없다.
2.  클라이언트 컴포넌트는 클라이언트에서만 실행되지 않는다.
    서버, 클라이언트 2번 실행된다.
3.  클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다.

    서버컨포넌트는 서버에서만 실행되기 때문에 클라이언트에서는 서버 컨포넌트가 없기 때문.

    이는 자주 발생하는 오류이기 때문에 **next.js에서 자체적으로 서버 컨포넌트를 클라이언트 컨포넌트로 변경한다.**

    만약 어쩔 수 없이 사용해야 하는 경우에는 children 으로 넘겨주는 방식을 사용한다. (클라이언트 컨포넌트로 변경되지 않는다.)

    ```typescript
    export default function Page() {
      return (
        <ClientComponent>
          <ServerComponent />
        </ClientComponent>
      );
    }

    export default function ClientComponent({
      children,
    }: {
      children: ReactNode;
    }) {
      return <>children</>;
    }
    ```

4.  서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화 되지 않는 Props는 전달 불가능하다.
    직렬화 : 객체, 배열 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 아주 단순한 형태(문자열, Byte)로 변환하는것

    자바스크립트에서 함수는 직렬화가 불가능 하다.

    ![서버컴포넌트2](./public/readme/스크린샷%202025-04-01%20오후%208.58.09.png)

    렌더링 과정에서 직렬화하여 RSC Payload(서버 컴포넌트와 관련된 모든 데이터)가 생성된다. 이때 props로 함수를 전달하면 함수를 직렬화할 수 없기 때문에 에러가 발생한다.

<br/>

## 네비게이팅(navigating)

페이지 이동시에는 CSR처럼 동작하며 JS Bundle 파일을 다시 불러온다.
![네비게이팅](./public/readme/스크린샷%202025-04-01%20오후%209.03.52.png)

app 라우트에서는 RSC Payload도 같이 전달된다.

![네비게이팅](./public/readme/스크린샷%202025-04-01%20오후%209.06.54.png)

<br/>

## 데이터 페칭 (Data Fetching)

서버 컴포넌트의 개념이 등장하면서 `async`키워드를 통해서 비동기 함수를 사용할 수 있게 되었다.
페이지 라우터의 `getServerSideProps`, `getStaticProps`를 대체한다.

```typescript
export async function Page(props) {
  const data = await fetch("...");

  return <div></div>;
}
```

<br/>

### 데이터 캐시

불 필요한 데이터 요청의 수를 줄여서 웹 서비스의 성능을 크게 개선하게 한다.

```typescript
const response = await fetch("url", options);

-options;
{
  cache: "no-store"; // 데이터 캐쉬를 적용하지 않음 (기본값)
}
{
  cache: "force-cache"; // 무조건 데이터를 캐싱하여 한번 호출 된 이후로는 다시 호출되지 않음.
}
{
  next: {
    revalidate: 10; // 10초 후에 데이터 캐쉬를 최산화 함.
  }
}
{
  next: {
    tages: ["a"]; // On-Demand Revalidate, 서버 액션과 같이 사용해서 a 태그를 호출하면 최신화함.
  }
}
```

<br/>

### 리퀘스트 메모이제이션 (Request Memoization)

하나의 페이지 안에서 중복적으로 사용되는 api를 캐싱하여 요청 횟수를 줄여주는 기능
**오직 페이지를 렌더링 하는 동안에만 동작하기 때문에 페이지를 이동하면 리퀘스트 메모이제이션에 저장된 캐쉬는 사라진다.**

![리퀘스트 메모이제이션](./public/readme/스크린샷%202025-04-02%20오후%203.43.40.png)

![리퀘스트 메모이제이션](./public/readme/스크린샷%202025-04-02%20오후%203.46.37.png)

<br/>

## 페이지 캐싱 (Page Caching)

### 풀 라우트 캐시 (Full Route Cache)

Next 서버 측에서 빌드 타임에 특정 페이지의 렌더링 결과를 캐싱하는 기능

Page Router의 SSG와 비슷하게 동작한다. revalidate를 설정하여 ISR과 유사하게 동작할 수 있다.

Static 페이지에만 적용 되며, dynamic 페이지에는 적용되지 않는다.

![풀라우트캐시](./public/readme/스크린샷%202025-04-03%20오후%208.54.37.png)

![풀라우트캐시2](./public/readme/스크린샷%202025-04-03%20오후%208.57.11.png)

페이지가 아닌 컴포넌트에서 Params 값을 가져오는 `useSearchParams`훅을 사용하면 Dynamic Page로 인식되지 않는다.
이때 풀 라우트 캐시에 의해서 빌트 다음에 생성하게 되는데 Params 값을 알 수 없기때문에 에러가 발생한다.
이때는 이 컴포넌트를 `Suspense`로 감싸줘서 클라이언트에서만 실행되도록 설정해줘야한다.

```typescript
export default function Page() {
  return (
    <Suspense fallback={<div>로딩중..</div>}>
      <SearchBar></SearchBar>
    </Suspense>
  );
}
```

![풀라우트캐시3](./public/readme/스크린샷%202025-04-03%20오후%208.57.52.png)

![풀라우트캐시4](./public/readme/스크린샷%202025-04-03%20오후%209.03.04.png)

<br/>

### generateStaticParams

동적 경로를 갖는 페이지에 풀 라우트 캐시를 적용하고 싶은 경우에 사용한다.
page Router의 getStaticPaths와 비슷하게 동작한다.

```typescript
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

export default function Page({ params }: { params: { id: string } }) {
  return <div></div>;
}
```

<br/>

### 라우트 세그먼트 옵션

특정 페이지의 데이터 캐싱이나 리벨리데이트 동작을 강제할 수 있는 기능

1. dynamicParams

generateStaticParams로 명시해준 params 이외에 데이터에 접근하게 되면 404 에러페이지로 이동시킨다.

```typescript
export const dynamicParams = false;

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
```

<br/>

2. dynamic

특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정해주는 기능 **(권장되지 않음)**

1. auto: 기본값, 아무것도 강제하지 않음
2. force-dynamic: 페이지를 강제로 Dynamic 페이지로 설정
3. force-static: 페이지를 강제로 Static 페이지로 설정

- params 같은 동적 데이터는 undefined로 설정됨
- 데이터 캐쉬의 옵션이 force-cache로 변경됨

4. error: 페이지를 강제로 Static 페이지로 설정 (설정이 안되는 경우 -> 빌드 오류로 노출)

```
export const dynamic = 'auto'
export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'
export const dynamic = 'error'
```

<br/>

### 클라이언트 라우터 캐시

브라우저에 저장되는 캐시로 페이지 이동을 효율적으로 진행하기 위해 페이지의 일부 데이터를 보관

Next.js에서 자동적으로 적용

새로고침하면 캐시는 사라짐

ex. 레이아웃에 현재 시간을 노출시키고 있다고 할때 검색을 통해 리렌더링이 되어도 레이아웃은 리렌더링되지 않아 시간이 변경되지 않음

![라우트 캐시1](./public/readme/스크린샷%202025-03-30%20오후%2012.17.27.png)

![라우트 캐시2](./public/readme/스크린샷%202025-03-30%20오후%2012.20.30.png)

중복된 레이아웃이나 컴포넌트가 계속 요청하는 문제가 발생하여 클라이언트 라우터 캐시에 저장하여 반환함

![라우트 캐시2](./public/readme/스크린샷%202025-03-30%20오후%2012.24.52.png)

<br/>

## 스트리밍 (Streaming)

- 용량이 매우 큰 데이터를 잘게 쪼개서 마치 강물이 흐르듯이 끊기지 않고 데이터를 전송시켜주는 기술

- 비동기 작업이 포함된 페이지에서 모든 컴포넌트를 기다리다가 렌더링하지 않고 렌더링 할 수 있는 컴포넌트는 미리 렌더링 시켜준다.

![스트리밍](./public/readme/스크린샷%202025-03-30%20오후%203.06.08.png)

- 스트리밍을 적용하고 싶은 페이지에 동일한 폴더에 `loading.tsx` 파일을 만들어주면 스트리밍을 적용한 페이지가 로딩되는 동안 `loading.tsx` 파일이 노출된다.

  > ❗️주의
  >
  > 1. 이 `loading.tsx` 는 layout 컴포넌트 처럼 하위에 컴포넌트에 모두 적용된다.
  > 2. loading 기능은 async가 붙어있는 컴포넌트에서만 동작한다.
  > 3. 오직 페이지 컨포넌트 (page.tsx)에만 적용할 수 있다.
  > 4. 쿼리스트링이 변경되는 경우에는 작동되지 않는다.

- 페이지가 아닌 컴포넌트에 스트리밍을 적용하기 위해서는 `Suspense`를 활용한다.

  ```typescript
  <Suspense fallback={<div>Loading...</div>}>
    <SearchBooks params={query} />
  </Suspense>
  ```

- 컴포넌트 스트리밍도 쿼리스트링이 변경 될 경우에는 동작하지 않는데 key 값을 추가함으로써 동작하도록 할 수 있다.

  ```typescript
  <Suspense key={params} fallback={<div>Loading...</div>}>
    <SearchBooks params={query} />
  </Suspense>
  ```

- Suspense는 병렬로도 동작하여 한 컴포넌트 안에 모든 비동기 요소를 기다릴 필요없이 동작이 완료되는대로 개별로 렌더링이 가능하다.

  ```typescript
  <div className={style.container}>
    <section>
      <h3>지금 추천하는 도서</h3>  -> 3초 뒤 노출
      <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
        <RecommendBooks />
      </Suspense>
    </section>
    <section>
      <h3>등록된 모든 도서</h3> -> 1.5초 뒤 노출
      <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
        <AllBooks />
      </Suspense>
    </section>
  </div>
  ```

- page 스트리밍보다 컴포넌트 스트리밍(Suspense)가 범용적으로 사용된다.

<br/>

## 에러 핸들링 (Error Handling)

- 페이지 스트리밍 적용하는 방법처럼 동일한 폴더에 `error.tsx` 파일을 만들어주면 비동기 작업중 에러가 발생하게 되면 `error.tsx` 파일이 노출된다.
- 에러페이지는 서버든 클리이언트든 모두에서 동작해야하기 떄문에 클라이언트 컴포넌트로 만들어야한다.
- reset 기능은 클라이언트 측에서만 재실행하는 기능이기 때문에 서버컴포넌트는 재실행 되지 않는다.
- 따라서, router 객체를 불러와 `router.refresh()`를 실행시켜 준다.
- 하지만, `router.refresh()`는 비동기적으로 동작하기 때문에 원하는 결과를 얻지 못하기 때문에 `startTrnasition`이라는 매서드를 사용한다.

  ```typescript
  "use client";

  export default function Error({
    error,
    reset,
  }: {
    error: Error;
    reset: () => void;
  }) {
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
          }
        >
          다시 시도
        </button>
      </div>
    );
  }
  ```

  <br>

## 서버 액션 (Server Actions)

서버에서 직접 실행되는 함수. API 라우트를 따로 만들지 않아도 백엔드 로직을 프론트 코드 안에 자연스럽게 작성할 수 있다.
서버에서만 실행되도록 `use serve`를 명시해줘야한다.

### 장점

1. API 라우트 대체
   `/api/xxx.ts` 처럼 API 라우트를 만들 필요없이 직접 DB에 접근할 수 있다.
2. 보안 강화
   서버 액션은 서버에서만 실행되기 때문에, DB 접근 로직이나 비밀 키가 노출될 일이 없다.
3. 직접적인 form 처리 가능
   form 태그에 서버 액션을 바로 연결할 수 있어서 전통적인 HTML 폼 방식과 비슷하게 동작하면서 백엔드 작업을 수행할 수 있다.

- form tag에서 서버 액션을 사용하여 마치 api처럼 서버에 요청할 수 있다.
- formData로 입렵 정보가 전달됨

```typescript
function ReviewEditor() {
  async function createReviewAction() {
    "use serve";

    // 해당 로직을 서버로 요청함
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    if (!bookId || !content || !author) return;
  }

  return (
    <section>
      <form action={createReviewAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <input required name="content" placeholder="리뷰 내용" />
        <input required name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}
```

### 서버액션 재검증

`revalidatePath`를 이용하여 Next.js의 서버 액션에서 특정 경로의 캐시를 무효화(리로드)한다.

만약 리뷰를 작성했다고 가정했을때 등록한 리뷰가 보여야하지만 보이지 않아 최신화해줘야한다.

**오직 서버에서만 실행할 수 있는 함수이기 때문에 서버액션 내부나 서버 컨포넌트에서만 사용이 가능하다.**

**데이터 페칭 옵션을 `force-cache`으로 설정했더라도 함수를 사용하게 되면 무효화 되버린다.**
**또한 풀라우트캐쉬가 업데이트 되지 않는다.**

![revalidatePath1](./public/readme/스크린샷%202025-03-31%20오후%2012.56.38.png)
![revalidatePath2](./public/readme/스크린샷%202025-03-31%20오후%2012.59.31.png)

```typescript
 ## 옵션
 revalidatePath(originalPath: string, type?: 'layout' | 'page')

 1. 특정 주소에 해당하는 페이지만 재검증
 revalidatePath(`/book/${bookId}`)

 2. 특정 경로의 모든 페이지를 재검증 (폴더의 경로)
 revalidatePath("/book/[id]", 'page')

 3. 특정 레이아웃을 갖는 모든 페이지 재검증
 revalidatePath('/(with-searchbar)', 'layout')

 4. 모든 페이지 재검증
 revalidatePath('/', 'layout')

 5. 태그 기준 데이터 캐시 재검증 - 가장 효율적인 방법
 const response = await fetch(url, { next: { tags: [`review-${bookId}`]}})

 revalidateTag(`review-${bookId}`)
```

```typescript
export const fetchCreateReview = async ({
  bookId,
  content,
  author,
}: {
  bookId: string;
  content: string;
  author: string;
}) => {
  const response = await fetch(endpoints.review, {
    method: "POST",
    body: JSON.stringify({
      bookId,
      content,
      author,
    }),
  });

  revalidatePath(`/book/${bookId}`);
  return response;
};
```

<br/>

### 클라이언트 컴포넌트에서의 서버 액션 (useActionState)

form action 결과를 기반으로 상태를 업데이트 할 수 있도록 제공하는 React hook
React 19 버전부터 `useFormState`에서 `useActionState`로 변경

```typescript
const [state, formAction, isPending] = useActionState(
  (createReviewAction = 서버액션),
  (null = 초기값),
);

// state : { status: boolean, error: string }

useEffect(() => {
  if(state && !state.status) {
    alert(state.error);
  }
}, [state])

<form action={formAction}>...</form>;
```

<br/>

## 고급 라우팅 패턴

### 병렬 라우트 (Parallel Route)

`slot`이라고 불리는 @sidebar 같은 페이지를 생성하여 병렬적으로 라우팅해주는 기능

![병렬 라우트](./public/readme/스크린샷%202025-03-31%20오후%205.21.22.png)
![병렬 라우트2](./public/readme/스크린샷%202025-03-31%20오후%205.27.35.png)

<br/>

### 인터셉팅 라우트 (Intercepting Route)

특정 조건에 따라 다른 페이지를 보여주는 기능
CSR 방식으로 Link 혹은 Router push를 통해서 접근하는 경우에는 다른 페이지를 보여주는 방식
예를들어, 인스타그램에서 게시글을 클릭하면 모달 형태의 화면으로 노출되지만, 새로고침하면 한 페이지 형태로 변경됨

![인터셉팅 라우트](./public/readme/스크린샷%202025-03-31%20오후%205.43.48.png)

`book[id]`페이지를 인터셉터 하기 위해서는 `(.)book[id]`라는 폴더를 생성해서 페이지를 만들어준다.
`(.)`은 상대경로로 상황에 따라 `(..)` `(..)(..)` 와 같은식으로 사용할 수 있다.

<br/>

## 최적화 및 SEO

### 이미지 최적화

nextjs에는 이미지 최적화에 관련된 모든 기능들을 자체적으로 제공하고 있다.
**외부에서 가져오는 이미지('https://xxx')는 보안상 문제로 에러가 발생하여 next.cofig.js 의 설정을 변경해줘야한다.**

![최적화](./public/readme/스크린샷%202025-03-31%20오후%206.32.28.png)

```typescript
<Image
  src={coverImgUrl}
  width={80} // 이미지 사이즈 최적화를 위해 필요
  height={105}
  alt={`도서 ${title}의 표지 이미지`}
/>
```

```javascript
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
        pathname: "**",
      },
    ],
  },
};
```

<br/>

### MetaData 설정

next.js 에서 제공하는 기능을 통해 쉽게 적용할 수 있다.

```typescript
export const metadata: Metadata = {
  title: "한입 북스",
  description: "한입 북스에 등록된 도서를 만나보세요.",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요.",
    images: ["/thumnail.png"],
  },
};
```

params 정보를 가져와야하는 경우에는 `generateMetadata`라는 함수를 활용하여 적용할 수 있다.

```typescript
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q} : 한입북스`,
    description: `${q}의 검색 결과입니다.`,
    openGraph: {
      title: `${q} : 한입북스`,
      description: `${q}의 검색 결과입니다.`,
      images: ["/thumnail.png"],
    },
  };
}
```

<br/>

---

출처: 한 입 크기로 잘라먹는 Next.js - 이정환
