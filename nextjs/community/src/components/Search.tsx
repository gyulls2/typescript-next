"use client";

import { useState } from "react";
import Submit from "./Submit";
import { useRouter } from "next/navigation";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`?keyword=${keyword}`);
  };

  return (
    <form action="#" onSubmit={handleSearch}>
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Submit>검색</Submit>
    </form>
  );
}
