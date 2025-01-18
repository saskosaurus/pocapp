<template>
  <div class="comment-input">
    <v-text-field append-icon="mdi-send" label="Add a comment..." variant="underlined" v-model="comment" @keyup.enter="postComment" @click:append="postComment" dense hide-details></v-text-field>
  </div>
  <div class="comment-section">
    <p v-if="fetchPostComment.length === 0" class="no-comments">No comments yet.</p>
    <CommentItem v-for="comment in fetchPostComment" :key="comment.id" :commentDetails="comment" />
  </div>
</template>

<script>
import { store, auth } from "@/data/InternalStorage.js";
import CommentItem from "./CommentItem.vue";
export default {
  components: {
    CommentItem,
  },

  data() {
    return { comment: null };
  },

  methods: {
    postComment() {
      console.log("METHOD: postComment");

      if (this.comment === null) {
        return;
      }

      let selectedPost = store.posts.find((post) => {
        return post.id === store.selectedPost;
      });

      selectedPost.comments.unshift({
        content: this.comment,
        postedBy: auth.getUser(),
      });

      this.comment = null;
      blur();
    },
  },

  computed: {
    fetchPostComment() {
      console.log("METHOD: fetchPostComment");

      let selectedPost = store.posts.find((post) => {
        return post.id === store.selectedPost;
      });
      return selectedPost.comments;
    },
  },
};
</script>

<style scoped>
.comment-input {
  padding: 12px 16px 8px 16px;
  border-top: 1px solid #eee;
  background-color: #fafafa;
}
.comment-section {
  background-color: #fafafa;
  padding: 8px 16px;
}
.no-comments {
  font-size: 0.9rem;
  color: #888;
  margin: 0;
}
</style>
