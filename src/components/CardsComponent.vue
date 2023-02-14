<script setup>
import { onMounted, ref } from "vue";
import Card from "./CardComponent.vue";
import Observer from "./ObserverComponent.vue";
import {supabase} from "../supabase/supabase";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const userStore= useUserStore();

const {user} = storeToRefs(userStore);
const posts = ref([]);
const owner_id = ref([]);
const lastCardIndex = ref(2);
const reachEnd = ref(false);

const fetchData = async() =>{
    const {data: followings} = await supabase
        .from("followers_following")
        .select("following_id")
        .eq("follower_id", user.value.id)

    owner_id.value = followings.map(f => f.following_id)

    const {data} = await supabase
        .from("posts")
        .select()
        .in("owner_id", owner_id.value)
        .range(0,lastCardIndex.value)
        .order("created_at", {ascending: true})

    posts.value = data;
}

onMounted(async() => {
    await fetchData();
})

const fetchNextSet = async() => {
    if(!reachEnd.value){
        const {data} = await supabase
        .from("posts")
        .select()
        .in("owner_id", owner_id.value)
        .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
        .order("created_at", {ascending: true})
        if(!data.length) reachEnd.value = true;
        
        posts.value = [...posts.value, ...data];

        lastCardIndex.value = lastCardIndex.value + 3;
    }
};

</script>

<template>
        <div v-if="user" class="timeline-container">
            <Card v-for="post in posts" :key="post.id" :post="post" />
            <Observer v-if="posts.length" @intersect="fetchNextSet"/>
        </div>
</template>

<style scoped>

.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

</style>