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
    try {
      await Post.newPost(newPostRequest.toJSON());
      return true;
    } catch (error) {
      console.error("Error making new post: ", error);
      return false;
    }
  },

  async uploadImageToCloudinary(file) {
    return await Post.uploadImageToCloudinary(file);
  },

  async fetchPosts() {
    return await Post.fetchPosts();
  },

  async postComment(comment) {
    try {
      await Post.postComment(comment.toJSON());
      return true;
    } catch (error) {
      console.error("Error posting comment: ", error);
      return false;
    }
  },

  async fetchComments(postId) {
    return await Post.fetchComments(postId);
  },

  async likePost(postId) {
    try {
      await Post.likePost(postId);
      return true;
    } catch (error) {
      console.error("Error liking post: ", error);
      return false;
    }
  },

  async deletePost(postId) {
    try {
      await Post.deletePost(postId);
      return true;
    } catch (error) {
      console.error("Error deleting post: ", error);
      return false;
    }
  },
};

export default services;
