<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-app-bar-title>Instagram</v-app-bar-title>

        <v-btn v-if="store.isLoggedIn" style="color: #8e24aa" @click="home()"
          >home</v-btn
        >
        <v-btn v-if="store.isLoggedIn" style="color: #8e24aa" @click="profile()"
          >profile</v-btn
        >
        <v-btn v-if="store.isLoggedIn" style="color: #8e24aa" @click="newPost()"
          >new post</v-btn
        >
        <v-btn v-if="!store.isLoggedIn" style="color: #8e24aa" @click="login()"
          >login</v-btn
        >
        <v-btn
          v-if="!store.isLoggedIn"
          style="color: #8e24aa"
          @click="register()"
          >register</v-btn
        >

        <v-card
          v-if="store.isLoggedIn"
          class="mx-auto"
          color="transparent"
          max-width="400"
          width="400"
          variant="flat"
        >
          <v-card-text>
            <v-text-field
              v-model="store.inputSearch"
              @blur="store.inputSearch = ''"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="Search post"
              base-color="grey-darken-3"
              bg-color="grey-darken-4"
              color="grey-darken-3"
              hide-details
              single-line
              @click:append-inner="onClick"
            >
            </v-text-field>
          </v-card-text>
        </v-card>
        <v-btn v-if="store.isLoggedIn" style="color: #8e24aa" @click="logout()"
          >logout</v-btn
        >
      </v-app-bar>
      <div id="routerView">
        <router-view />
      </div>
      <v-footer>
        <v-row justify="center" no-gutters>
          <v-col class="text-center mt-4" cols="12">
            {{ new Date().getDay }} — saskosaurus
          </v-col>
        </v-row>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import { auth, store } from "@/data/InternalStorage.js";
export default {
  name: "App",

  data() {
    return { auth, store };
  },

  methods: {
    isLoggedIn() {
      return auth.isAuthenticated();
    },
    getUsername() {
      return auth.getUser();
    },

    login() {
      console.log("Navigate: login");
      this.$router.push({ path: "/login" });
    },
    logout() {
      console.log("Navigate: logout");
      auth.logOutUser();
      this.$router.push({ path: "/login" });
    },
    register() {
      console.log("Navigate: register");
      this.$router.push({ path: "/register" });
    },
    home() {
      console.log("Navigate: home");
      this.$router.push({ path: "/" });
    },
    newPost() {
      console.log("Navigate: newPost");
      this.$router.push({ path: "/newPost" });
    },
    profile() {
      console.log("Navigate: profile");
      this.$router.push({ path: "/profile" });
    },
    emptySearch() {
      store.searchInput = "";
    },
  },
};
</script>

<style>
@font-face {
  font-family: "instagram";
  src: url(./assets/instagram.otf.otf);
}

.v-btn__content {
  color: white;
}
.v-main {
  background-image: linear-gradient(
    180deg,
    rgb(255, 255, 255) 36%,
    rgb(39, 39, 39) 100%
  );
}
.v-toolbar__content {
  background-color: black;
}
.v-footer {
  color: white;
  font-family: "roboto";
  font-size: 12px;
  background-color: transparent;
}
.v-app-bar-title {
  color: white;
  font-family: "instagram";
  letter-spacing: 1.5pt;
  font-size: 25;
}
</style>
