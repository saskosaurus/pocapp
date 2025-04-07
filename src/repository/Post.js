import { db } from "@/database/Firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { dbConstants } from "@/constants/Constants.js";

let Post = {
  async newPost(newPostRequest) {
    console.log("ENTERED METHOD: newPost");
    try {
      await setDoc(doc(db, dbConstants.POSTS, newPostRequest.id), {
        postData: newPostRequest,
      });
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  },
};

export default Post;
