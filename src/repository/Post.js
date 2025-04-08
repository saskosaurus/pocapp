import { db } from "@/database/Firebase.js";
import { doc, collection, setDoc, getDocs, updateDoc, increment, query, where } from "firebase/firestore";
import { dbConstants } from "@/constants/Constants.js";
import { PostData } from "@/models/PostData.js";
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

  async fetchPosts() {
    console.log("ENTERED METHOD: fetchPosts");
    try {
      const querySnapshot = await getDocs(collection(db, dbConstants.POSTS));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data().postData;
        const post = new PostData(doc.id, data.postedBy || null, data.title || null, data.description || null, data.imageUrl || null, data.postedAt || null, data.likes || null, data.commentsCount || null);
        fetchedPosts.push(post);
      });

      console.log("Posts fetched:", fetchedPosts);
      return fetchedPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return null;
    }
  },

  async postComment(comment) {
    console.log("ENTERED METHOD: postComment");
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
      console.error("Error: ", error);
      return null;
    }
  },

  async fetchComments(postId) {
    console.log("ENTERED METHOD: fetchComments");
    const commentsRef = collection(db, dbConstants.COMMENTS);
    const q = query(commentsRef, where("commentData.postId", "==", postId));
    try {
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
};

export default Post;
