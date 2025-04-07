import { db } from "@/database/Firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { dbConstants } from "@/constants/Constants.js";
import axios from "axios";

let Post = {
  async newPost(newPostRequest) {
    console.log("ENTERED METHOD: newPost");
    try {
      await setDoc(doc(db, dbConstants.POSTS, newPostRequest.id), {
        postData: newPostRequest,
      });
      return true;
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  },

  async uploadImageToCloudinary(file) {
    console.log("ENTERED METHOD: uploadImageToCloudinary");
    if (!file) {
      console.alert("Image file is missing!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pocgramUnsigned");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dm1eb7sdv/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload to Cloudinary successful", response.data);
      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed", error);
      return null;
    }
  },
};

export default Post;
