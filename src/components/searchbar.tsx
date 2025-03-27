"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  const onKeyDownSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onChageSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <input
        value={search}
        onChange={onChageSearch}
        onKeyDown={onKeyDownSubmit}
      />
      <button onClick={onSubmit}>검색</button>
    </>
  );
}
