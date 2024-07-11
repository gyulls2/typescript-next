import { useNavigate } from "react-router-dom";
import Submit from "./Submit";
import { useForm } from "react-hook-form";

export default function Search({ setKeyword }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.keyword) {
      setKeyword(`&keyword=${data.keyword}`);
    } else {
      setKeyword("");
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
        {...register("keyword")}
      />
      <Submit>검색</Submit>
    </form>
  );
}
