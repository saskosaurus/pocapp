import { reactive } from "vue";

let store = reactive({
  isLoggedIn: false,
  searchInput: "",
});

let auth = {
  setUser(username, password) {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        isLoggedIn: true,
        username: username,
        password: password,
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
};

export { auth, store };
