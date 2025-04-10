<template>
  <div class="comment-item">
    <v-avatar size="25" class="mr-3">
      <v-img :src="commentDetails.commentData.postedBy.profileImage" cover />
    </v-avatar>
    <div class="comment-content">
      <span class="username">{{ commentDetails.commentData.postedBy.nickname }}</span>
      <span class="content">{{ commentDetails.commentData.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["commentDetails"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.comment-item {
  display: flex;
  align-items: center;
  padding: 0;
}

.comment-content {
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 5px;
}

.username {
  font-weight: bold;
  font-size: 12px;
  color: #333;
}

.content {
  color: #555;
  word-wrap: break-word;
  font-size: 12px;
}

.v-avatar {
  background-color: transparent;
}

.align-center {
  display: flex;
  align-items: center;
}
</style>
