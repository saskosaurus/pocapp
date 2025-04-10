import { db } from "@/database/Firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { dbConstants } from "@/constants/Constants";

let Profile = {
  async editProfile(userData) {
    try {
      const postRef = doc(db, dbConstants.USERS, userData.id);
      await updateDoc(postRef, {
        "userData.profileImage": userData.profileImage,
        "userData.nickname": userData.nickname,
      });
      return true;
    } catch (error) {
      console.error("Error liking post: ", error);
      return false;
    }
  },
};

export default Profile;
