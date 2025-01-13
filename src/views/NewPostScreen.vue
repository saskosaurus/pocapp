<template>
  <v-container>
    <v-row no-gutters>
      <v-col> </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="mx-auto" max-width="500">
          <v-form>
            <v-text-field v-model="title" label="Title" type="text"></v-text-field>
            <v-text-field v-model="description" label="Description" type="text"></v-text-field>
            <v-file-input v-model="file" label="Image" accept="image/*" @change="handleFileInput"></v-file-input>
            <v-row justify="center">
              <v-btn class="mt-2" text="Post" color="grey-darken-2" @click="post()"> Post </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col>  
        
        <div v-if="imageUrl">
      <h3>Image Preview:</h3>
      {{ imageUrl }}
      <img :src="imageUrl" alt="Preview" style="max-width: 300px;" />
    </div>
  
  </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { store, auth } from "@/data/InternalStorage.js";

export default {
  data() {
    return {
      title: null,
      description: null,
      imageUrl: null,
      file : null,
      store,
      auth,
    };
  },

  methods: {
    async post() {
      console.log("Creating post");

      const imageBlob = sessionStorage.getItem('imageBlob'); // Base64 URL from sessionStorage
      console.log("ovo mi je imageBlob :" + imageBlob);

      let newPost = {
        id: Math.floor(Math.random() * 100),
        postedBy: auth.getUser().username,
        description: this.description,
        imageUrl: "https://picsum.photos/520/600",
        localImageUrl: imageBlob,
        likes: 0,
        postedAt: Date.now(),
        avatarImgUrl: auth.getUser().avatarImgUrl,
        comments: [],
      };

      //await this.uploadImage();

      store.posts.push(newPost);
      return this.$router.push({ path: "/" });
    },


    handleFileInput(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageBlob = e.target.result; // Base64 or binary data
          sessionStorage.removeItem('imageBlob');
          sessionStorage.setItem('imageBlob', imageBlob); // Store in sessionStorage
          this.imageUrl = URL.createObjectURL(file); // Create temporary URL for display
        };
        reader.readAsDataURL(file); // Read file as Base64 data URL
      }
    }

    /*
    upload() {
      // the file object is not empty
      console.log(this.file);
      
      // post file to server
      const formData = new FormData();
      formData.append('file', this.file);

      const options = {
        method: 'POST',
        body: formData,
      };

      this.imageData = options;

      
    },

    async uploadImage(){
      await fetch('https://httpbin.org/post',  this.imageData).then(response => {response.json()
        console.log("ovo mi je response " + response)
        console.log(response)

      })
      .then(data => { console.log(data)
        console.log("ovo iznad mi je data")

      });
      return;
    }
      */
  },

  computed: {},
};
</script>
<style></style>
