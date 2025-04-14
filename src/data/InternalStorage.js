import { reactive } from "vue";
import { UserData } from "@/models/UserData.js";

let store = reactive({
  searchInput: "",
  posts: JSON.parse(sessionStorage.getItem("posts")) || [],
  selectedPost: sessionStorage.getItem("selectedPostId"),

  setPosts(posts) {
    this.posts = posts;
    sessionStorage.setItem("posts", JSON.stringify(posts));
  },

  addPosts(newPosts) {
    const existingIds = new Set(this.posts.map((post) => post.id));
    const filteredNewPosts = newPosts.filter((post) => !existingIds.has(post.id));
    this.posts = [...this.posts, ...filteredNewPosts];
    sessionStorage.setItem("posts", JSON.stringify(this.posts));
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
    sessionStorage.removeItem("userData");
  },
});

export { auth, store };
