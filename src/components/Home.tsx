import React from "react";

const images = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  url: `/macro_${i + 1}.jpg`,
  alt: `Macro Photography ${i + 1}`,
}));

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4 overflow-hidden flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => {
          const isFeature = index === 0;
          const colSpan = isFeature
            ? "lg:col-span-2 md:col-span-2 sm:col-span-2"
            : "";
          const rowSpan = isFeature
            ? "lg:row-span-2 md:row-span-2 sm:row-span-2"
            : "";
          const imageSizeClass = isFeature
            ? "h-64 w-64 lg:h-full lg:w-full"
            : "h-64 w-64";

          return (
            <div
              key={image.id}
              className={`overflow-hidden ${imageSizeClass} ${colSpan} ${rowSpan} m transition duration-300 ease-in-out transform hover:scale-105`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
