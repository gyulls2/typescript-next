import Button from "./Button";

const Submit = ({ children, ...rest }) => {
  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  );
}

export default Submit;
