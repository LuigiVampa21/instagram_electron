<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(['isLogin'])

const visible = ref(false);


const showModal = () => {
    visible.value = true;
};


const handleOk = async () => {
    visible.value = false;
}

const title = props.isLogin ? "Login" : "Signup";


</script>

<template>
    <div>
        <a-button type="primary" @click="showModal" class="btn">{{ title }}</a-button>
        <a-modal v-model:visible="visible" :title="title" @click="handleOk">
            <a-input class="input" v-if="!isLogin" v-model:value="value" placeholder="Username"></a-input>
            <a-input class="input" v-model:value="value" placeholder="Email"></a-input>
            <a-input class="input" v-model:value="value" placeholder="Password"></a-input>
        </a-modal>
    </div>
</template>

<style scoped>
.btn {
    margin-left: 10px;
}

.input {
    margin-top: 5px;
}

.input-container {
    height: 120px;
}

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
}
</style>
