import React from "react";

//No need for interfaces or types due to it being so small at the moment.

const Paragraph: React.FC<{ text: string }> = ({ text }) => {
  return (
    <p className="text-sm sm:text-base leading-relaxed my-2 sm:my-4 text-neutral-700 dark:text-neutral-400 whitespace-nowrap">
      {text}
    </p>
  );
};

export default Paragraph;
