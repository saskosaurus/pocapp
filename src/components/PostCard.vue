<template>
  <v-card class="mx-auto instagram-card" max-width="600" elevation="2">
    <!-- Avatar Section -->
    <div class="post-header">
      <v-avatar size="35" color="grey-darken-3">
        <v-img class="align-end text-white" :src="`${postDetails.postedBy.profileImage}`" cover />
      </v-avatar>
      <v-list-item-title class="post-username">{{ postDetails.postedBy.nickname }} • </v-list-item-title>
      <v-list-item-title class="post-timestamp">{{ formatTime(postDetails) }}</v-list-item-title>
    </div>

    <!-- Image Section -->
    <div class="post-image" @click="detailsScreen(postDetails.id)">
      <v-img :src="postDetails.localImageUrl || postDetails.imageUrl" height="300px" class="image-container" />
    </div>

    <!-- Details Section -->
    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <div class="like-section" @click="likePost(postDetails.id)">
            <v-icon class="me-1" icon="mdi-heart-outline"></v-icon>
            <span v-if="postDetails.likes && postDetails.likes > 0" style="color: black">{{ postDetails.likes }}</span>
          </div>
          <div class="comment-section" @click="detailsScreen(postDetails.id)">
            <v-icon class="me-1" icon="mdi-comment-outline"></v-icon>
            <span v-if="postDetails.commentsCount > 0" style="color: black">{{ postDetails.commentsCount }}</span>
          </div>
        </template>
        <template v-slot:append>
          <div v-if="showDeletePost()" class="delete-section">
            <DialogButton iconName="mdi-delete-outline" :nextAction="() => deletePost(postDetails.id)" dialogMessage="Delete post?" dialogTitle="Delete" buttonCancel="no" buttonConfirm="yes" />
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
    <v-list-item class="w-100" v-if="postDetails.title && postDetails.description">
      <template v-slot:prepend>
        <v-card-text>
          <div class="title-section">{{ postDetails.title }}</div>
          <div class="description-section">{{ postDetails.description }}</div>
        </v-card-text>
      </template>
    </v-list-item>
  </v-card>
</template>
<script>
import moment from "moment";
import { auth, store } from "@/data/InternalStorage";
import DialogButton from "./DialogButton.vue";
import Services from "@/services/Services.js";

export default {
  props: ["postDetails"],
  components: { DialogButton },
  data() {
    return {
      auth,
    };
  },

  methods: {
    detailsScreen(postId) {
      console.log("METHOD: detailsScreen");
      store.setSelectedPostId(postId);
      this.$router.push({ path: "/postDetails" });
    },

    async likePost(postId) {
      console.log("METHOD: likePost", postId);

      const selectedPost = store.posts.find((post) => post.id === postId);
      if (!selectedPost) {
        console.warn("Post not found:", postId);
        return;
      }

      const result = await Services.likePost(postId);
      if (result) {
        selectedPost.likes = (selectedPost.likes || 0) + 1;
      }
    },

    async deletePost(postId) {
      console.log("METHOD: deletePost");

      let result = await Services.deletePost(postId);

      if (result) {
        store.posts = store.posts.filter((post) => post.id !== postId);
      }
    },

    formatTime(time) {
      return moment(time.postedAt).format("MMM Do YYYY");
    },

    showDeletePost() {
      return true;
      //return auth.getUser().id === this.postDetails.postedBy.id;
    },
  },
};
</script>
<style scoped>
.instagram-card {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  background-color: #fff;
  height: auto;
}

.post-header {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fafafa;
}

.post-username {
  margin-left: 10px;
  font-weight: bold;
  font-size: 12px;
}

.post-timestamp {
  margin-left: 10px;
  font-size: 12px;
  color: grey;
}

.post-image {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: transparent;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.image-container {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: transparent !important;
}

.v-card-actions {
  padding: 10px;
  padding-bottom: 0px;
  display: flex;
  justify-content: flex-start;
}

.v-card-text {
  padding: 0;
  padding-left: 10px;
  padding-bottom: 10px;
}

.like-section,
.delete-section,
.comment-section {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 0.5em;
}

.like-section .v-icon {
  color: transparent;
  background: linear-gradient(90deg, #6228d7, #ee2a7b, #f9ce34);
  background-clip: text;
}

.like-section:hover,
.comment-section:hover,
.delete-section:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}

.description-section {
  font-size: 12px;
  color: #333;
  display: flex;
  text-align: left;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-section {
  display: flex;
  font-size: 12px;
  color: #000000;
  font-weight: bold;
  text-align: left;
}

.v-icon {
  cursor: pointer;
}
</style>
