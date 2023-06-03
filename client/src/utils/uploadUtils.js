import randomString from "./randomString";

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

// Uploading to Firebase while editing the hero
export const handleUploadImagesEdit = async (images) => {
  const updatedImages = [...images];

  for (let i = 0; i < images.length; i++) {
    const img = updatedImages[i];

    // pass pics that already were in hero
    if (typeof img === "string") {
      continue;
    }

    // generate name for uploading
    const string = randomString();
    const imgRef = ref(storage, `heroes/${string}-${img.name}`);

    // upload new pics on firebase and return url
    const snapshot = await uploadBytes(imgRef, img);
    const url = await getDownloadURL(snapshot.ref);

    updatedImages[i] = url;
  }

  return updatedImages;
};

// Uploading to Firebase while creating the hero
export const handleUploadImagesCreate = async (images) => {
  const updatedImages = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];

    // generate name for uploading
    const string = randomString();
    const imgRef = ref(storage, `heroes/${string}-${img.name}`);

    // upload new pics on firebase and return url
    const snapshot = await uploadBytes(imgRef, img);
    const url = await getDownloadURL(snapshot.ref);

    updatedImages.push(url);
  }

  return updatedImages;
};