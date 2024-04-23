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

export async function getAllImages(): Promise<ImageProps[]> {
  const imageRef = ref(storage, `/`);

  try {
    const res = await listAll(imageRef);
    let allImages: ImageProps[] = [];

    if (res.prefixes.length > 0) {
      const allPromises = await Promise.all(
        res.prefixes.map(async (prefixRef) => {
          const prefixRes = await listAll(prefixRef);
          const itemRef = prefixRes.items;

          const urlPromises = itemRef.map(async (image: StorageReference) => {
            const url = await getDownloadURL(image);

            return {
              id: image.name,
              url: url,
              alt: image.name,
            };
          });

          return await Promise.all(urlPromises);
        }),
      );

      allImages = allPromises.flat();
    }

    return allImages;
  } catch (error) {
    console.log(error);
  }

  return [];
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
