<script setup>
import { RouterView } from "vue-router";
import Nav from './components/NavComponent.vue';

import { onMounted } from "vue";
import { useUserStore } from "./stores/userStore";

const userStore = useUserStore();

onMounted( async() => {
  await userStore.getUser();
});

</script>

<template>
  <main>
    <Nav />
    <RouterView />
  </main>
</template>


<style scoped>

</style>
