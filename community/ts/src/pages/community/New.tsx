import Button from "@components/Button";
import Submit from "@components/Submit";
import useAuthMutation from "@hooks/useAuthMutation.api";
import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import ErrorPage from "@pages/Error";
import { ListType, PostRequest } from "#types/request";
import { PostResponse } from "#types/response";

const New = () => {
  const { type } = useParams<{ type: ListType }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostRequest>();

  const mutation = useAuthMutation<PostResponse, PostRequest>(`/posts`, {
    method: "POST",
  });

  const onSubmit: SubmitHandler<PostRequest> = async (data) => {
    try {
      const response = await mutation.mutateAsync({
        ...data,
        type: type,
      });
      navigate(`/${type}/${response.item._id}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    }
  };

  // TODO: 이미지, 태그 기능 추가
  {
    mutation.isError && <ErrorPage error={mutation.error} />;
  }

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        {mutation.status === "pending" && <p>로딩중...</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="제목"
            name="title"
            defaultValue=""
            register={register}
            errors={errors}
          />
          <TextAreaField
            label="내용"
            name="content"
            defaultValue=""
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

interface FieldProps {
  label: string;
  name: keyof PostRequest;
  defaultValue: string | undefined;
  register: UseFormRegister<PostRequest>;
  errors:  FieldErrors<PostRequest>;
}

export const InputField: React.FC<FieldProps> = ({
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
    <input
      type="text"
      placeholder={`${label}을 입력하세요.`}
      className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

export const TextAreaField: React.FC<FieldProps> = ({
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
      rows={15}
      placeholder={`${label}을 입력하세요.`}
      className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
