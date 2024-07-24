"use client";

import { redirect, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const isLogin = true;
  if(!isLogin) redirect('/login')
  return (
    <>
      <h1 className="text-xl font-bold mb-4">글쓰기</h1>
      <button type="button" onClick={() => router.push("/login")}>
        로그인
      </button>
    </>
  );
}
