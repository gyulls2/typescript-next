import { useMutation } from "@tanstack/react-query";
import mutationData from "@hooks/mutationData.api";
import { useRecoilState } from "recoil";
import { loginAtom } from "@recoil/user/atoms";

const useLogin = () => {
  const [user, setUser] = useRecoilState(loginAtom);

  const loginMutation = useMutation({
    mutationFn: (data) =>
      mutationData("/users/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });

  const login = async (data) => {
    const loginData = await loginMutation.mutateAsync(data);

    // 로컬스토리지에 토큰 저장
    const token = {
      accessToken: loginData?.item.token.accessToken,
      refreshToken: loginData?.item.token.refreshToken,
    };
    localStorage.setItem("token", JSON.stringify(token));

    // Recoil에 유저 정보 저장
    setUser({
      isLoggedIn: true,
      user: {
        _id: loginData?.item._id,
        name: loginData?.item.name,
        profileImage: loginData?.item.profileImage?.path,
      },
    });
  };

  return { login, loginMutation };
};

export default useLogin;
