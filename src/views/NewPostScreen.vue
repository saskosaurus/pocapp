<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2"> col1</v-sheet>
      </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="mx-auto" max-width="500">
          <v-form>
            <v-text-field v-model="title" label="Title" type="text"></v-text-field>
            <v-text-field v-model="description" label="Description" type="text"></v-text-field>
            <v-file-input label="Image" prepend-icon="mdi-camera" variant="filled"></v-file-input>
            <v-row justify="center">
              <v-btn class="mt-2" text="Post" color="grey-darken-2" @click="post()"> Post </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2"> {{ posts }} </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { posts } from "@/data/MockData";
export default {
  data() {
    return { title: null, description: null, posts };
  },

  unmounted() {},
  methods: {
    post() {
      console.log("creating post");
      const currentPosts = this.posts;
      const newPost = {
        id: Math.floor(Math.random() * 100),
        postedBy: "user name1",
        description: "description1",
        imageUrl: "https://picsum.photos/550/550",
        likes: 10,
        postedAt: "3.4.2001",
        avatarImgUrl: "https://i.pravatar.cc/150?u=a04fssd2581ff4e2902",
      };
      const newPosts = [newPost].concat(currentPosts);
      this.posts = newPosts;

      for (let i = 0; i < newPosts.length; i++) {
        console.log("iz newPost: " + newPosts[i].id);
      }

      return this.$router.push({ path: "/" });
    },
  },
};
</script>
<style></style>
