import { SignupRequest } from "#types/request";
import { FileResponse, SignupResponse } from "#types/response";
import Button from "@components/Button";
import Submit from "@components/Submit";
import { ErrorMessage } from "@hookform/error-message";
import mutationData from "@hooks/mutationData.api";
import postFiles from "@hooks/postFIles.api";
import useLogin from "@hooks/useLogin.api";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>();

  const navigate = useNavigate();

  const { login } = useLogin();

  const fileMutation = useMutation({
    mutationFn: (data: FormData) =>
      postFiles<FileResponse>("/files", {
        method: "POST",
        body: data,
      }),
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) =>
      mutationData<SignupResponse>("/users", {
        method: "POST",
        body: JSON.stringify({ ...data, type: "user" }),
      }),
  });

  const onSubmit: SubmitHandler<SignupRequest> = async (data) => {
    try {
      // 이미지 전송
      if (data.profileImage && data.profileImage instanceof FileList) {
        const formData = new FormData();
        formData.append("attach", data.profileImage[0]);

        const imgURL = await fileMutation.mutateAsync(formData);
        if (imgURL?.item && imgURL.item.length > 0) {
          data.profileImage = imgURL.item[0].path;
        }
      }

      //회원가입 데이터 전송
      await signupMutation.mutateAsync({
        ...data,
        type: "user",
      });

      // 자동 로그인
      await login({ email: data.email, password: data.password });
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      console.error(error);
    }
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("name", { required: "이름을 입력하세요." })}
            />
            {/* 입력값 검증 에러 출력 */}
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                  ⚠ {message}
                </p>
              )}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                  message: "형식에 맞지 않는 이메일입니다.",
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                  ⚠ {message}
                </p>
              )}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력하세요.",
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                  ⚠ {message}
                </p>
              )}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              {...register("profileImage")}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Submit>회원가입</Submit>
            <Button type="reset" bgColor="gray" onClick={() => navigate(-1)}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
