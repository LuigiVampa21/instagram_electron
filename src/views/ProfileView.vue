<script setup>
import Profile from "@/components/ProfileComponent.vue";
</script>
<template>
  <Profile :key="$route.params.username" />
</template>

<style scoped></style>
