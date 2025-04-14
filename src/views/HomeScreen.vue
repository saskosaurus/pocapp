<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="d-flex">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-sheet class="pa-2 ma-3">
          <transition-group name="post" tag="div">
            <post-card v-for="post in sortedPosts" :key="post.id" :postDetails="post" />
          </transition-group>
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
    return {
      auth,
      store,
      hasMorePosts: false,
      loadingPosts: false,
      lastDoc: null,
    };
  },

  computed: {
    sortedPosts() {
      return [...this.store.posts].sort((a, b) => b.postedAt - a.postedAt);
    },
  },

  async mounted() {
    document.addEventListener("scroll", this.handleScroll);
    const response = await Services.fetchPosts();
    if (response.hasMore) {
      this.lastDoc = response.lastDoc;
      this.hasMorePosts = true;
    } else {
      this.hasMorePosts = false;
    }
  },
  beforeUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    async handleScroll() {
      const scrollY = window.scrollY;
      const visible = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Enter condition almost at the end of the page
      if (scrollY + visible >= pageHeight - 100) {
        if (this.hasMorePosts && !this.loadingPosts) {
          this.loadingPosts = true;
          const response = await Services.fetchMorePosts(this.lastDoc);
          if (response && !response.hasMore) {
            this.hasMorePosts = false;
          }
          this.lastDoc = response.lastDoc;
          this.loadingPosts = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.post-enter-active,
.post-leave-active {
  transition: all 0.5s ease;
}
.post-enter-from,
.post-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
