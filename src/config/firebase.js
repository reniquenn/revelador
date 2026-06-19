import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

let app;
let storage;

export const initializeFirebase = () => {
  try {
    app = initializeApp(firebaseConfig);
    storage = getStorage(app);
    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return false;
  }
};

export const uploadImage = async (imageUri, path) => {
  try {
    if (!storage) {
      throw new Error('Firebase storage not initialized');
    }

    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getImageUrl = async (path) => {
  try {
    if (!storage) {
      throw new Error('Firebase storage not initialized');
    }

    const storageRef = ref(storage, path);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
};

export const deleteImage = async (path) => {
  try {
    if (!storage) {
      throw new Error('Firebase storage not initialized');
    }

    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};