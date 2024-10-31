<template>
  <v-text-field
    append-inner-icon="mdi-comment"
    label="Komentiraj"
    variant="underlined"
    v-model="comment"
    @keyup.enter="postComment()"
  ></v-text-field>

  <p v-show="fetchPostComment.length === 0">No comments</p>
  <CommentItem
    v-for="comment in fetchPostComment"
    :key="comment"
    :commentDetails="comment"
  />
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
      console.log("Posting comment");

      let selectedPost = store.posts.find((post) => {
        return post.id === store.selectedPost;
      });
      console.log(selectedPost.comments);
      selectedPost.comments.push({
        content: this.comment,
        postedBy: auth.getUser().username,
      });

      this.comment = null;
      blur();
    },
  },

  computed: {
    fetchPostComment() {
      console.log("Fetching selected post comments");
      let selectedPost = store.posts.find((post) => {
        return post.id === store.selectedPost;
      });
      console.log(selectedPost.comments);
      return selectedPost.comments;
    },
  },
};
</script>

<style scoped></style>
