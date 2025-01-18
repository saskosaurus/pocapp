<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="d-flex">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-sheet class="pa-2 ma-3">
          <PostCardDetails :postDetails="fetchSelectedPost" />
        </v-sheet>
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
      console.log("METHOD: fetchSelectedPost");
      let selectedPost = store.posts.find((post) => {
        return post.id === store.selectedPost;
      });
      return selectedPost;
    },
  },
};
</script>

<style scoped></style>
