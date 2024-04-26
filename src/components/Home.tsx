import React, { useEffect, useState } from "react";
import Image from "./Image";
import { getAllImagesCached } from "./FirebaseFunctions";
import { ImageProps } from "./FirebaseFunctions";

const Home: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCachedImages = async () => {
      setLoading(true);

      await getAllImagesCached().then((images: ImageProps[]) =>
        randomizeAndFeatureImages(images),
      );

      setLoading(false);
    };

    fetchCachedImages().then((e) => console.log(e));
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
    const shuffledImages = shuffleArray(images);

    setImages(shuffledImages);
  };

  return (
    <div
      className={`flex flex-col ${loading ? "opacity-0" : "opacity-100"} transition-opacity ease-in-out`}
    >
      <div className="flex-col space-y-2 container mx-auto p-4 overflow-hidden flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-16 xl:gap-x-7 gap-y-2">
          {loading ? (
            <p className="text-2xl col-span-full text-center">
              Venter på bildene fra server...
            </p>
          ) : (
            images.map((image) => <Image image={image} key={image.id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
