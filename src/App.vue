<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-app-bar-title>Instagram</v-app-bar-title>

        <v-card v-if="store.isLoggedIn" class="mx-auto" color="transparent" max-width="400" width="400" variant="flat">
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

        <v-btn class="nav-btn" v-if="store.isLoggedIn" @click="home()">HOME</v-btn>
        <v-btn class="nav-btn" v-if="store.isLoggedIn" @click="newPost()">NEW POST</v-btn>
        <v-btn class="nav-btn" v-if="!store.isLoggedIn" @click="login()">LOGIN</v-btn>
        <v-btn class="nav-btn" v-if="!store.isLoggedIn" @click="register()" style="margin-right: 15px">REGISTER</v-btn>
        <v-btn class="nav-btn" v-if="store.isLoggedIn" @click="logout()">LOGOUT</v-btn>
        <v-avatar size="30" v-if="store.isLoggedIn" style="margin-right: 15px">
          <v-img alt="John" :src="`${auth.getUser().avatarImgUrl}`"></v-img>
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
  background: linear-gradient(90deg, rgb(174, 0, 183), rgb(43, 163, 243));
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

.v-main {
  background-image: linear-gradient(180deg, rgb(255, 255, 255) 36%, rgb(39, 39, 39) 100%);
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
