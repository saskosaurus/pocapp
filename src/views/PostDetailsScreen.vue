<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2"> col1</v-sheet>
      </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="pa-2 ma-3">
          <PostCardDetails :postDetails="fetchSelectedPost" />
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">col3 </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCardDetails from "@/components/PostCardDetails.vue";
import { store } from "@/data/InternalStorage.js";
export default {
  name: "PostDetailsScreen",

  components: { PostCardDetails },

  data() {
    return {};
  },

  computed: {
    fetchSelectedPost() {
      console.log("Fetching selected post by ID: " + store.selectedPost);
      let selectedPost = store.posts.find((post) => {
        return post.id === store.selectedPost;
      });
      return selectedPost;
    },
  },
};
</script>

<style scoped></style>
