<script setup>
import { defineProps } from "vue";
import config from "../../config";
const props = defineProps(["posts"]);

const {base_photo_url} = config
</script>

<template>
  <div class="image-gallery-container">
    <img
      v-for="post in props.posts"
      :key="post.id"
      :src="base_photo_url + post.url"
    />
  </div>
</template>

<style scoped>
.image-gallery-container {
  display: flex;
  justify-self: left;
  flex-wrap: wrap;
}

img {
  margin: 5px;
  width: 200px;
}
</style>
