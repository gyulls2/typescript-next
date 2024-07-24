import Button, { ButtonProps } from "./Button";

export default function Submit({ children, ...rest }: ButtonProps) {
  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  );
}
