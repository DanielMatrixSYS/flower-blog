import React from "react";

//No need for interfaces or types due to it being so small at the moment.

const Description: React.FC<{
  text: string;
  descriptionType?: string;
}> = ({ text, descriptionType = "normal" }) => {
  let descriptionClass = "";

  switch (descriptionType) {
    case "large":
      descriptionClass =
        "text-lg xl:text-xl leading-relaxed tracking-[0.0025em] text-neutral-700 dark:text-neutral-400";
      break;
    case "small":
      descriptionClass =
        "text-xs xl:text-sm leading-relaxed tracking-[0.0025em] text-neutral-400 dark:text-neutral-500";
      break;
    default:
      descriptionClass =
        "text-sm xl:text-base leading-relaxed tracking-[0.0025em] text-neutral-700 dark:text-neutral-400";
      break;
  }

  return <p className={descriptionClass}>{text}</p>;
};

export default Description;
