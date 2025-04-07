import { reactive } from "vue";
import { posts } from "@/data/MockData.js";

let store = reactive({
  isLoggedIn: null,
  searchInput: "",
  posts: posts,
  selectedPost: null,
});

let auth = reactive({
  setUser(userData) {
    store.isLoggedIn = true;
    localStorage.setItem("userData", JSON.stringify(userData));
    return true;
  },

  getUser() {
    return JSON.parse(localStorage.getItem("userData"));
  },

  isAuthenticated() {
    return store.isLoggedIn;
  },

  logOutUser() {
    this.removeUserData();
    console.log("Logging out user;");
    store.isLoggedIn = false;
    return;
  },

  removeUserData() {
    console.log("removeUserData");
    localStorage.removeItem("userData");
    return;
  },
});

export { auth, store };
