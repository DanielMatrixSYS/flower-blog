import React, {useContext, useEffect, useState} from "react";
import {FaSpinner} from "react-icons/fa";
import Hint from "./Typography/Hint.tsx";
import {deleteImage, hasUserLikedImage, ImageProps, likeImage, unlikeImage} from "./FirebaseFunctions.tsx";
import {AuthContext, AuthContextProps} from "../Auth/AuthContext.tsx";
import {MdClose, MdEdit} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {FaHeart, FaRegHeart} from "react-icons/fa6";

const Image: React.FC<{
  image: ImageProps;
  onImageDeleted: (id: string) => void;
}> = ({ image, onImageDeleted }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
    const [imageLiked, setImageLiked] = useState(false);
    const [likes, setLikes] = useState(image.likes || 0);
  const { userProfile } = useContext(AuthContext) as AuthContextProps;
  const navigate = useNavigate();

  const errorHandler = () => {
    setHasError(true);
  };

  const handleDelete = async () => {
    if (!userProfile?.isSiteAdmin) return;

    await deleteImage(image.id);
    onImageDeleted(image.id);
  };

  const handleEdit = () => {
    if (!userProfile?.isSiteAdmin) return;

    navigate(`/edit/${image.id}`);
  };

    useEffect(() => {
        hasUserLikedImage(image.id).then((liked) => {
            setImageLiked(liked);
        });
    }, []);

  const rowSpan = image.featured
    ? "lg:row-span-2 md:row-span-2 sm:row-span-2"
    : "";

  const columnSpan = image.featured
    ? "sm:col-span-2 md:col-span-2 lg:col-span-3"
    : "col-span-1";

  const imageHeight = image.featured
    ? "h-auto md:h-3/4-screen"
    : "h-auto md:h-72";
  const imageWidth = "w-full";

  const AdministratorOptions = () => {
    return (
      <div className="flex flex-col md:space-y-2">
        <div
          className={`border border-neutral-400/50 rounded-full text-red-500 hover:text-red-900 ${image.featured ? "h-16" : "h-8"} hover:cursor-pointer`}
          onClick={handleDelete}
        >
          <MdClose aria-label="Delete image" className="w-full h-full" />
        </div>

        <div
          className={`border border-neutral-400/50 rounded-full text-blue-500 hover:text-blue-900 ${image.featured ? "h-16" : "h-8"} hover:cursor-pointer`}
          onClick={handleEdit}
        >
          <MdEdit aria-label="Edit image" className="w-full h-full scale-90" />
        </div>
      </div>
    );
  };

    const DrawLikes = () => {
        let disabled = false;

        return (
            <div className="flex flex-row space-x-2 scale-125 px-4 items-center">
                <button
                    className="text-white"
                    disabled={disabled}
                    onClick={async () => {
                        if (imageLiked) {
                            disabled = true;

                            setLikes((prev) => prev - 1);
                            setImageLiked(false);
                            await unlikeImage(image.id).then(() => disabled = false);
                        } else {
                            disabled = true;

                            setLikes((prev) => prev + 1);
                            setImageLiked(true);
                            await likeImage(image.id).then(() => disabled = false);
                        }
                    }}>
                    {imageLiked ? <FaHeart/> : <FaRegHeart/>}
                </button>

                <p className="text-xl inline-block text-white">
                    {likes}
                </p>
            </div>
        )
    };

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
              <div
                  className="absolute inset-0 flex opacity-0 hover:opacity-100 bg-black/60 md:transition-all md:duration-300 md:ease-in-out md:hover:cursor-default">
                  <div className="flex w-full p-2 justify-between">
                      <div className="flex flex-col">
                          <p className="text-2xl inline-block text-blue-700">
                              {image.year}
                          </p>

                          {userProfile?.isSiteAdmin && (
                              <p className="text-xl inline-block text-blue-700">
                                  {image.featured ? "Dette bildet er fremhevet" : ""}
                              </p>
                          )}
                      </div>

                      <div className="flex flex-col items-end justify-between">
                          {userProfile?.isSiteAdmin && <AdministratorOptions/>}

                          <div><DrawLikes/></div>
                      </div>
                  </div>
              </div>
          )}
        </>
      )}
    </div>
  );
};

export default Image;
