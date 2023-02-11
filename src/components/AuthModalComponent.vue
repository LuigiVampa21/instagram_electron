<script setup>
import { ref, defineProps, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";

const props = defineProps(['isLogin'])
const userStore = useUserStore();

const { errorMessage, loading, loadingUser, user } = storeToRefs(userStore);

console.log(loadingUser.value);

const title = props.isLogin ? "Login" : "Signup";
const visible = ref(false);
const userCredentials = reactive({
    username: "",
    email: "",
    password: "",
})

const showModal = async () => {
    visible.value = true;
    await userStore.getUser();
};


const handleOk = async () => {
    if (props.isLogin) {
        await userStore.handleLogin({
            email: userCredentials.email,
            password: userCredentials.password,
        })
    } else {
        await userStore.handleRegister(userCredentials)
    }
    if (user.value) {
        visible.value = false;
        clearCredentials();
    }
}

const handleCancel = () => {
    visible.value = false;
    clearCredentials
}

const clearCredentials = () => {
    userCredentials.email = "";
    userCredentials.username = "";
    userCredentials.password = "";
    userStore.clearErrorMessage();
};




</script>

<template>
    <div>
        <a-button type="primary" @click="showModal" class="btn">{{ title }}</a-button>
        <a-modal v-model:visible="visible" :title="title" @click="handleOk">
            <template #footer>
                <a-button key="back" @click="handleCancel">Cancel</a-button>
                <a-button key="submit" type="primary" :disabled="loading" :loading="loading"
                    @click="handleOk">Submit</a-button>
            </template>
            <div v-if="!loading" class="input-container">
                <a-input class="input" v-if="!isLogin" v-model:value="userCredentials.username"
                    placeholder="Username"></a-input>
                <a-input class="input" v-model:value="userCredentials.email" placeholder="Email"></a-input>
                <a-input class="input" v-model:value="userCredentials.password" placeholder="Password"
                    type="password"></a-input>
                <a-typography-text v-if="errorMessage" type="danger">{{ errorMessage }}</a-typography-text>
            </div>
            <div v-else class="spinner">
                <a-spin></a-spin>
            </div>
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
