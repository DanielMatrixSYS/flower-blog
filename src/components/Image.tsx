import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Hint from "./Typography/Hint.tsx";
import { ImageProps } from "./FirebaseFunctions.tsx";

const Image: React.FC<{ image: ImageProps }> = ({ image }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const errorHandler = () => {
    setHasError(true);
  };

  const rowSpan = image.featured
    ? "lg:row-span-2 md:row-span-2 sm:row-span-2 z-40"
    : "";

  const columnSpan = image.featured
    ? "sm:col-span-2 md:col-span-3 lg:col-span-3"
    : "sm:col-span-1 md:col-span-1 lg:col-span-1";

  const imageHeight = image.featured ? "h-screen" : "h-full";
  const imageWidth = image.featured ? "w-full" : "w-full";

  return (
    <div
      className={`overflow-hidden ${columnSpan} ${rowSpan} shadow-sm transition duration-300 ease-in-out transform`}
    >
      {!isLoaded && !hasError && (
        <div className="flex space-x-4 space-y-4 items-center justify-center w-full h-full">
          <Hint text={"Laster inn bildet..."} />

          <FaSpinner
            className={
              "animate-spin inline-block text-black dark:text-neutral-400"
            }
          />
        </div>
      )}

      {hasError ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
          Unable to load image
        </div>
      ) : (
        <>
          <img
            src={image.url}
            alt={image.alt}
            loading="lazy"
            width="100%"
            height="100%"
            className={`${imageWidth} ${imageHeight} object-cover transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
            onError={errorHandler}
            onContextMenuCapture={(e) => e.preventDefault()}
          />

          {isLoaded && (
            <div className="absolute inset-0 flex justify-center items-center px-2 opacity-0 bg-transparent md:hover:bg-black/40 md:hover:opacity-100 md:transition-all md:duration-300 md:hover:cursor-default md:ease-in-out">
              <p className="text-2xl inline-block text-blue-700">
                Bilde ble tatt i {image.year}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Image;
