import {
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "./Firebase";

import { db } from "./Firebase";
import { FirebaseError } from "@firebase/util";

export interface ImageProps {
  id: string;
  url: string;
  alt: string;
  year: string;
  description: string;
  name: string;
  featured: boolean;
}

const shouldGetFromDatabase = async (): Promise<boolean> => {
  const cache = localStorage.getItem("last_changes_made");
  if (!cache) return true;

  const last_changes_made = doc(db, "global/info");

  const docSnap = await getDoc(last_changes_made);
  if (!docSnap.exists()) return true;

  const data = docSnap.data();
  if (!data) return true;

  const databaseDate = new Date(data.last_changes_made);
  const cachedDate = new Date(cache);

  return databaseDate > cachedDate;
};

export async function getAllImagesCached(): Promise<ImageProps[]> {
  const shouldRetrieveFromDatabase = await shouldGetFromDatabase();

  if (!shouldRetrieveFromDatabase) {
    const imagesJson = localStorage.getItem("images");

    console.log("Getting images from local cache.");

    if (imagesJson) {
      return JSON.parse(imagesJson);
    } else {
      console.log("No images in local cache. Going to firestore.");
    }
  } else {
    console.log("Getting images from Firestore.");
  }

  const imageCollection = collection(db, "global/info/images");
  const docs = await getDocs(imageCollection);

  const images: (ImageProps | null)[] = await Promise.all(
    docs.docs.map(async (doc) => {
      const data = doc.data();
      const id = doc.id;

      if (data) {
        const { alt, featured, year, description, url, name } = data;
        const image: ImageProps = {
          id,
          url,
          alt,
          featured,
          year,
          description,
          name,
        };

        return image;
      }

      return null;
    }),
  );

  const filteredImages: ImageProps[] = images.filter(
    (image) => image !== null,
  ) as ImageProps[];

  localStorage.setItem("images", JSON.stringify(filteredImages));
  localStorage.setItem("last_changes_made", new Date().toISOString());

  return filteredImages;
}

export async function deleteImage(id: string): Promise<boolean> {
  try {
    const imageRef = doc(db, "global/info/images", id);
    const name = (await getDoc(imageRef)).data()?.name;

    if (!name || name === "") {
      console.error("Image not found in database.");

      return false;
    }

    await deleteDoc(imageRef).then(() => {
      const storageRef = ref(storage, `${name}`);

      deleteObject(storageRef).then(() => {
        console.log("Image deleted successfully.");
      });
    });

    await updateDoc(doc(db, "global", "info"), {
      last_changes_made: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);

    return false;
  }
}

export async function getImage(id: string): Promise<ImageProps> {
  const imageRef = doc(db, "global/info/images", id);
  const docSnap = await getDoc(imageRef);

  if (!docSnap.exists()) {
    throw new Error("Image not found.");
  }

  const data = docSnap.data();

  if (!data) {
    throw new Error("Image not found.");
  }

  const { alt, featured, year, description, url, name } = data;

  return {
    id,
    url,
    alt,
    featured,
    year,
    description,
    name,
  };
}

export async function updateImage(
  id: string,
  imageData: ImageProps,
): Promise<boolean> {
  try {
    const imageRef = doc(db, "global/info/images", id);
    await updateDoc(imageRef, {
      description: imageData.description,
      featured: imageData.featured,
      name: imageData.name,
      year: imageData.year,
    });

    await updateDoc(doc(db, "global", "info"), {
      last_changes_made: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("Error updating image:", error);

    return false;
  }
}

export function getNiceErrorMessage(error: FirebaseError): {
  code: string;
  message: string;
} {
  let userFriendlyMessage = "";

  switch (error.code) {
    case "auth/email-already-in-use":
      userFriendlyMessage =
        "Denne e-posten er allerede registrert. Vennligst prøv å logge inn.";
      break;
    case "auth/invalid-email":
      userFriendlyMessage = "Vennligst oppgi en gyldig e-postadresse.";
      break;
    case "auth/weak-password":
      userFriendlyMessage =
        "Passordet ditt bør være sterkere. Vennligst velg et mer komplekst passord.";
      break;
    default:
      userFriendlyMessage = "Noe gikk galt. Vennligst prøv igjen senere.";
  }

  return { code: error.code, message: userFriendlyMessage };
}
