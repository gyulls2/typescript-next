import TodoItem from "./TodoItem";
import { TodoListResponse } from "#types/todo";

type Props = {
  data: TodoListResponse | null;
  refetch: () => Promise<void>;
};

function TodoList({ data, refetch }: Props) {
  const items = data?.map((item) => (
    <TodoItem key={item.id} item={item} refetch={refetch} />
  ));
  return <ul>{items}</ul>;
}

export default TodoList;
