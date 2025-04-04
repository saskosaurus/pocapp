import {auth} from "@/database/Firebase.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

let Authentication = {

    async signUp(email, password){
        console.log("ENTERED METHOD: signUp")
        console.log(email + " ; " + password)

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User Registered:", user);
          } catch (error) {
            console.error("Error:", error.message);
          }
    },

    async signIn(email, password){
        console.log("ENTERED METHOD: signIn")
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log("User Signed In:", user);
          } catch (error) {
            console.error("Error:", error.message);
          }
    }
}


export default Authentication;