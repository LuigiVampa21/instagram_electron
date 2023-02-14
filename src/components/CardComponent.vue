<script setup>
import { defineProps } from "vue";
import config from "../../config"

const props = defineProps(["post"]);

const {base_photo_url} = config;
</script>

<template>
  <a-card hoverable style="width: 240px" class="card">
    <template #cover>
      <img :alt="props.post.caption" :src="base_photo_url + props.post.url" />
    </template>
    <a-card-meta :title="props.post.username">
      <template #description>{{ props.post.caption }}</template>
    </a-card-meta>
  </a-card>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
