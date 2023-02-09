<script setup>
import Container from './ContainerComponent.vue';
import UserBar from './UserBarComponent.vue';
import ImageGallery from './ImageGalleryComponent.vue';

</script>

<template>
  <Container>
    <div class="profile-container" >
      <UserBar 
      :username="'Macouille'"
      :userInfo="{
        posts: 0,
        followers: 0,
        following: 0
      }"
      />
      <!-- <UserBar
        :key="$route.params.username"
        :userFromProfile="userFromProfile"
        :isFollowing="isFollowing"
        :userInfo="userInfo"
        :addNewPost="addNewPost"
        :updateIsFollowing="updateIsFollowing"
      /> -->
      <!-- <ImageGallery :posts="posts" /> -->
      <ImageGallery :posts="[
                              {
                                id: 1,
                                image: 'https://thispersondoesnotexist.com/image',
                              
                              }
                            ]" />
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
