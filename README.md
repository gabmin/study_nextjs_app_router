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

출처: 한 입 크기로 잘라먹는 Next.js - 이정환
