import React, { useEffect, useState } from "react";
import Title from "../components/Typography/Title.tsx";
import Hint from "../components/Typography/Hint.tsx";
import { useParams } from "react-router-dom";
import {
  getImage,
  ImageProps,
  updateImage,
} from "../components/FirebaseFunctions.tsx";

import Input from "../components/Input.tsx";
import Textarea from "../components/Textarea.tsx";
import Checkbox from "../components/Checkbox.tsx";

const Edit: React.FC = () => {
  const { id } = useParams();

  const [pictureName, setPictureName] = useState<string>("");
  const [pictureDescription, setPictureDescription] = useState<string>("");
  const [pictureYear, setPictureYear] = useState<string>("");
  const [pictureFeatured, setPictureFeatured] = useState<boolean>(false);

  const [result, setResult] = useState<string>("");
  const [resultColor, setResultColor] = useState<string>("text-green-700");
  const [resultTime, setResultTime] = useState<number>(10000);

  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      const image = await getImage(id);

      setPictureName(image.name);
      setPictureDescription(image.description);
      setPictureYear(image.year);
      setPictureFeatured(image.featured);
    };

    fetchImage();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => setResult(""), resultTime);

    return () => clearTimeout(timeoutId);
  }, [result]);

  return (
    <div className="flex flex-col items-start p-4">
      <div className="mb-4">
        <Title text={"Oppdater bilde"} />
        <Hint
          text={
            "Du må slette bildet, så laste opp ny om selve bildet skal endres."
          }
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Input
          title={"Bilde navn"}
          placeholder={"Mitt bilde"}
          value={pictureName}
          setValue={setPictureName}
        />

        <Textarea
          title={"Beskriv bilde"}
          placeholder={
            "Bildet er av en fugl, typ grønnfugl, hann, tatt ved høsttider, nær goksjø"
          }
          value={pictureDescription}
          setValue={setPictureDescription}
        />

        <Input
          title={"Hvilket år ble bildet tatt i"}
          placeholder={"Bilde år"}
          value={pictureYear}
          setValue={setPictureYear}
        />

        <Checkbox
          title={"Skal bilde være fremhevet på nettsiden?"}
          value={pictureFeatured}
          setValue={setPictureFeatured}
        />

        <div className="flex flex-col">
          <button
            className="w-full p-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
            disabled={updating}
            onClick={async () => {
              if (!id) return;

              setUpdating(true);

              const imageData = {
                name: pictureName,
                description: pictureDescription,
                year: pictureYear,
                featured: pictureFeatured,
              } as ImageProps;

              await updateImage(id, imageData).then(() => {
                setResultColor("text-green-700");
                setResultTime(5000);
                setResult("Bilde oppdatert");
              });

              setUpdating(false);
            }}
          >
            Oppdater bilde
          </button>

          <Hint text={result} customStyle={resultColor} />
        </div>
      </div>
    </div>
  );
};

export default Edit;
