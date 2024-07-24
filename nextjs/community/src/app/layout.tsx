import Link from "next/link";
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "멋쟁이 사자처럼 커뮤니티 - 멋사컴",
  description:
    "다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요.",
  keywords: "커뮤니티, 소통, 포럼, 관심사, 온라인 모임, 커뮤니티 서비스",
  openGraph: {
    title: "멋사컴에 오신걸 환영합니다.",
    description: "유용한 정보를 나누고 공유하세요.",
    images: {
      url: "/images/fesp.webp",
    },
    url: "https://community.fesp.shop",
    type: "website",
    siteName: "멋사컴",
  },
  // url 관련 설정시 metadata 사용될 기본 경로 지정
  metadataBase: new URL("https://next.fesp.shop"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="FESP 2기" />
      </head>
      <body>
        <div id="root">
          <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
            <Header />

            {children}

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
