import { db, firebaseStorage } from ".";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



export const storage = {
  /**
   * 
   * @param {File} file 
   */
  uploadImage: async (file) => {
    try {
      console.log(file.name)
      const blogImagesRef = ref(firebaseStorage, 'blog-images');
      const imageRef = ref(blogImagesRef, `${file.name}_${Date.now()}`);
      const result = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(result.ref);
      return url;
    } catch (error) {
      throw error;
    }
  }
};