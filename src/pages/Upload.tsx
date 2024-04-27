import React, { useEffect, useState } from "react";
import Title from "../components/Typography/Title.tsx";
import Hint from "../components/Typography/Hint.tsx";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { db, storage } from "../components/Firebase.tsx";
import Description from "../components/Typography/Description.tsx";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const Input: React.FC<{
  title: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}> = ({ title, placeholder, value, setValue }) => {
  return (
    <div className={"flex flex-col"}>
      <Hint text={title} />

      <input
        id={`${title}-input`}
        className={
          "p-2 rounded-md border border-neutral-400 focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
        }
        type={"text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const Textarea: React.FC<{
  title: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}> = ({ title, placeholder, value, setValue }) => {
  return (
    <div className={"flex flex-col"}>
      <Hint text={title} />

      <textarea
        id={`${title}-input`}
        className={
          "p-2 rounded-md border border-neutral-400 focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
        }
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const Checkbox: React.FC<{
  title: string;
  value: boolean;
  setValue: (value: boolean) => void;
}> = ({ title, value, setValue }) => {
  return (
    <div className={"flex flex-row space-x-2"}>
      <Description text={title} />

      <input
        id={`${title}-checkbox`}
        className={
          "p-2 rounded-md border border-neutral-400 focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
        }
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
        type={"checkbox"}
      />
    </div>
  );
};

const Upload: React.FC = () => {
  const [picture, setPicture] = useState<File>();
  const [pictureName, setPictureName] = useState<string>("");
  const [pictureDescription, setPictureDescription] = useState<string>("");
  const [pictureYear, setPictureYear] = useState<string>("");
  const [pictureFeatured, setPictureFeatured] = useState<boolean>(false);

  const [result, setResult] = useState<string>("");
  const [resultColor, setResultColor] = useState<string>("text-green-700");
  const [resultTime, setResultTime] = useState<number>(10000);

  useEffect(() => {
    const timeoutId = setTimeout(() => setResult(""), resultTime);

    return () => clearTimeout(timeoutId);
  }, [result]);

  const resetStates = () => {
    setPicture(undefined);
    setPictureYear("");
    setPictureName("");
    setPictureDescription("");
    setPictureFeatured(false);
  };

  return (
    <div className="flex flex-col items-start p-4">
      <Title text={"Last opp bilder"} />

      <div className={"flex flex-col space-y-2"}>
        <Hint text={"Bilde som skal lastes opp"} />

        <input
          id={"bilde-input"}
          className={
            "border p-2 border-neutral-400 rounded-md file:rounded-md file:px-10 file:mr-5 file:p-2 file:border-none file:text-xs file:bg-blue-700 file:text-neutral-100 hover:file:cursor-pointer hover:file:bg-blue-800"
          }
          type={"file"}
          accept={"image/*"}
          onChange={(e) => {
            if (!e.target || !e.target.files || !e.target.files[0]) return;

            //5mb
            if (e.target.files[0].size / 1024 > 5000) return;
            setPicture(e.target.files[0]);
          }}
        />

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

        <div className={"flex flex-col"}>
          <button
            className="w-full p-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
            disabled={picture?.name === ""}
            onClick={async () => {
              if (picture === undefined) return;
              let shouldContinue = true;

              setResultTime(10000);
              setResultColor("text-green-700");
              setResult("Starting upload process...");

              const storageRef = ref(storage, `${pictureName}`);

              //Filename already exists?
              try {
                await getMetadata(storageRef);
                shouldContinue = false;
              } catch (error) {
                shouldContinue = true;
              }

              if (!shouldContinue) {
                setResultTime(2000);
                setResultColor("text-red-700");
                setResult("Bilde med samme navn eksisterer allerede");

                return;
              }

              const uploadTask = uploadBytesResumable(storageRef, picture);

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                  setResult(`Upload is ${progress}% done`);
                },
                (error) => {
                  console.error("Error during upload:", error);
                  setResult(`Error uploading file: ${error.message}`);

                  resetStates();
                },
                async () => {
                  try {
                    setResult("Getting url from server...");
                    const url = await getDownloadURL(storageRef);

                    const pictureData = {
                      name: pictureName,
                      alt: pictureName,
                      description: pictureDescription,
                      year: pictureYear,
                      featured: pictureFeatured,
                      url: url,
                    };

                    setResult("Inserting picture into the firestore database.");
                    await addDoc(
                      collection(db, "global/info/images"),
                      pictureData,
                    );

                    setResult("Updating the changes made timestamp");
                    await updateDoc(doc(db, "global", "info"), {
                      last_changes_made: new Date().toISOString(),
                    });

                    setResultTime(3500);
                    setResultColor("text-green-700");
                    setResult("File uploaded & URL retrieved successfully");
                    resetStates();
                  } catch (error) {
                    console.error("Error during Firestore operation:", error);

                    setResultTime(3500);
                    setResultColor("text-red-700");
                    setResult(`Error in Firestore operation: ${error}`);
                    resetStates();
                  }
                },
              );
            }}
          >
            Last opp
          </button>

          <Hint text={result} customStyle={resultColor} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
