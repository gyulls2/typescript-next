import { useMutation, UseMutationResult } from "@tanstack/react-query";
import mutationData from "@hooks/mutationData.api";
import { useRecoilState } from "recoil";
import { loginAtom } from "@recoil/user/atoms";
import { LoginResponse } from "#types/response";
import { LoginRequest } from "#types/request";

const useLogin = () => {
  const [, setUser] = useRecoilState(loginAtom);

  const loginMutation: UseMutationResult<LoginResponse, Error, LoginRequest> =
    useMutation<LoginResponse, Error, LoginRequest>({
      mutationFn: (data: LoginRequest) =>
        mutationData("/users/login", {
          method: "POST",
          body: JSON.stringify(data),
        }),
    });

  const login = async (data: LoginRequest): Promise<void> => {
    const loginData = await loginMutation.mutateAsync(data);

    // 로컬스토리지에 토큰 저장
    const token = {
      accessToken: loginData.item.token.accessToken,
      refreshToken: loginData.item.token.refreshToken,
    };
    localStorage.setItem("token", JSON.stringify(token));

    // Recoil에 유저 정보 저장
    const profileImage =
      loginData.item.profileImage &&
      typeof loginData.item.profileImage === "string"
        ? loginData.item.profileImage
        : "";

    setUser({
      isLoggedIn: true,
      user: {
        _id: loginData.item._id,
        name: loginData.item.name,
        profileImage,
      },
    });
  };

  return { login, loginMutation };
};

export default useLogin;
