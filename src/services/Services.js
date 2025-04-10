import Authentication from "@/repository/Authentication.js";
import Post from "@/repository/Post.js";
import { auth, store } from "@/data/InternalStorage";
import { SignUpRequest } from "@/models/SignUpRequest";
import { SignInRequest } from "@/models/SignInRequest.js";
import { NewPostRequest } from "@/models/NewPostRequest.js";
import { NewCommentRequest } from "@/models/NewCommentRequest.js";

let services = {
  async signUp(email, password, nickname) {
    const signUpRequest = new SignUpRequest(email, password, nickname);
    console.log("Request: ", signUpRequest);
    const response = await Authentication.signUp(signUpRequest);
    console.log("Response: ", response);
    if (response) {
      auth.setUser(response);
      return true;
    } else {
      return false;
    }
  },

  async signIn(email, password) {
    const signInRequest = new SignInRequest(email, password);
    console.log("Request: ", signInRequest);
    const response = await Authentication.signIn(signInRequest);
    console.log("Response: ", response);
    if (response) {
      auth.setUser(response);
      return true;
    } else {
      return false;
    }
  },

  async newPost(title, description, imageUrl) {
    const newPostRequest = new NewPostRequest(auth.getUser().toJSON(), title, description, imageUrl);
    console.log("Request: ", newPostRequest);
    const response = await Post.newPost(newPostRequest.toJSON());
    console.log("Response: ", response);
    if (response) {
      store.posts.push(newPostRequest);
      return true;
    } else {
      return false;
    }
  },

  async uploadImageToCloudinary(file) {
    console.log("Request: ", file);
    const response = await Post.uploadImageToCloudinary(file);
    console.log(response);
    return response;
  },

  async fetchPosts() {
    const response = await Post.fetchPosts();
    console.log("Fetched posts: ", response);
    if (response != null) {
      store.setPosts(response);
    }
    return response;
  },

  async postComment(postId, text) {
    const newCommentRequest = new NewCommentRequest(postId, text, auth.getUser().toJSON());
    console.log("Request: ", newCommentRequest);
    const response = await Post.postComment(newCommentRequest.toJSON());
    console.log("Response: ", response);
    return response;
  },

  async fetchComments(postId) {
    console.log("Request: ", postId);
    const response = await Post.fetchComments(postId);
    console.log("Response: ", response);
    return response;
  },

  async likePost(postId) {
    console.log("Request: ", postId);
    const response = await Post.likePost(postId);
    console.log("Response: ", response);
    return response;
  },

  async deletePost(postId) {
    console.log("Request: ", postId);
    const response = await Post.deletePost(postId);
    console.log("Response: ", response);
    return response;
  },
};

export default services;
