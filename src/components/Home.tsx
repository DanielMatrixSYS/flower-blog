import React, { useEffect, useState } from "react";
import Image from "./Image";
import { getAllImages } from "./FirebaseFunctions";
import { ImageProps } from "./FirebaseFunctions";
import Header from "./Header";

const Home: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndProcessImages = async () => {
      setLoading(true);

      const allImages = await getAllImages();

      randomizeAndFeatureImages(allImages);
      setLoading(false);
    };

    fetchAndProcessImages();
  }, []);

  //Fisher-Yates shuffle
  //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = array.slice();

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  const randomizeAndFeatureImages = (images: ImageProps[]): void => {
    const innerWidth = window.innerWidth;
    let mod = 4;

    if (innerWidth < 768) {
      mod = 3;
    } else if (innerWidth < 1024) {
      mod = 4;
    }

    const shuffledImages = shuffleArray(images);

    shuffledImages.forEach((image, index) => {
      image.featured = index % mod === 0;
    });

    setImages(shuffledImages);
  };

  return (
    <div
      className={`flex flex-col ${loading ? "opacity-0" : "opacity-100"} transition-opacity ease-in-out`}
    >
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
