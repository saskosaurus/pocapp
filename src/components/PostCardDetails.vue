<template>
  <v-card class="mx-auto" max-width="600">
    <v-img
      class="align-end text-white"
      height="200"
      :src="`${postDetails.localImageUrl ? postDetails.localImageUrl : postDetails.imageUrl}`"
      cover
    >
    </v-img>
    <div id="cardFooter">
      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar color="grey-darken-3">
              <v-img
                class="align-end text-white"
                :src="`${postDetails.avatarImgUrl}`"
                cover
              >
              </v-img>
            </v-avatar>

            <v-list-item-title>{{ postDetails.postedBy }}</v-list-item-title>
          </template>

          <template v-slot:append>
            <div class="justify-self-end" @click="likePost(postDetails.id)">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">{{ postDetails.likes }}</span>
            </div>
            <div
              class="justify-self-end"
              v-if="showDeletePost()"
              @click="deletePost(postDetails.id)"
            >
              <v-icon class="me-1" icon="mdi-delete"></v-icon>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>

      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-card-text class="text--primary">
            <div class="justify-self-start">{{ postDetails.description }}</div>
          </v-card-text>
        </template>

        <template v-slot:append>
          <div class="justify-self-end">
            <v-card-subtitle class="pt-2">
              {{ formatTime(postDetails) }}
            </v-card-subtitle>
          </div>
        </template>
      </v-list-item>
      <v-divider color="white"></v-divider>
      <CommentSection />
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
import { auth, store } from "@/data/InternalStorage";
import CommentSection from "./CommentSection.vue";

export default {
  props: ["postDetails"],
  components: { CommentSection },
  data() {
    return { auth };
  },

  methods: {
    formatTime(time) {
      return moment(time.postedAt).startOf("hour").fromNow();
    },

    likePost(postId) {
      console.log("Like post: " + postId);
      for (let i = 0; i < store.posts.length; i++) {
        if (postId === store.posts[i].id) {
          store.posts[i].likes = store.posts[i].likes + 1;
        }
      }
    },

    showDeletePost() {
      return auth.getUser().username === this.postDetails.postedBy;
    },

    deletePost(postId) {
      console.log("Deleting post: " + postId);

      store.posts = store.posts.filter((post) => {
        return post.id !== postId;
      });
      this.$router.push({ path: "/" });
    },
  },

  computed: {},

  mounted() {
    return {};
  },
};
</script>

<style scoped>
#card {
}
.v-card-subtitle {
  text-align: right;
}
.v-card {
  margin-bottom: 2.5em;
}
.v-list-item-title {
  margin-left: 1em;
}
#cardFooter {
  background-color: rgb(71, 70, 70);
  color: white;
}
.v-field__input {
  overflow: hidden;
}
.v-card-text {
  text-align: left;
}
</style>
