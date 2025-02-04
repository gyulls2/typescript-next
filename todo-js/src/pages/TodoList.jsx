import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

// props 타입 체크
TodoList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      done: PropTypes.bool,
    })
  ),
  refetch: PropTypes.func,
};

function TodoList({ data, refetch }) {
  const items = data?.map((item) => <TodoItem key={item.id} item={item} refetch={refetch}/>);
  return <ul>{items}</ul>;
}

export default TodoList;
