const API_SERVER = "https://api.fesp.shop";

const usePostFiles = (url, options = {}) => {
  const fileSend = async (addOption = {}) => {
    if (!url.startsWith("http")) {
      url = API_SERVER + url;
    }

    options = {
      ...options,
      ...addOption,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`2xx 이외의 응답: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { fileSend };
};

export default usePostFiles;
