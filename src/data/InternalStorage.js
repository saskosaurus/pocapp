import { reactive } from "vue";
import { UserData } from "@/models/UserData.js";
import { storageConstants } from "@/constants/Constants";

let store = reactive({
  searchInput: "",
  posts: [],
  selectedPost: sessionStorage.getItem(storageConstants.SELECTED_POST_ID),
  lastDoc: null,
  hasMorePosts: false,

  setPosts(posts) {
    this.posts = posts;
  },

  addPosts(newPosts) {
    const existingIds = new Set(this.posts.map((post) => post.id));
    const filteredNewPosts = newPosts.filter((post) => !existingIds.has(post.id));
    this.posts = [...this.posts, ...filteredNewPosts];
  },

  setSelectedPostId(postId) {
    this.selectedPost = postId;
    sessionStorage.setItem(storageConstants.SELECTED_POST_ID, postId);
  },

  incrementPostLikes(postId) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.likes++;
    }
  },
  incrementCommentCount(postId) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.commentsCount++;
    }
  },
});

let auth = reactive({
  user: JSON.parse(sessionStorage.getItem(storageConstants.USER_DATA)) || null,

  setUser(userData) {
    this.user = userData;
    sessionStorage.setItem(storageConstants.USER_DATA, JSON.stringify(userData));
    return true;
  },

  getUser() {
    return new UserData(this.user.id, this.user.email, this.user.nickname, this.user.profileImage);
  },

  isAuthenticated() {
    return !!this.user;
  },

  logOutUser() {
    console.log("Logging out user;");
    this.user = null;
    store.posts = [];
    sessionStorage.removeItem(storageConstants.USER_DATA);
  },
});

export { auth, store };
