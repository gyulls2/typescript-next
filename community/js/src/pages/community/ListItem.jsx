import { useNavigate } from "react-router-dom";

export default function ListItem({ item }) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">0</td>
      <td
        className="p-2 truncate indent-4 cursor-pointer"
        onClick={() => navigate(`/info/${item._id}`)}
      >
        {item.title}
      </td>
      <td className="p-2 text-center truncate">{item.user.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">
        {item.repliesCount}
      </td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {item.createdAt}
      </td>
    </tr>
  );
}
