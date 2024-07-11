import Button from "@components/Button";
import useAuthMutation from "@hooks/useAuthMutation";
import useFetch from "@hooks/useFetch";
import { loginAtom } from "@recoil/user/atoms";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function CommentItem({ comment, postId, refetch }) {
  const { _id, user, createdAt, content } = comment;
  const { name, profile } = user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  // TODO : 수정 모드일때 input으로 변경
  const [isEditMode, setIsEditMode] = useState(false);

  const userInfo = useRecoilValue(loginAtom).user._id;

  const { send } = useAuthMutation(`/posts/${postId}/replies/${_id}`);

  // 댓글 수정 취소 시 input 초기화
  useEffect(() => {
    reset({
      content,
    });
  }, [isEditMode]);

  const deleteHandeler = async () => {
    if (confirm("댓글을 삭제할까요?")) {
      try {
        await send({
          method: "DELETE",
        });
        refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const editHandler = async (data) => {
    if (isDirty) {
      try {
        await send({
          method: "PATCH",
          body: JSON.stringify(data),
        });
        refetch();
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          // TODO: 프로필 이미지 변경
          src={
            comment.user.profile.path
              ? `https://api.fesp.shop${comment.user.profile.path}`
              : "https://api.fesp.shop/files/00-sample/user-muzi.webp"
          }
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
        {!isEditMode ? (
          <pre className="whitespace-pre-wrap text-sm">{content}</pre>
        ) : (
          <textarea
            id="content"
            rows="1"
            className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white flex-1"
            defaultValue={content}
            name="content"
            {...register("content", { required: true })}
          ></textarea>
        )}

        {user._id === userInfo && (
          <div>
            {isEditMode ? (
              <>
                <Button
                  bgColor="orange"
                  size="sm"
                  onClick={handleSubmit(editHandler)}
                >
                  수정
                </Button>
                <Button
                  bgColor="red"
                  size="sm"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  취소
                </Button>
              </>
            ) : (
              <>
                <Button
                  bgColor="gray"
                  size="sm"
                  onClick={() => setIsEditMode(!isEditMode)}
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
