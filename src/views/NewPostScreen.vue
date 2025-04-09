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
            <v-row class="image-preview" v-if="previewUrl" justify="center">
              <img :src="previewUrl" alt="Preview" style="max-width: 300px" />
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
import { NewPostRequest } from "@/models/NewPostRequest.js";
import Services from "@/services/Services.js";

export default {
  components: {
    DialogButton,
  },

  data() {
    return {
      title: null,
      description: null,
      imageUrl: null,
      previewUrl: null,
      file: null,
      store,
      auth,
    };
  },

  methods: {
    async post() {
      console.log("ENTERED METHOD: post");

      this.imageUrl = await Services.uploadImageToCloudinary(this.file);
      const newPostRequest = new NewPostRequest(auth.getUser().toJSON(), this.title, this.description, this.imageUrl);
      await Services.newPost(newPostRequest);

      store.posts.push(newPostRequest);
      return this.$router.push({ path: "/" });
    },

    handleFileInput(event) {
      console.log("ENTERED METHOD: handleFileInput");
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = URL.createObjectURL(file);
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
