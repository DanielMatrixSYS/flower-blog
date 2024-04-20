import {
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
} from "firebase/storage";
import { storage } from "./Firebase";

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
