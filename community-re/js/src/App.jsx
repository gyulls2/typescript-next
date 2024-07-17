import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import Spinner from "./components/Spinner";
import { RecoilRoot } from "recoil";
import useThemeStore from "./zustand/themeStore";

// reatc-query 사용
const queryClient = new QueryClient();

function App() {
  // const { isDarkMode } = useThemeStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode); // 일부 속성만 사용하거나, 구독이 필요하지 않은 경우 사용

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* 로딩중일때 표시할 컴포넌트 지정 */}
      <RecoilRoot>
        <React.Suspense fallback={<Spinner.FullScreen />}>
          <RouterProvider router={router} />
        </React.Suspense>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
