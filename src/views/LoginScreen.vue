<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2"> col1</v-sheet>
      </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="mx-auto" max-width="300">
          <v-form>
            <v-text-field v-model="username" label="Username" type="text"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            <v-row justify="center">
              <v-btn class="mt-2" text="Login" color="grey-darken-2" @click="login()"> Login </v-btn>
            </v-row>

            <v-row justify="center">
              <v-btn class="mt-2" text="Register" color="grey-darken-2" @click="register()"> Register </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">col3 </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from "@/data/InternalStorage";
export default {
  name: "LoginScreen",

  data() {
    console.log(auth);
    return { username: null, password: null };
  },

  methods: {
    login() {
      auth.logInUser(this.username, this.password);
      this.$router.push({ path: "/" });
      return;
    },
    register() {
      this.$router.push({ path: "/register" });
      return;
    },
  },
};
</script>

<style scoped>
.v-sheet {
  background-color: transparent;
}
</style>
