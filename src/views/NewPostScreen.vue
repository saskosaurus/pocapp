<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2"> col1</v-sheet>
      </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="mx-auto" max-width="500">
          <v-form>
            <v-text-field
              v-model="title"
              label="Title"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="description"
              label="Description"
              type="text"
            ></v-text-field>
            <v-file-input
              label="Image"
              prepend-icon="mdi-camera"
              variant="filled"
            ></v-file-input>
            <v-row justify="center">
              <v-btn
                class="mt-2"
                text="Post"
                color="grey-darken-2"
                @click="this.post(computedTime)"
              >
                Post
              </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2"> </v-sheet>
      </v-col>
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
    async post(computedTime) {
      console.log("Creating post");

      let newPost = {
        id: Math.floor(Math.random() * 100),
        postedBy: auth.getUser().username,
        description: this.description,
        imageUrl: "https://picsum.photos/520/600",
        likes: 0,
        postedAt: computedTime,
        avatarImgUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      };

      store.posts.push(newPost);
      return this.$router.push({ path: "/" });
    },
  },

  computed: {
    // a computed getter
    computedTime: function () {
      return Date.now();
    },
  },
};
</script>
<style></style>
