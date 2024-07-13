import Submit from "./Submit";
import { useForm } from "react-hook-form";

type Props = {
  setKeyword: (keyword: string) => void;
};

type FormData = {
  keyword: string;
};

const Search = ({ setKeyword }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
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
        {...register("keyword")}
      />
      <Submit>검색</Submit>
    </form>
  );
};
export default Search;
