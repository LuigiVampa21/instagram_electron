<script setup>
import Container from "./ContainerComponent.vue";
import Cards from "./CardsComponent.vue";
import Login from "./LogInComponent.vue";
import {useUserStore} from '../stores/userStore';
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const {user, loadingUser} = storeToRefs(userStore);

</script>

<template>
  <Container>
    <div v-if="!loadingUser">
    <Cards v-if="user" />
    <Login v-else/>
  </div>
  <div class="spinner" v-else>
      <a-spin></a-spin>
    </div>
  </Container>
</template>

