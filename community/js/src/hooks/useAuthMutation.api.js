const API_SERVER = "https://api.fesp.shop";
import { useMutation } from "@tanstack/react-query";
import mutationData from "./mutationData.api";

const useAuthMutation = (url, options = {}) => {
  const mutationFn = async (data) => {
    if (!url.startsWith("http")) {
      url = API_SERVER + url;
    }

    const token = JSON.parse(localStorage.getItem("token"));

    const finalOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token.accessToken}` }),
      },
      body: JSON.stringify(data),
    };

    return mutationData(url, finalOptions);
  };

  return useMutation({mutationFn});
};

export default useAuthMutation;
