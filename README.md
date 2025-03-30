# Nextjs App Router

## 라우트 세그먼트 옵션

- 특정 페이지의 데이터 캐싱이나 리벨리데이트 동작을 강제할 수 있는 기능

### dynamicParams

generateStaticParams로 명시해준 params 이외에 데이터에 접근하게 되면 404 에러페이지로 이동시킨다.

```
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

### dynamic

- 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정해주는 기능 **(권장되지 않음)**

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

## 클라이언트 라우터 캐시

- 브라우저에 저장되는 캐시로 페이지 이동을 효율적으로 진행하기 위해 페이지의 일부 데이터를 보관
- Next.js에서 자동적으로 적용
- 새로고침하면 캐시는 사라짐
- ex. 레이아웃에 현재 시간을 노출시키고 있다고 할때 검색을 통해 리렌더링이 되어도 레이아웃은 리렌더링되지 않아 시간이 변경되지 않음
  ![라우트 캐시1](./public/readme/스크린샷%202025-03-30%20오후%2012.17.27.png)
  ![라우트 캐시2](./public/readme/스크린샷%202025-03-30%20오후%2012.20.30.png)

  중복된 레이아웃이나 컴포넌트가 계속 요청하는 문제가 발생하여 클라이언트 라우터 캐시에 저장하여 반환함

  ![라우트 캐시2](./public/readme/스크린샷%202025-03-30%20오후%2012.24.52.png)

<br/>

## 스트리밍

- 용량이 매우 큰 데이터를 잘게 쪼개서 마치 강물이 흐르듯이 끊기지 않고 데이터를 전송시켜주는 기술
- 비동기 작업이 포함된 페이지에서 모든 컴포넌트를 기다리다가 렌더링하지 않고 렌더링 할 수 있는 컴포넌트는 미리 렌더링 시켜준다.
  ![스트리밍](./public/readme/스크린샷%202025-03-30%20오후%203.06.08.png)
- 스트리밍을 적용하고 싶은 페이지에 동일한 폴더에 `loading.tsx` 파일을 만들어주면 스트리밍을 적용한 페이지가 로딩되는 동안 `loading.tsx` 파일이 노출된다.

> ⚠ 주의
>
> 1. 이 `loading.tsx` 는 layout 컴포넌트 처럼 하위에 컴포넌트에 모두 적용된다.
> 2. loading 기능은 async가 붙어있는 컴포넌트에서만 동작한다.
> 3. 오직 페이지 컨포넌트 (page.tsx)에만 적용할 수 있다.
> 4. 쿼리스트링이 변경되는 경우에는 작동되지 않는다.

<br>

---

출처: 한 입 크기로 잘라먹는 Next.js - 이정환
