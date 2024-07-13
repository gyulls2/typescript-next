import Button from "@components/Button";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import { useRecoilValue } from "recoil";
import { loginAtom } from "@recoil/user/atoms";
import useAuthMutation from "@hooks/useAuthMutation.api";
import fetchData from "@hooks/fetchData.api";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "@pages/Error";
import { ListType } from "#types/request";
import { PostResponse } from "#types/response";

const Detail = () => {
  const navigate = useNavigate();
  const { _id: postId, type } = useParams<{ _id: string; type: ListType }>();

  const userInfo = useRecoilValue(loginAtom)?.user?._id;

  const { data, error, isLoading } = useQuery<PostResponse, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchData<PostResponse>(`/posts/${postId}`),
  });

  const mutation = useAuthMutation<void, void>(`/posts/${postId}`, {
    method: "DELETE",
  });

  const handleDelete = async () => {
    if (confirm("게시글을 삭제할까요?")) {
      try {
        await mutation.mutateAsync();
        navigate(`/${type}`);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
        console.error("게시글 삭제 오류 : ", error);
      }
    }
  };

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <ErrorPage error={error} />;
  if (!data) return <p>데이터가 없습니다.</p>;

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">제목 : {data?.item.title}</div>
        <div className="text-right text-gray-400">
          작성자 : {data?.item.user.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {data?.item.content}
            </pre>
          </div>
          <hr />
        </div>

        <div className="flex justify-end my-4">
          <Button onClick={() => navigate(`/${type}`)}>목록</Button>
          {data?.item.user._id === userInfo && (
            <>
              <Button
                bgColor="gray"
                onClick={() => navigate(`/${type}/${postId}/edit`)}
              >
                수정
              </Button>
              <Button bgColor="red" onClick={handleDelete}>
                삭제
              </Button>
            </>
          )}
        </div>
      </section>

      {/* 댓글 목록 */}
      <CommentList postId={postId!} />
    </main>
  );
};

export default Detail;
