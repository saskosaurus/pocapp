import { reactive } from "vue";

let store = reactive({
  searchInput: "",
  posts: JSON.parse(sessionStorage.getItem("posts")) || [],
  selectedPost: sessionStorage.getItem("selectedPostId"),

  setPosts(posts) {
    this.posts = posts;
    sessionStorage.setItem("posts", JSON.stringify(posts));
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
    return this.user;
  },

  isAuthenticated() {
    return !!this.user;
  },

  logOutUser() {
    console.log("Logging out user;");
    this.user = null;
    sessionStorage.removeItem("userData");
  },
});

export { auth, store };
