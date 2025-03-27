import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>레이아웃</div>
      {children}
    </>
  );
}
