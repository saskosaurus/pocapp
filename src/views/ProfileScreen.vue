<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2"> profile</v-sheet>
      </v-col>
      <v-col cols="8" style="border: 1px solid red">
        <v-sheet class="pa-2 ma-3">
          {{ userData }}

          <v-card class="mx-auto" max-width="400">
            <v-avatar size="200">
              <v-img alt="John" :src="`${avatarImgUrl}`"></v-img>
            </v-avatar>

            <v-card-subtitle class="pt-4"> {{ userData.username }}</v-card-subtitle>

            <v-card-text>
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text="Share"></v-btn>

              <v-btn color="orange" text="Explore"></v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">col3 </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { auth } from "@/data/InternalStorage.js";
export default {
  data() {
    return { userData: auth.getUser() };
  },

  setup() {
    return { avatarImgUrl: auth.getUser().avatarImgUrl };
  },
};
</script>

<style></style>
