<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="d-flex">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-sheet class="pa-2 ma-3">
          <post-card v-for="post in store.posts" :key="post.id" :postDetails="post" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import { auth, store } from "@/data/InternalStorage.js";
import Services from "@/services/Services.js";

export default {
  name: "HomeScreen",
  components: { PostCard },

  data() {
    return { auth, store };
  },

  async mounted() {
    await Services.fetchPosts();
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
