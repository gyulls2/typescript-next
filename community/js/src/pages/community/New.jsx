import Button from "@components/Button";
import Submit from "@components/Submit";
import useAuthMutation from "@hooks/useAuthMutation.api";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import Error from "@pages/Error";

const New = () => {
  const type = useParams().type;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useAuthMutation(`/posts`, {
    method: "POST",
  });

  const onSubmit = async (data) => {
    try {
      const response = await mutation.mutateAsync({ ...data, type: type });
      navigate(`/${type}/${response.item._id}`);
    } catch (error) {
      if (error.status == 401) {
        alert("로그인 후 사용하세요.");
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
      console.error(error);
    }
  };

  // TODO: 이미지, 태그 기능 추가
  {mutation.isError && <Error error={mutation.error} />}

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        {mutation.isLoading && <p>로딩중...</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="제목"
            name="title"
            register={register}
            errors={errors}
          />
          <TextAreaField
            label="내용"
            name="content"
            register={register}
            errors={errors}
          />
          <hr />
          <div className="flex justify-end my-6">
            <Submit>등록</Submit>
            <Button type="reset" bgColor="gray" onClick={() => navigate(-1)}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export const InputField = ({ label, name, defaultValue, register, errors }) => (
  <div className="my-4">
    <label className="block text-lg content-center" htmlFor={name}>
      {label}
    </label>
    <input
      type="text"
      placeholder={`${label}을 입력하세요.`}
      className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      name={name}
      defaultValue={defaultValue}
      {...register(name, { required: `${label}을 입력하세요.` })}
    />
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
          ⚠ {message}
        </p>
      )}
    />
  </div>
);

export const TextAreaField = ({
  label,
  name,
  defaultValue,
  register,
  errors,
}) => (
  <div className="my-4">
    <label className="block text-lg content-center" htmlFor={name}>
      {label}
    </label>
    <textarea
      rows="15"
      placeholder={`${label}을 입력하세요.`}
      className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      name={name}
      defaultValue={defaultValue}
      {...register(name, { required: `${label}을 입력하세요.` })}
    ></textarea>
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
          ⚠ {message}
        </p>
      )}
    />
  </div>
);

export default New;
