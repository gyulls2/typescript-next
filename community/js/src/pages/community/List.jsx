import Button from "@components/Button";
import Pagination from "@components/Pagination";
import Search from "@components/Search";
import { useNavigate, useParams } from "react-router-dom";
import ListItem from "./ListItem";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@hooks/fetchData.api";

const List = () => {
  const navigate = useNavigate();
  const type = useParams().type;

  const [keyword, setKeyword] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const listTitle = {
    gyull: "정보 공유",
    free: "자유게시판",
    qna: "질문게시판",
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", type, keyword, pageNum],
    queryFn: () =>
      fetchData(`/posts/?type=${type}${keyword}&page=${pageNum}&limit=10`),
    keepPreviousData: true,
  });

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          {listTitle[type]}
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <Search setKeyword={setKeyword} />

        <Button onClick={() => navigate(`/${type}/new`)}>글작성</Button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* TODO: 로딩스피너 컴포넌트 추가 */}
            {isLoading && (
              <tr className="text-center py-2">
                <td colSpan="6" className="py-20 text-center">
                  <div className="inline-block w-6 h-6 border-4 border-orange-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                </td>
              </tr>
            )}

            {error ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  {error.message}
                  <br />
                  문제가 발생했습니다. 다시 시도해주세요.
                </td>
              </tr>
            ) : data?.item.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              // 본문 출력
              data?.item.map((item, idx) => (
                <ListItem
                  item={item}
                  key={item._id}
                  idx={
                    data.pagination.total -
                    (data.pagination.page - 1) * data.pagination.limit -
                    idx
                  }
                />
              ))
            )}
          </tbody>
        </table>
        <hr />
        {/* 페이지네이션 */}
        {data && (
          <Pagination pagination={data?.pagination} setPageNum={setPageNum} />
        )}
      </section>
    </main>
  );
};

export default List;
