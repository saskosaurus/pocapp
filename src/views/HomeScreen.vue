<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2"> </v-sheet>
      </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="pa-2 ma-3">
          <post-card v-for="post in posts" :key="post.id" :postDetails="post" />
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2"> {{ auth.getUser() }} {{ store.inputSearch }} </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import { auth, store } from "@/data/InternalStorage.js";
import { posts } from "@/data/MockData.js";

// Components
export default {
  name: "HomeScreen",
  components: { PostCard },

  data() {
    return { auth, store, posts };
  },

  mounted() {
    this.fetchPosts;
  },

  methods: {
    async fetchPosts() {
      this.posts = await posts;
    },
    login() {
      console.log("login");
      //this.$router.push({ path: "/login" });
    },
    logout() {
      console.log("logout");
    },
  },
};
</script>

<style scoped>
.v-container {
  background-color: transparent;
}
.v-sheet {
  text-align: center;
  background-color: transparent;
}
.v-col {
  background-color: transparent;
}
</style>
