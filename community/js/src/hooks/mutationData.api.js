const API_SERVER = "https://api.fesp.shop";

const mutationData = async (url, options = {}) => {
  if (!url.startsWith("http")) {
    url = API_SERVER + url;
  }

  options = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const response = await fetch(url, options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status} : ${responseData.message}`);
  }

  return responseData;
};

export default mutationData;
