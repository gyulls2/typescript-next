import Button from "@components/Button";
import useAuthMutation from "@hooks/useAuthMutation";
import { loginAtom } from "@recoil/user/atoms";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function CommentItem({ comment, postId, refetch }) {
  const { _id, user, createdAt, content } = comment;
  const { name, profile } = user;

  // TODO : 수정 모드일때 input으로 변경
  const [editMode, setEditMode] = useState(false);

  const userInfo = useRecoilValue(loginAtom).user._id;

  // TODO : 여러 method 대응할 수 있도록 수정
  const { send } = useAuthMutation(`/posts/${postId}/replies/${_id}`, {
    method: "DELETE",
  });

  const deleteHandeler = async () => {
    if (confirm("댓글을 삭제할까요?")) {
      try {
        await send();
        refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          // TODO: 프로필 이미지 변경
          // src={`http://api.fesp.shop${comment.user.profile.path}`}
          src="http://api.fesp.shop/files/00-sample/user-muzi.webp"
          alt={`${name} 프로필 이미지`}
        />
        <Link to="" className="text-orange-400">
          {name}
        </Link>
        <time className="ml-auto text-gray-500" dateTime="2024.07.02 14:11:22">
          {createdAt}
        </time>
      </div>
      <div className="flex justify-between my-4">
        <pre className="whitespace-pre-wrap text-sm">{content}</pre>
        {user._id === userInfo && (
          <div>
            {editMode ? (
              <>
                <Button bgColor="orange" size="sm">
                  수정
                </Button>
                <Button
                  bgColor="red"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  취소
                </Button>
              </>
            ) : (
              <>
                <Button
                  bgColor="gray"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  수정
                </Button>
                <Button bgColor="red" size="sm" onClick={deleteHandeler}>
                  삭제
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
