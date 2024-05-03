import React from "react";
import Hint from "./Typography/Hint.tsx";

const Input: React.FC<{
  title: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}> = ({ title, placeholder, value, setValue }) => {
  return (
    <div className="flex flex-col">
      <Hint text={title} />

      <input
        id={`${title}-input`}
        className={
          "p-2 rounded-md border border-neutral-400 focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
        }
        type={"text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
