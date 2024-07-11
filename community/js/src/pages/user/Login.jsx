import Submit from "@components/Submit";
import useMutation from "@hooks/useMutation";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { loginAtom } from "@recoil/user/atoms";
import { ErrorMessage } from "@hookform/error-message";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useRecoilState(loginAtom);

  const { send } = useMutation("/users/login", {
    method: "POST",
  });

  const onSubmit = async (data) => {
    try {
      const loginData = await send({
        body: JSON.stringify(data),
      });

      // 로컬스토리지 토큰 저장
      const token = {
        accessToken: loginData?.item.token.accessToken,
        refreshToken: loginData?.item.token.refreshToken,
      };
      localStorage.setItem("token", JSON.stringify(token));

      // 리코일에 유저 정보 저장
      setUser({
        isLoggedIn: true,
        user: {
          _id: loginData?.item._id,
          name: loginData?.item.name,
          profileImage: loginData?.item.profileImage.path,
        },
      });

      history.back();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="email"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
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
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
              {...register("password", { required: "비밀번호를 입력하세요." })}
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
            <Link
              to="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit>로그인</Submit>
            <Link
              to="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
