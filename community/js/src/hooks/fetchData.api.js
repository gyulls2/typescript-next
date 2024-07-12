const API_SERVER = "https://api.fesp.shop";

const fetchData = async (url) => {
  if (!url.startsWith("http")) {
    url = API_SERVER + url;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`2xx 이외의 응답: ${response.status}`);
  }

  return response.json();
};

export default fetchData;
