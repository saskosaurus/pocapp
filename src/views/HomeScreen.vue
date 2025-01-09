<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <p v-for="post in fetchPosts" :key="post.id">{{ post.id }}</p>
          {{ store.searchInput }}
        </v-sheet>
      </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="pa-2 ma-3">
          <post-card v-for="post in fetchPosts" :key="post.id" :postDetails="post" />
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2"> </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import { auth, store } from "@/data/InternalStorage.js";

export default {
  name: "HomeScreen",
  components: { PostCard },

  data() {
    return { auth, store };
  },

  computed: {
    fetchPosts() {
      console.log(
        store.posts.sort((a, b) => {
          return b.postedAt - a.postedAt;
        })
      );
      return store.posts.sort((a, b) => {
        return b.postedAt - a.postedAt;
      });
    },
  },

  methods: {},
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
