import Button from "@components/Button";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import useFetch from "@hooks/useFetch";
import { useRecoilValue } from "recoil";
import { loginAtom } from "@recoil/user/atoms";
import useAuthMutation from "@hooks/useAuthMutation";

export default function Detail() {
  const navigate = useNavigate();
  const postId = useParams()._id;
  const type = useParams().type;

  const userInfo = useRecoilValue(loginAtom).user._id;

  const { loading, data, error, refetch } = useFetch(`/posts/${postId}`);

  const { send } = useAuthMutation(`/posts/${postId}`, {
    method: "DELETE",
  });

  const deleteHandeler = async () => {
    if (confirm("게시글을 삭제할까요?")) {
      try {
        await send();
        navigate(`/${type}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if(loading) return <p>로딩중...</p>;
  if(error) return <p>{ error.message }</p>;

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
          <Button onClick={() => history.back()}>목록</Button>
          {data?.item.user._id === userInfo && (
            <>
              <Button
                bgColor="gray"
                onClick={() => navigate(`/${type}/${postId}/edit`)}
              >
                수정
              </Button>
              <Button bgColor="red" onClick={deleteHandeler}>
                삭제
              </Button>
            </>
          )}
        </div>
      </section>

      {/* 댓글 목록 */}
      <CommentList postId={postId} />
    </main>
  );
}
