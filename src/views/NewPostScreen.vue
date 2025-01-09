<template>
  <v-container>
    <v-row no-gutters>
      <v-col> </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="mx-auto" max-width="500">
          <v-form>
            <v-text-field v-model="title" label="Title" type="text"></v-text-field>
            <v-text-field v-model="description" label="Description" type="text"></v-text-field>
            <v-row justify="center">
              <v-btn class="mt-2" text="Post" color="grey-darken-2" @click="post()"> Post </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { store, auth } from "@/data/InternalStorage.js";

export default {
  data() {
    return {
      title: null,
      description: null,
      store,
      auth,
    };
  },

  methods: {
    async post() {
      console.log("Creating post");

      let newPost = {
        id: Math.floor(Math.random() * 100),
        postedBy: auth.getUser().username,
        description: this.description,
        imageUrl: "https://picsum.photos/520/600",
        likes: 0,
        postedAt: Date.now(),
        avatarImgUrl: auth.getUser().avatarImgUrl,
        comments: [],
      };

      store.posts.push(newPost);
      return this.$router.push({ path: "/" });
    },
  },

  computed: {},
};
</script>
<style></style>
