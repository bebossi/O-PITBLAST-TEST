import { ApolloError } from "@apollo/client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: ApolloError;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  onChange,
  value,
  error,
  icon,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full relative flex flex-col font-gotham">
      <p className={` ${error ? "text-rose-500" : "text-black"}`}>{label}</p>
      <div className="relative ">
        <label
          className={`absolute text-md duration-150 transform -translate-y-3 top-10 z-10 origin-[0]
        ${error ? "text-rose-500" : "text-zinc-400"}
       `}
        >
          {icon}
        </label>
        <input
          autoComplete="off"
          id={id}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          placeholder=" "
          type={showPassword ? "text" : type}
          className={` text-black  w-full p-4 pt-6 font-light rounded-md bg-white border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-10
       ${error ? "border-rose-500" : "border-neutral-300"}
       ${error ? "focus:border-rose-500" : "focus:border-black"}
      `}
        />
        {type === "password" && (
          <button
            onClick={togglePasswordVisibility}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
