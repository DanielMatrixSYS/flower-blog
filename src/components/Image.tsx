import React, { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  featured: boolean;
}

const Image: React.FC<ImageProps> = ({ src, alt, featured }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const rowSpan = featured ? "lg:row-span-2 md:row-span-2 sm:row-span-2" : "";

  const columnSpan = featured
    ? "sm:col-span-2 md:col-span-3 lg:col-span-3"
    : "sm:col-span-1 md:col-span-1 lg:col-span-1";

  const imageSizeClass = featured
    ? "w-full h-128 lg:h-[48rem] xl:h-[70rem] md:h-[30rem]"
    : "w-full h-full lg:h-[20rem] lg:w-full xl:h-full xl:w-full";

  return (
    <div
      className={`overflow-hidden ${columnSpan} ${rowSpan} ${imageSizeClass} transition duration-300 ease-in-out transform hover:scale-105`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default Image;
