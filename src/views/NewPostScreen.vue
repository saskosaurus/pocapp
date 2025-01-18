<template>
  <v-container>
    <v-row no-gutters>
      <v-col> </v-col>
      <v-col cols="8">
        <v-sheet class="mx-auto" max-width="300">
          <v-form class="input-form">
            <v-text-field v-model="title" label="Title" type="text"></v-text-field>
            <v-text-field v-model="description" label="Description" type="text"></v-text-field>
            <v-file-input v-model="file" label="Image" accept="image/*" @change="handleFileInput"></v-file-input>
            <v-row class="image-preview" v-if="imageUrl" justify="center">
              <img :src="imageUrl" alt="Preview" style="max-width: 300px" />
            </v-row>
            <v-row justify="center">
              <DialogButton buttonTitle="post" buttonCancel="no" buttonConfirm="yes" dialog-title="New post" dialog-message="Publish new post?" :nextAction="() => post()" />
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { store, auth } from "@/data/InternalStorage.js";
import DialogButton from "@/components/DialogButton.vue";

export default {
  components: {
    DialogButton,
  },

  data() {
    return {
      title: null,
      description: null,
      imageUrl: null,
      file: null,
      store,
      auth,
    };
  },

  methods: {
    post() {
      console.log("METHOD: post");

      if (this.imageUrl === null) {
        alert("Image missing");
        return;
      }

      let newPost = {
        id: Math.floor(Math.random() * 100),
        postedBy: auth.getUser(),
        title: this.title,
        description: this.description,
        localImageUrl: this.imageUrl,
        likes: 0,
        postedAt: Date.now(),
        avatarImgUrl: auth.getUser().avatarImgUrl,
        comments: [],
      };

      store.posts.push(newPost);
      return this.$router.push({ path: "/" });
    },

    handleFileInput(event) {
      console.log("METHOD: handleFileInput");
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = URL.createObjectURL(file);
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
<style scoped>
.image-preview {
  margin-top: 5px;
  margin-bottom: 5px;
}

.input-form {
  margin-top: 10px;
}
</style>
