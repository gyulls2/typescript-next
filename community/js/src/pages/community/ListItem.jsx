import { useNavigate, useParams } from "react-router-dom";

export default function ListItem({ item, idx }) {
  const { name, _id, title, repliesCount, createdAt, views } = item;
  const param = useParams().type;

  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">{idx}</td>
      <td
        className="p-2 truncate indent-4 cursor-pointer"
        onClick={() => navigate(`/${param}/${_id}`)}
      >
        {title}
      </td>
      <td className="p-2 text-center truncate">{name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{views}</td>
      <td className="p-2 text-center hidden sm:table-cell">{repliesCount}</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {createdAt}
      </td>
    </tr>
  );
}
