import { reactive } from "vue";

let store = reactive({
  isLoggedIn: null,
  searchInput: "",
});

let auth = reactive({
  setUser(username, password) {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        isLoggedIn: true,
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
  },

  logOutUser() {
    this.removeUserData();
    console.log("Logging out user;");
    store.isLoggedIn = false;
  },

  removeUserData() {
    console.log("removeUserData");
    localStorage.removeItem("userData");
  },
});

export { auth, store };
