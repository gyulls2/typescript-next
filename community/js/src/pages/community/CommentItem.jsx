import Button from "@components/Button";
import Submit from "@components/Submit";
import useAuthMutation from "@hooks/useAuthMutation.api";
import { loginAtom } from "@recoil/user/atoms";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

const CommentItem = ({ comment, postId }) => {
  const { _id, user, createdAt, content } = comment;
  const { name, profile } = user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();

  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);

  const userInfo = useRecoilValue(loginAtom)?.user?._id;

  const deleteMutation = useAuthMutation(`/posts/${postId}/replies/${_id}`, {
    method: "DELETE",
  });

  const editMutation = useAuthMutation(`/posts/${postId}/replies/${_id}`, {
    method: "PATCH",
  });

  // 댓글 수정 취소 시 input 초기화
  useEffect(() => {
    reset({
      content,
    });
  }, [isEditMode]);

  const deleteHandeler = async () => {
    if (confirm("댓글을 삭제할까요?")) {
      try {
        await deleteMutation.mutateAsync();
        queryClient.invalidateQueries(["comments", postId]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const editHandler = async (data) => {
    if (isDirty) {
      try {
        await editMutation.mutateAsync(data);
        setIsEditMode(false);
        queryClient.invalidateQueries(["comments", postId]);
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
            profile.path
              ? `https://api.fesp.shop${profile.path}`
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
          <pre className="whitespace-pre-wrap text-sm px-4">{content}</pre>
        ) : (
          <form
            id={`edit-form-${_id}`}
            className="w-full flex-1"
            onSubmit={handleSubmit(editHandler)}
          >
            <textarea
              id="content"
              rows="1"
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              defaultValue={content}
              name="commnet"
              {...register("content", { required: true })}
            ></textarea>
          </form>
        )}

        {user._id === userInfo && (
          <div>
            {isEditMode ? (
              <>
                <Submit form={`edit-form-${_id}`} bgColor="orange" size="sm">
                  수정
                </Submit>
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
};

export default CommentItem;
