const API_SERVER = "https://api.fesp.shop";

const postFiles = async <T>(url: string, options: RequestInit): Promise<T> => {
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

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default postFiles;
