<template>
  <v-card class="mx-auto" max-width="600">
    <div class="card" @click="detailsScreen(postDetails.id)">
      <v-img
        class="align-end text-white"
        height="200"
        :src="`${postDetails.imageUrl}`"
        cover
      >
      </v-img>
    </div>
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
            <div class="justify-self-end" @click="deletePost(postDetails.id)">
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
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
import { auth, store } from "@/data/InternalStorage";

export default {
  props: ["postDetails"],
  data(props) {
    return { props, auth };
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

    deletePost(postId) {
      console.log("Deleting post: " + postId);
      store.posts = store.posts.filter((post) => {
        return post.id !== postId;
      });
    },

    detailsScreen(postId) {
      console.log("Navigate details screen: " + postId);
      this.$router.replace({ path: "/postDetails/" });
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
