const API_SERVER = "https://api.fesp.shop";
import { useMutation } from "@tanstack/react-query";
import mutationData from "./mutationData.api";
import { Token } from "#types/response";

const useAuthMutation = <TData, TOption>(
  url: string,
  options: RequestInit = {}
) => {
  const mutationFn = async (data: TOption): Promise<TData> => {
    if (!url.startsWith("http")) {
      url = API_SERVER + url;
    }

    const token: Token | null = JSON.parse(
      localStorage.getItem("token") || "null"
    );

    const finalOptions: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token.accessToken}` }),
      },
      body: JSON.stringify(data),
    };

    return mutationData<TData>(url, finalOptions);
  };

  return useMutation<TData, Error, TOption>({ mutationFn });
};

export default useAuthMutation;
