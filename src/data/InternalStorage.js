import { reactive } from "vue";
import { UserData } from "@/models/UserData.js";

let store = reactive({
  searchInput: "",
  posts: [],
  selectedPost: sessionStorage.getItem("selectedPostId"),
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
    sessionStorage.setItem("selectedPostId", postId);
  },
});

let auth = reactive({
  user: JSON.parse(sessionStorage.getItem("userData")) || null,

  setUser(userData) {
    this.user = userData;
    sessionStorage.setItem("userData", JSON.stringify(userData));
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
    sessionStorage.removeItem("userData");
  },
});

export { auth, store };
