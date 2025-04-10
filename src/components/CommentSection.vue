<template>
  <div class="comment-input">
    <v-text-field append-icon="mdi-send" label="Add a comment..." variant="underlined" v-model="text" @keyup.enter="postComment" @click:append="postComment" dense hide-details></v-text-field>
  </div>
  <div class="comment-section">
    <p v-if="comments === null || comments.length === 0" class="no-comments">No comments yet.</p>
    <CommentItem v-for="comment in comments" :key="comment.id" :commentDetails="comment" />
  </div>
</template>

<script>
import { store } from "@/data/InternalStorage.js";
import CommentItem from "./CommentItem.vue";
import Services from "@/services/Services.js";
export default {
  components: {
    CommentItem,
  },

  data() {
    return { text: null, comments: null };
  },

  methods: {
    async postComment() {
      console.log("METHOD: postComment");

      if (this.text != null) {
        let selectedPost = store.posts.find((post) => {
          return post.id === store.selectedPost;
        });

        let result = await Services.postComment(selectedPost.id, this.text);
        if (result) {
          selectedPost.commentsCount += 1;
          this.comment = null;
          blur();
        }
      } else {
        return;
      }
    },
  },

  async mounted() {
    let selectedPost = store.posts.find((post) => {
      return post.id === store.selectedPost;
    });
    this.comments = await Services.fetchComments(selectedPost.id);
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
