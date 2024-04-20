import React, { useEffect, useState } from "react";
import Image from "./Image";
import { getImages } from "./FirebaseFunctions";
import { ImageProps } from "./FirebaseFunctions";
import Header from "./Header";

const Home: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndProcessImages = async () => {
      setLoading(true);

      const images2023 = await getImages(2023);
      const images2022 = await getImages(2022);
      const allImages = [...images2023, ...images2022];

      randomizeAndFeatureImages(allImages);
      setLoading(false);
    };

    fetchAndProcessImages();
  }, []);

  const randomizeAndFeatureImages = (images: ImageProps[]) => {
    const innerWidth = window.innerWidth;
    let mod = 4;

    if (innerWidth < 1024) {
      mod = 4;
    }

    if (innerWidth < 768) {
      mod = 3;
    }

    images.sort(() => 0.5 - Math.random());

    images.forEach((image, index) => {
      image.featured = (index + 1) % mod === 0;
    });

    setImages(images);
  };

  return (
    <div className="flex flex-col">
      <Header />

      <div className="container mx-auto p-4 overflow-hidden flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-16 xl:gap-x-7 gap-y-2">
          {loading ? (
            <p className="col-span-full text-center">Loading images...</p>
          ) : (
            images.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt={image.alt}
                featured={image.featured || false}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
