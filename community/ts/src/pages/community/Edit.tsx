import Button from "@components/Button";
import Submit from "@components/Submit";
import fetchData from "@hooks/fetchData.api";
import useAuthMutation from "@hooks/useAuthMutation.api";
import ErrorPage from "@pages/Error";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { InputField, TextAreaField } from "./New";
import { PostResponse } from "#types/response";
import { ListType, PostRequest } from "#types/request";
import { useEffect } from "react";

const Edit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PostRequest>();
  const navigate = useNavigate();

  const { _id: postId, type } = useParams<{ _id: string; type: ListType }>();

  const {
    data: prevData,
    error,
    isLoading,
  } = useQuery<PostResponse, Error>({
    queryKey: ["posts", postId],
    queryFn: () => fetchData<PostResponse>(`/posts/${postId}`),
  });

  useEffect(() => {
    if (prevData) {
      reset(prevData.item);
    }
  }, [prevData, reset]);

  const mutation = useAuthMutation(`/posts/${postId}`, {
    method: "PATCH",
  });

  const onSubmit: SubmitHandler<PostRequest> = async (data) => {
    if (!isDirty) {
      navigate(-1);
      return;
    }

    try {
      await mutation.mutateAsync({ ...prevData?.item, ...data });
      navigate(`/${type}/${postId}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error("게시글 수정 오류 : ", error);
    }
  };

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <ErrorPage error={error} />;

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 수정
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="제목"
            name="title"
            defaultValue={prevData?.item.title}
            register={register}
            errors={errors}
          />
          <TextAreaField
            label="내용"
            name="content"
            defaultValue={prevData?.item.content}
            register={register}
            errors={errors}
          />
          <hr />
          <div className="flex justify-end my-6">
            <Submit>수정</Submit>
            <Button type="reset" bgColor="gray" onClick={() => navigate(-1)}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Edit;
