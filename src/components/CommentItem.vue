<template>
  <v-text-field
    :label="`${commentDetails.postedBy}`"
    :model-value="`${commentDetails.content}`"
    variant="plain"
    readonly
  ></v-text-field>
</template>

<script>
export default {
  props: ["commentDetails"],
  data() {
    return {};
  },
};
</script>
