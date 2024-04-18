import React from "react";

//No need for interfaces or types due to it being so small at the moment.

const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <p className="text-2xl leading-relaxed text-neutral-700 dark:text-neutral-400 tracking-light">
      {text}
    </p>
  );
};

export default Title;
