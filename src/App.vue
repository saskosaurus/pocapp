<template>
  <v-app>
    <v-main>
      <v-app-bar v-if="isLoggedIn">
        <v-app-bar-title>poc gram</v-app-bar-title>
        <v-card class="mx-auto d-none d-md-block" color="transparent" max-width="400" width="400" variant="flat" v-if="this.$route.path === '/'">
          <v-card-text>
            <v-text-field
              v-model="store.searchInput"
              @blur="store.searchInput = ''"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="Search post"
              base-color="grey-darken-3"
              bg-color="grey-darken-4"
              color="grey-darken-3"
              hide-details
              single-line
              class="search-field"
            >
            </v-text-field>
          </v-card-text>
        </v-card>
        <v-btn class="nav-btn" @click="home()">HOME</v-btn>
        <v-btn class="nav-btn" @click="newPost()">NEW POST</v-btn>
        <v-btn class="nav-btn" @click="logout()">LOGOUT</v-btn>
        <v-avatar size="30" style="margin-right: 15px">
          <v-img alt="John" :src="profileImage"></v-img>
        </v-avatar>
      </v-app-bar>
      <div id="routerView">
        <router-view />
      </div>
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
    getUsername() {
      return auth.getUser();
    },

    login() {
      console.log("NAVIGATE: login");
      this.$router.push({ path: "/login" });
    },
    logout() {
      console.log("NAVIGATE: logout");
      auth.logOutUser();
      this.$router.push({ path: "/login" });
    },
    register() {
      console.log("NAVIGATE: register");
      this.$router.push({ path: "/register" });
    },
    home() {
      console.log("NAVIGATE: home");
      this.$router.push({ path: "/" });
    },
    newPost() {
      console.log("NAVIGATE: newPost");
      this.$router.push({ path: "/newPost" });
    },
    emptySearch() {
      store.searchInput = "";
    },
  },

  computed: {
    isLoggedIn() {
      return auth.isAuthenticated();
    },

    profileImage() {
      return this.isLoggedIn ? auth.getUser()?.profileImage : null;
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

.nav-btn {
  font-family: "Roboto", sans-serif;
  font-weight: 350;
  font-size: 13px;
  position: relative;
  letter-spacing: 0.3px;
  text-transform: none;
  margin-right: 5px;
  padding: 0;
}

.nav-btn .v-btn__content {
  position: relative;
  padding-bottom: 2px;
}

.nav-btn .v-btn__content::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.5px;
  width: 0;
  background: linear-gradient(90deg, #6228d7, #ee2a7b, #f9ce34);
  transition: width 0.3s ease-in-out;
}

.nav-btn:hover .v-btn__content::after {
  width: 100%;
}

.search-field {
  font-family: "Roboto", sans-serif;
  font-weight: 350;
  font-size: 10px;
  letter-spacing: 0.3px;
  text-transform: none;
}

.search-field .v-input__control {
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  letter-spacing: inherit;
}

.v-text-field input {
  font-size: 12px;
}

.v-input .v-label {
  font-size: 12px;
}

.v-toolbar__content {
  background-color: black;
}

.v-app-bar-title {
  font-family: "instagram", sans-serif;
  letter-spacing: 1.5px;
  font-size: 25px;
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
