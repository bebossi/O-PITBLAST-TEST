import { ApolloError } from "@apollo/client";

interface ButtonProps {
  label: string | React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-fit flex justify-center border-[1px] p-4
    ${outline ? "border-black" : "border-rose-500"}
    ${outline ? "text-black" : "text-white"}
    ${outline ? "bg-white" : "bg-rose-500"}
    `}
    >
      {label}
    </button>
  );
};

export default Button;
