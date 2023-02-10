<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthModal from "./AuthModalComponent.vue";
import Container from "./ContainerComponent.vue";


const router = useRouter();

const isAuth = ref(false);

const searchUserName = ref("");
const onSearch = () => {
  if (!searchUserName.value) return;
  router.push(`/profile/${searchUserName.value}`);
  searchUserName.value = "";
};
</script>


<template>
  <a-layout-header>
    <Container>
      <div class="nav-container">
        <div class="right-content">
          <RouterLink to="/">Instagram</RouterLink>
          <a-input-search
            v-model:value="searchUserName"
            placeholder="Username.."
            style="width: 200px"
            @search="onSearch"
          />
        </div>
        <div class="content">
          <div class="left-content" v-if="!isAuth">
            <AuthModal :isLogin="true" />
            <AuthModal :isLogin="false" />
          </div>
          <div class="left-content" v-else>
            <a-button type="primary" @click="goToProfile">Profile</a-button>
            <a-button type="primary" @click="handleLogout">Log out</a-button>
          </div>
        </div>
      </div>
    </Container>
  </a-layout-header>
</template>


<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
}

.right-content {
  display: flex;
  align-items: center;
}

.right-content a {
  margin-right: 10px;
}

.left-content {
  display: flex;
  align-items: center;
}

.left-content button {
  margin-left: 10px;
}
.content {
  display: flex;
  align-items: center;
}
</style>