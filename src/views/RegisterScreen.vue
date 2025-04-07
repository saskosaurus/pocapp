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
            <v-text-field v-model="nickname" label="Nickname" type="text"></v-text-field>
            <v-text-field v-model="email" label="Email" type="text"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            <v-row justify="center">
              <v-btn class="mt-2" text="Register" color="grey-darken-3" @click.prevent="register()"> Register </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Services from "@/services/Services.js";
import { SignUpRequest } from "@/models/SignUpRequest";
export default {
  name: "LoginScreen",

  data() {
    return { nickname: "", email: "", password: "" };
  },

  methods: {
    async register() {
      console.log("METHOD: register");

      let response = await Services.signUp(new SignUpRequest(this.email, this.password, this.nickname));
      if (response) {
        this.$router.push({ path: "/" });
        return;
      } else {
        alert("Register failed!");
      }
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
