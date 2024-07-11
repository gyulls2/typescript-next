import Button from "@components/Button";
import Submit from "@components/Submit";
import useAuthMutation from "@hooks/useAuthMutation";
import useFetch from "@hooks/useFetch";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function Edit() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm();

  const postId = useParams()._id;

  const {
    loading,
    data: prevData,
    error,
    refetch,
  } = useFetch(`/posts/${postId}`);

  console.log(prevData)

  const { send } = useAuthMutation(`/posts/${postId}`, {
    method: "PATCH",
  });

  const onSubmit = async (data) => {
    if(!isDirty) {
      history.back();
      return;
    }
    const updatedData = Object.keys(dirtyFields).reduce((acc, field) => {
      acc[field] = data[field];
      return acc;
    }, {});

    try {
      await send({
        body: JSON.stringify({ ...prevData.item, ...updatedData }),
      });
      history.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 수정
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              defaultValue={prevData?.item.title}
              {...register("title")}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              defaultValue={prevData?.item.content}
              {...register("content")}
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Submit>수정</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
