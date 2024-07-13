const API_SERVER = "https://api.fesp.shop";

const mutationData = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  if (!url.startsWith("http")) {
    url = API_SERVER + url;
  }

  const finalOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const response = await fetch(url, finalOptions);
  if (!response.ok) {
    const errorData: {
      message: string;
    } = await response.json();
    throw new Error(`${response.status} : ${errorData.message}`);
  }

  const responseData: T = await response.json();
  return responseData;
};

export default mutationData;
