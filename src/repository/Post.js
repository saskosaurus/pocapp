import { db } from "@/database/Firebase.js";
import { doc, collection, setDoc, getDocs, updateDoc, increment, query, where, deleteDoc } from "firebase/firestore";
import { dbConstants } from "@/constants/Constants.js";
import { PostData } from "@/models/PostData.js";
import axios from "axios";

let Post = {
  async newPost(newPostRequest) {
    try {
      await setDoc(doc(db, dbConstants.POSTS, newPostRequest.id), {
        postData: newPostRequest,
      });
      return true;
    } catch (error) {
      console.error("Error creating new post: ", error);
      return false;
    }
  },

  async uploadImageToCloudinary(file) {
    if (!file) {
      console.alert("Image file is missing!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pocgramUnsigned");
      const response = await axios.post("https://api.cloudinary.com/v1_1/dm1eb7sdv/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload to storage successful");
      return response.data.secure_url;
    } catch (error) {
      console.error("Storage upload failed", error);
      return null;
    }
  },

  async fetchPosts() {
    try {
      const querySnapshot = await getDocs(collection(db, dbConstants.POSTS));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data().postData;
        const post = new PostData(doc.id, data.postedBy || null, data.title || null, data.description || null, data.imageUrl || null, data.postedAt || null, data.likes || null, data.commentsCount || null);
        fetchedPosts.push(post);
      });
      return fetchedPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return null;
    }
  },

  async postComment(comment) {
    try {
      await setDoc(doc(db, dbConstants.COMMENTS, comment.id), {
        commentData: comment,
      });

      const postRef = doc(db, dbConstants.POSTS, comment.postId);
      await updateDoc(postRef, {
        "postData.commentsCount": increment(1),
      });
      return true;
    } catch (error) {
      console.error("Error posting comment: ", error);
      return false;
    }
  },

  async fetchComments(postId) {
    try {
      const commentsRef = collection(db, dbConstants.COMMENTS);
      const q = query(commentsRef, where("commentData.postId", "==", postId));
      const querySnapshot = await getDocs(q);
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push(doc.data());
      });
      return comments;
    } catch (error) {
      console.error("Error fetching comments: ", error);
      return null;
    }
  },

  async likePost(postId) {
    try {
      const postRef = doc(db, dbConstants.POSTS, postId);
      await updateDoc(postRef, {
        "postData.likes": increment(1),
      });
      return true;
    } catch (error) {
      console.error("Error liking post: ", error);
      return false;
    }
  },

  async deletePost(postId) {
    try {
      const postRef = doc(db, dbConstants.POSTS, postId);
      await deleteDoc(postRef);
      return true;
    } catch (error) {
      console.error("Error deleting post: ", error);
      return false;
    }
  },
};

export default Post;
