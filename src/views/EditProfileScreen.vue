<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="d-flex" style="min-height: 100vh; padding-top: 50vh; transform: translateY(-50%)">
      <v-col cols="8" sm="6" md="4">
        <v-sheet class="mx-auto" max-width="300">
          <v-form>
            <v-avatar size="150">
              <v-img alt="John" :src="profileImage"></v-img>
            </v-avatar>
            <v-text-field v-model="nickname" label="Nickname" type="text"></v-text-field>
            <v-file-input v-model="file" label="Profile image" accept="image/*" @change="handleFileInput"></v-file-input>
            <v-row justify="center">
              <DialogButton buttonTitle="Save changes" buttonCancel="no" buttonConfirm="yes" dialog-title="Save changes" dialog-message="Save this changes?" :nextAction="() => saveChanges()" />
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DialogButton from "@/components/DialogButton.vue";
import { auth } from "@/data/InternalStorage.js";
import Services from "@/services/Services.js";
export default {
  name: "EditProfileScreen",
  components: {
    DialogButton,
  },

  data() {
    let userData = auth.getUser();
    return { nickname: userData.nickname, profileImage: userData.profileImage, file: null };
  },

  methods: {
    async saveChanges() {
      console.log("METHOD: saveChanges");

      const imageUrl = await Services.uploadImageToCloudinary(this.file);
      if (imageUrl != null) {
        const response = await Services.editProfile(this.nickname, imageUrl);
        if (response) {
          return this.$router.push({ path: "/" });
        }
      }
    },

    handleFileInput(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = URL.createObjectURL(file);
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
