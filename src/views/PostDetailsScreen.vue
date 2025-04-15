<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="d-flex">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-sheet class="pa-2 ma-3">
          <PostCardDetails v-if="selectedPost" :postDetails="selectedPost" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCardDetails from "@/components/PostCardDetails.vue";
import Services from "@/services/Services";
export default {
  name: "PostDetailsScreen",

  components: { PostCardDetails },

  data() {
    return { selectedPost: null };
  },

  async mounted() {
    console.log("METHOD: fetchSelectedPost");
    this.selectedPost = await Services.fetchSelectedPost();
  },
};
</script>

<style scoped></style>
