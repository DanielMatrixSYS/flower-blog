import React, { useEffect, useState } from "react";
import Title from "../components/Typography/Title.tsx";
import Hint from "../components/Typography/Hint.tsx";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../components/Firebase.tsx";

const Upload: React.FC = () => {
  const [pictureName, setPictureName] = useState<string>("");
  const [picture, setPicture] = useState<File>();
  const [result, setResult] = useState<string>("");
  const [pictureYear, setPictureYear] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => setResult(""), 10000);

    return () => clearTimeout(timeoutId);
  }, [result]);

  return (
    <div className="flex flex-col items-start p-4 space-y-4">
      <Title text={"Last opp bilder"} />

      <div className={"flex flex-col"}>
        <Hint text={"Bilde navn"} />

        <input
          id={"navn-input"}
          className={
            "p-2 rounded-md border border-neutral-400 focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
          }
          type={"text"}
          placeholder={"Mitt bilde"}
          value={pictureName}
          onChange={(e) => setPictureName(e.target.value)}
        />
      </div>

      <div className={"flex flex-col"}>
        <Hint text={"Hvilket år ble bildet tatt i?"} />

        <input
          id={"år-input"}
          className={
            "p-2 rounded-md border border-neutral-400 focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
          }
          type={"text"}
          placeholder={"Bilde år"}
          value={pictureYear}
          onChange={(e) => setPictureYear(e.target.value)}
        />
      </div>

      <div className={"flex flex-col"}>
        <Hint text={"Bilde som skal lastes opp"} />

        <div className={"flex flex-col space-y-2"}>
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

          <button
            className="w-full p-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
            disabled={picture?.name === ""}
            onClick={() => {
              if (picture === undefined) return;

              const fileRef = ref(storage, `${pictureYear}/${pictureName}`);
              const uploadTask = uploadBytesResumable(fileRef, picture);

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  setResult(`Upload is ${progress}% done`);
                },
                (error) => {
                  setResult(`Error uploading file: ${error.message}`);
                  setPicture(undefined);
                  setPictureYear("");
                  setPictureName("");
                },
                () => {
                  setResult("File uploaded successfully");
                  setPicture(undefined);
                  setPictureYear("");
                  setPictureName("");
                },
              );
            }}
          >
            Last opp
          </button>

          <Hint text={result} customStyle={"text-green-700"} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
