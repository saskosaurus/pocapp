<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="300" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-if="buttonTitle" class="dialog-button" v-bind="activatorProps"> {{ buttonTitle }} </v-btn>
        <v-icon v-if="iconName" class="me-1" :icon="`${iconName}`" v-bind="activatorProps"></v-icon>
      </template>

      <v-card :text="`${dialogMessage}`" :title="`${dialogTitle}`">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn class="dialog-button" @click="nextAction"> {{ buttonConfirm }} </v-btn>
          <v-btn class="dialog-button" @click="dialog = false"> {{ buttonCancel }} </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["buttonTitle", "dialogTitle", "dialogMessage", "buttonConfirm", "buttonCancel", "nextAction", "iconName"],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped>
.dialog-button {
  background-color: rgb(111, 104, 104);
}
</style>
