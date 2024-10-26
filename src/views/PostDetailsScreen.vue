<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2"> col1</v-sheet>
      </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="pa-2 ma-3">
          <PostCardDetails />
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
export default {
  name: "PostDetailsScreen",

  components: { PostCardDetails },

  data: () => ({
    textt: "text123",
  }),
};
</script>

<style scoped></style>
