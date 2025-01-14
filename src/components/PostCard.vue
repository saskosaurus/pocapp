<template>
  <v-card class="mx-auto instagram-card" max-width="600" elevation="2">
    <!-- Avatar Section -->
    <div class="post-header">
      <v-avatar size="35" color="grey-darken-3">
        <v-img class="align-end text-white" :src="`${postDetails.avatarImgUrl}`" cover />
      </v-avatar>
      <v-list-item-title class="post-username">{{ postDetails.postedBy }} • </v-list-item-title>
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
          </div>
        </template>
        <template v-slot:append>
          <div v-if="showDeletePost()" class="delete-section" @click="deletePost(postDetails.id)">
            <v-icon class="me-1" icon="mdi-delete-outline"></v-icon>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
    <v-list-item class="w-100">
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

export default {
  props: ["postDetails"],
  data() {
    return {
      auth,
    };
  },

  methods: {
    formatTime(time) {
      return moment(time.postedAt).format("MMM Do YYYY");
    },

    likePost(postId) {
      console.log("Like post: " + postId);
      for (let i = 0; i < store.posts.length; i++) {
        if (postId === store.posts[i].id) {
          const post = store.posts[i];
          post.isLiked = !post.isLiked;
          post.likes = post.isLiked ? post.likes + 1 : post.likes - 1;
          break;
        }
      }
    },

    deletePost(postId) {
      console.log("Deleting post: " + postId);
      store.posts = store.posts.filter((post) => post.id !== postId);
    },

    showDeletePost() {
      return auth.getUser().username === this.postDetails.postedBy;
    },

    detailsScreen(postId) {
      console.log("Navigate details screen: " + postId);
      store.selectedPost = postId;
      this.$router.replace({ path: "/postDetails" });
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
  background-color: transparent;
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
  border-top: 0.01em solid rgb(215, 205, 205);
  border-bottom: 0.01em solid rgb(215, 205, 205);
}

.image-container {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: transparent !important;
}

.v-card-actions {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
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
