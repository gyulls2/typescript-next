import { Metadata } from "next";
import Link from "next/link";
import CommentList from "./CommentList";

const list = {
  info: "정보 공유",
  free: "자유 게시판",
  qna: "질문 게시판",
};

export function generateMetadata({
  params,
}: {
  params: { type: "info" | "free" | "qna"; id: string };
}): Metadata {
  return {
    title: `${list[params.type]} - 상세 조회`,
    description: `${params.id}번 게시물 상세정보`,
    openGraph: {
      // url 링크 공유할 때 보여지는 정보
      type: "website",
      title: "멋사컴에 오신걸 환영합니다.",
      description: "유용한 정보를 나누고 공유하세요.",
      siteName: "멋사컴",
      images: {
        url: "/images/fesp.webp",
      },
      url: `/${params.type}/${params.id}`,
    },
  };
}

export default function DetailPage({
  params,
}: {
  params: { type: "info" | "free" | "qna"; id: string };
}) {
  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <form action="/info">
          <div className="font-semibold text-xl">
            제목 : 좋은 소식이 있습니다.
          </div>
          <div className="text-right text-gray-400">작성자 : 제이지</div>
          <div className="mb-4">
            <div>
              <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
                좋은 소식을 가지고 왔습니다.
                <br />
                오늘 드디어 최종 면접을 합니다.
                <br />
                많이 응원해 주세요^^
              </pre>
            </div>
            <hr />
          </div>
          <div className="flex justify-end my-4">
            <Link
              href={`/${params.type}`}
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              목록
            </Link>
            <a
              href={`/${params.type}/${params.id}/edit`}
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              수정
            </a>
            <button
              type="submit"
              className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              삭제
            </button>
          </div>
        </form>
      </section>

      <CommentList />
    </main>
  );
}
