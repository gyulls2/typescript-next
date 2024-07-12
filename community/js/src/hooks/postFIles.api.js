const API_SERVER = "https://api.fesp.shop";

const postFiles = async (url, options) => {
  if (!url.startsWith("http")) {
    url = API_SERVER + url;
  }

  options = {
    ...options,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`2xx 이외의 응답: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default postFiles;
