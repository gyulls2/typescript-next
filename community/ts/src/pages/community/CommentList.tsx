import CommentItem from "./CommentItem";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@hooks/fetchData.api";
import ErrorPage from "@pages/Error";
import { useParams } from "react-router-dom";
import { CommentListResponse } from "#types/response";
import CommentNew from "./CommentNew";

interface Props {
  postId: string;
}

const CommentList: React.FC<Props> = ({ postId }) => {
  const { data, error, isLoading } = useQuery<CommentListResponse, Error>({
    queryKey: ["comments", postId],
    queryFn: () => fetchData<CommentListResponse>(`/posts/${postId}/replies`),
  });

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <ErrorPage error={error} />;

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {data?.item.length}개</h4>

      {/* 댓글 */}
      {data?.item.map((comment) => (
        <CommentItem comment={comment} key={comment._id} postId={postId} />
      ))}

      {/* 댓글 입력 */}
      <CommentNew postId={postId} />
    </section>
  );
};

export const CommentListWrapper: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  return <CommentList postId={_id!} />;
};

export default CommentList;
