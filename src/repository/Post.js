import { db } from "@/database/Firebase.js";
import { doc, collection, setDoc, getDocs, updateDoc, increment, query, where, deleteDoc, orderBy, limit, startAfter } from "firebase/firestore";
import { dbConstants } from "@/constants/Constants.js";
import { PostData } from "@/models/PostData.js";
import { CommentData } from "@/models/CommentData.js";

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

  async fetchPosts(lastDocument = null) {
    try {
      let q = collection(db, dbConstants.POSTS);
      if (lastDocument) {
        q = query(q, orderBy("postData.postedAt", "desc"), startAfter(lastDocument), limit(6));
      } else {
        q = query(q, orderBy("postData.postedAt", "desc"), limit(6));
      }

      const querySnapshot = await getDocs(q);
      const fetchedPosts = [];
      const docs = querySnapshot.docs; // get array of docs
      const hasMore = docs.length === 6; // if 6 items were fetched, there is more!
      const docsToMap = hasMore ? docs.slice(0, 5) : docs; // only map first 5 posts

      docsToMap.forEach((doc) => {
        const data = doc.data().postData;
        const post = new PostData(doc.id, data.postedBy || null, data.title || null, data.description || null, data.imageUrl || null, data.postedAt || null, data.likes || null, data.commentsCount || null);
        fetchedPosts.push(post);
      });

      const lastDoc = docsToMap[docsToMap.length - 1]; // last mapped doc (5th post)

      return { posts: fetchedPosts, lastDoc, hasMore };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return null;
    }
  },

  async postComment(newCommentRequest) {
    try {
      await setDoc(doc(db, dbConstants.COMMENTS, newCommentRequest.id), {
        commentData: newCommentRequest,
      });

      const postRef = doc(db, dbConstants.POSTS, newCommentRequest.postId);
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
        const data = doc.data().commentData;
        const comment = new CommentData(doc.id, data.postId || null, data.text || null, data.postedBy || null, data.postedAt || null);
        comments.push(comment);
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
