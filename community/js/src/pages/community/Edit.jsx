import Button from "@components/Button";
import Submit from "@components/Submit";
import fetchData from "@hooks/fetchData.api";
import useAuthMutation from "@hooks/useAuthMutation.api";
import Error from "@pages/Error";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { InputField, TextAreaField } from "./New";

const Edit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm();
  const navigate = useNavigate();

  const postId = useParams()._id;

  const {
    data: prevData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchData(`/posts/${postId}`),
    keepPreviousData: true,
    onSuccess: (data) => reset(data.item),
  });

  const mutation = useAuthMutation(`/posts/${postId}`, {
    method: "PATCH",
  });

  const onSubmit = async (data) => {
    if (!isDirty) {
      navigate(-1);
      return;
    }
    const updatedData = Object.keys(dirtyFields).reduce((acc, field) => {
      acc[field] = data[field];
      return acc;
    }, {});

    try {
      await mutation.mutateAsync({ ...prevData.item, ...updatedData });
      navigate(`/posts/${postId}`);
    } catch (error) {
      alert(error.message);
      console.error("게시글 수정 오류 : ",error);
    }
  };

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <Error error={error} />;

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
            defaultValue={prevData.item.title}
            register={register}
            errors={errors}
          />
          <TextAreaField
            label="내용"
            name="content"
            defaultValue={prevData.item.content}
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
