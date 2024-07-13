const API_SERVER = "https://api.fesp.shop";

const fetchData = async <T>(url: string): Promise<T> => {
  if (!url.startsWith("http")) {
    url = API_SERVER + url;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`2xx 이외의 응답: ${response.status}`);
  }

  const data: T = await response.json();
  return data;
};

export default fetchData;
