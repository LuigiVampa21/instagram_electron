<script setup>
import { defineProps } from "vue";

const props = defineProps(["post"]);
</script>

<template>
  <a-card hoverable style="width: 240px" class="card">
    <template #cover>
      <img :alt="props.post.caption" :src="props.post.url" />
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
