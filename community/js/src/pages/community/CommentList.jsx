import CommentNew from "./CommentNew";
import CommentItem from "./CommentItem";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@hooks/fetchData.api";
import Error from "@pages/Error";

const CommentList = ({ postId }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchData(`/posts/${postId}/replies`),
    keepPreviousData: true,
  });

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <Error error={error} />;

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {data?.item.length}개</h4>

      {/* 댓글 */}
      {data?.item.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment._id}
          postId={postId}
          refetch={refetch}
        />
      ))}

      {/* 댓글 입력 */}
      <CommentNew postId={postId} />
    </section>
  );
};

export default CommentList;
