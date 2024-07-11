import CommentNew from "./CommentNew";
import useFetch from "@hooks/useFetch";
import CommentItem from "./CommentItem";

export default function CommentList({ postId }) {
  const { loading, data, error, refetch } = useFetch(
    `/posts/${postId}/replies`
  );

  if(loading) return <p>로딩중...</p>;
  if(error) return <p>{ error.message }</p>;

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {data?.item.length}개</h4>

      {/* 댓글 */}
      {data?.item.map((comment) => (
        <CommentItem comment={comment} key={comment._id} postId={postId} refetch={refetch}/>
      ))}

      {/* 댓글 입력 */}
      <CommentNew postId={postId} refetch={refetch}/>
    </section>
  );
}
