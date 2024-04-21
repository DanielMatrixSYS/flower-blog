import {
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
} from "firebase/storage";
import { storage } from "./Firebase";
import { FirebaseError } from "@firebase/util";

export interface ImageProps {
  id: string;
  url: string;
  alt: string;
  featured?: boolean;
}

export async function getImages(year: number): Promise<ImageProps[]> {
  const imageRef = ref(storage, `${year}/`);

  try {
    const res = await listAll(imageRef);
    if (res.items.length === 0) return [];

    const urlPromises = res.items.map(async (itemRef: StorageReference) => {
      const url = await getDownloadURL(itemRef);

      return {
        id: itemRef.name,
        url: url,
        alt: itemRef.name,
      };
    });

    return await Promise.all(urlPromises);
  } catch (error) {
    console.error("Error fetching images: ", error);
    return [];
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
