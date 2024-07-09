import Button from "@components/Button";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "./CommentList";

export default function Detail() {
  const navigate = useNavigate();
  const param = useParams();
  console.log(param._id);

  const { loading, data, error, refetch } = useFetch("/posts/?type=gyull");

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
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
          <Button onClick={() => history.back()}>목록</Button>
          <Button bgColor="gray" onClick={() => navigate("/info/1/edit")}>
            수정
          </Button>
          <Button bgColor="red" onClick={() => navigate("/info")}>
            삭제
          </Button>
        </div>
      </section>

      {/* 댓글 목록 */}
      <CommentList />
    </main>
  );
}
