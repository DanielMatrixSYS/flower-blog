import React from "react";
import Description from "./Typography/Description.tsx";

const Checkbox: React.FC<{
  title: string;
  value: boolean;
  setValue: (value: boolean) => void;
}> = ({ title, value, setValue }) => {
  return (
    <div className="flex flex-row space-x-2">
      <Description text={title} />

      <input
        id={`${title}-checkbox`}
        className={
          "p-2 rounded-md border border-neutral-400 focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
        }
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
        type={"checkbox"}
      />
    </div>
  );
};

export default Checkbox;
