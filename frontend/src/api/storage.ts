import { firebaseStorage } from ".";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";



export const storage = {
  /**
   * Uploads an image to firebase cloud storage, returns the url to the image
   * 
   * @param {File} file 
   */
  uploadImage: async (file: File) => {
    try {
      const blogImagesRef = ref(firebaseStorage, 'blog-images');
      const imageRef = ref(blogImagesRef, `${Date.now()}_${file.name}`);
      const result = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(result.ref);
      return url;
    } catch (error) {
      throw error;
    }
  },

  deleteImage: async (path: string) => {
    try {
      const blogImagesRef = ref(firebaseStorage, 'blog-images');
      const imageRef = ref(blogImagesRef, path);
      return await deleteObject(imageRef);
    } catch (error) {
      throw error;
    }
  }
};