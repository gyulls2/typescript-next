export default function Button({
  children,
  type = "button",
  bgColor = "orange",
  size = "md",
  ...rest
}) {
  const color = {
    gray: `bg-gray-900`,
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  const btnSize = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-1 px-4 text-base',
    lg: 'py-2 px-6 text-lg',
  }

  return (
    <button
      type={type}
      className={`${color[bgColor]} ${btnSize[size]} text-white font-semibold ml-2 hover:bg-amber-400 rounded`}
      {...rest}
    >
      {children}
    </button>
  );
}
