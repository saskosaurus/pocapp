import { auth, db } from "@/database/Firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { dbConstants } from "@/constants/Constants";
import { UserData } from "@/models/UserData";

let Authentication = {
  async signUp(signUpRequest) {
    try {
      const user = await createUserWithEmailAndPassword(auth, signUpRequest.email, signUpRequest.password);
      await this.addUserToCollection(signUpRequest, user.user.uid);
      return await this.fetchUserFromCollection(user.user.uid);
    } catch (error) {
      console.error("Error: ", error.message);
      return null;
    }
  },

  async signIn(signInRequest) {
    try {
      const user = await signInWithEmailAndPassword(auth, signInRequest.email, signInRequest.password);
      return await this.fetchUserFromCollection(user.user.uid);
    } catch (error) {
      console.error("Error: ", error.message);
      return null;
    }
  },

  async addUserToCollection(signUpRequest, userId) {
    try {
      await setDoc(doc(db, dbConstants.USERS, userId), {
        userData: new UserData(userId, signUpRequest.email, signUpRequest.nickname, "https://i.pravatar.cc/150?u=a042581f4e29026704d").toJSON(),
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  },

  async fetchUserFromCollection(userId) {
    try {
      const user = await getDoc(doc(db, dbConstants.USERS, userId));
      if (user.exists()) {
        return UserData.fromFirestore(user);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  },
};

export default Authentication;
