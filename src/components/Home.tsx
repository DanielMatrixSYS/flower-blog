import React, { useEffect, useState } from "react";
import Image from "./Image";
import { getAllImagesCached } from "./FirebaseFunctions";
import { ImageProps } from "./FirebaseFunctions";

const Home: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(false);

  // Fisher-Yates shuffle algorithm
  // Fisher-Yates shuffle algorithm with TypeScript annotation
  function shuffleArray(array: ImageProps[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  useEffect(() => {
    const fetchCachedImages = async () => {
      setLoading(true);

      const allImages = await getAllImagesCached();

      const newFeatured: ImageProps[] = [];
      const newNonFeatured: ImageProps[] = [];

      allImages.forEach((image) => {
        if (image.featured) {
          newFeatured.push(image);
        } else {
          newNonFeatured.push(image);
        }
      });

      shuffleArray(newFeatured);
      shuffleArray(newNonFeatured);

      setImages([...newFeatured, ...newNonFeatured]);
      setLoading(false);
    };

    fetchCachedImages().then(() => console.log("Images fetched"));
  }, []);

  return (
    <div
      className={`flex flex-col ${loading ? "opacity-0" : "opacity-100"} transition-opacity ease-in-out`}
    >
      <div className="flex-col space-y-2 container mx-auto p-4 overflow-hidden flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
          {loading ? (
            <p className="text-2xl col-span-full text-center">
              Venter på bildene fra server...
            </p>
          ) : (
            images.map((image) => (
              <Image
                image={image}
                key={image.id}
                // This function is called when an image is deleted. Document ID (string) provided as argument.
                onImageDeleted={(id) => {
                  images.filter((image) => image.id !== id);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
