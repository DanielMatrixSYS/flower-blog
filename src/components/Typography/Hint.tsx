import React from "react";

//No need for interfaces or types due to it being so small at the moment.

const Hint: React.FC<{ text: string; customStyle?: string }> = ({
  text,
  customStyle,
}) => {
  return (
    <p
      className={`text-sm leading-relaxed tracking-[0.0025em] text-neutral-700/80 dark:text-neutral-400 ${customStyle}`}
    >
      {text}
    </p>
  );
};

export default Hint;
