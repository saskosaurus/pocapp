<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="d-flex" style="min-height: 100vh; padding-top: 50vh; transform: translateY(-50%)">
      <v-col cols="8" sm="6" md="4">
        <v-sheet class="mx-auto" max-width="300">
          <div class="main-image">
            <img alt="Vue logo" :src="require('@/assets/logo.png')" />
          </div>
          <div class="main-title">poc gram</div>

          <v-form>
            <v-text-field v-model="username" label="Username" type="text"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            <v-row justify="center">
              <v-btn class="mt-2" text="Login" color="grey-darken-3" @click="login()"> Login </v-btn>
              <v-btn class="mt-2" text="Register" color="grey-darken-1" @click="register()" style="margin-left: 1em"> Register </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from "@/data/InternalStorage";
export default {
  name: "LoginScreen",

  data() {
    return { username: null, password: null };
  },

  methods: {
    login() {
      console.log("METHOD: login");
      auth.logInUser(this.username, this.password);
      this.$router.push({ path: "/" });
      return;
    },
    register() {
      console.log("METHOD: register");
      this.$router.push({ path: "/register" });
      return;
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "instagram";
  src: url(../assets/instagram.otf.otf);
}

.main-image {
  text-align: center;
  margin-top: 10em;
}

.main-title {
  font-family: "instagram", sans-serif;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
