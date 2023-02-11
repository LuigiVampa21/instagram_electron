<script setup>
import Container from './ContainerComponent.vue';
import UserBar from './UserBarComponent.vue';
import ImageGallery from './ImageGalleryComponent.vue';

import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { supabase } from "../supabase/supabase";

const route = useRoute();

const posts = ref([]);
const loading = ref(false);
const userFromProfile = ref(null);
const { username } = route.params;

// const addNewPost = post => {
//   posts.value.unshift(post);
// };

const fetchData = async () => {
  loading.value = true;
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();


  if (!userData) {
    userFromProfile.value = null;
    loading.value = false;
    return;
  }
  userFromProfile.value = userData;

  const { data: postsData } = await supabase
    .from("posts")
    .select()
    .eq("owner_id", userFromProfile.value.id);

  if (!postsData) {
    posts.value = [];
    loading.value = false;
    return;
  }
  posts.value = postsData;
  loading.value = false;
  // await fetchIsFollowing();
  // const followerCount = await fetchFollowersCount();
  // const followingCount = await fetchFollowingCount();

  // userInfo.followers = followerCount;
  // userInfo.following = followingCount;
  // userInfo.posts = posts.value.length;
};

onMounted(async () => {
  await fetchData();
})

</script>

<template>
  <Container>
    <div class="profile-container">
      <UserBar :key="$route.params.username" :addNewPost="addNewPost" :userFromProfile="userFromProfile" :userInfo="{
        posts: 0,
        followers: 0,
        following: 0
      }" />
      <!-- <UserBar
        :key="$route.params.username"
        :userFromProfile="userFromProfile"
        :isFollowing="isFollowing"
        :userInfo="userInfo"
        :addNewPost="addNewPost"
        :updateIsFollowing="updateIsFollowing"
      /> -->
      <ImageGallery :posts="posts" />
    </div>
    <!-- <div class="spinner" v-else>
      <a-spin></a-spin>
    </div> -->
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}
</style>
