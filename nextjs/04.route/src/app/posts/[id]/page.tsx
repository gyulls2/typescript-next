import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "3",
//   description: "3번 게시물 상세정보",
// };

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  return {
    title: `${params.id}번 게시물`,
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
      url: "https://community.fesp.shop",
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  return <h1 className="text-xl font-bold mb-4">{params.id} 상세 조회</h1>;
}
