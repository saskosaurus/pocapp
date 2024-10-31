import { reactive } from "vue";
import { posts } from "@/data/MockData.js";

let store = reactive({
  isLoggedIn: null,
  searchInput: "",
  posts: posts,
  selectedPost: null,
});

let auth = reactive({
  setUser(username, password) {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        username: username,
        password: password,
        avatarImgUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      })
    );
    return true;
  },

  getUser() {
    return JSON.parse(localStorage.getItem("userData"));
  },

  isAuthenticated() {
    return store.isLoggedIn;
  },

  logInUser(username, password) {
    console.log("Logging in user;");
    this.setUser(username, password);
    store.isLoggedIn = true;
    return;
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
