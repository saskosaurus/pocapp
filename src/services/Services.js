import Authentication from "@/repository/Authentication.js";
import Post from "@/repository/Post.js";
import { auth } from "@/data/InternalStorage";

let services = {
  async signUp(signUpRequest) {
    const response = await Authentication.signUp(signUpRequest);
    if (response) {
      auth.setUser(response);
      return true;
    } else {
      return false;
    }
  },

  async signIn(signInRequest) {
    const response = await Authentication.signIn(signInRequest);
    if (response) {
      auth.setUser(response);
      return true;
    } else {
      return false;
    }
  },

  async newPost(newPostRequest) {
    const response = await Post.newPost(newPostRequest.toJSON());
    if (response) {
      return true;
    } else {
      return false;
    }
  },

  async uploadImageToCloudinary(file) {
    return await Post.uploadImageToCloudinary(file);
  },
};

export default services;
