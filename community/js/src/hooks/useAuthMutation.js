const API_SERVER = "https://api.fesp.shop";

const useAuthMutation = (url, options = {}) => {
  const send = async (addOptions = {}) => {
    if (!url.startsWith("http")) {
      url = API_SERVER + url;
    }

    const token = JSON.parse(localStorage.getItem("token"));

    options = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token.accessToken}` }),
      },
      ...options,
      ...addOptions,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const error = new Error(`2xx 이외의 응답: ${response.status}`);
        error.status = response.status
        throw error; 
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { send };
};

export default useAuthMutation;
