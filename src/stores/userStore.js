import { ref } from "vue";
import { defineStore } from "pinia";
import {supabase} from "../supabase/supabase"
import validateEmail from "@/utils/validators/email";

export const useUserStore = defineStore("user", () => {
    const user = ref(null);
    const errorMessage = ref("");
    const loading = ref(false);

    const handleLogin = () => {}

    const handleRegister = async credentials => {
        const { email, password, username } = credentials;

        if (password.length < 6) {
          return (errorMessage.value = "Password is too short");
        }
        if (username.length < 4) {
          return (errorMessage.value = "Username is too short");
        }
        if (!validateEmail(email)) {
          return (errorMessage.value = "Email is not valid");
        }
        loading.value = true;
        errorMessage.value = "";

        const { data: usernameAlreadyTaken } = await supabase
          .from("users")
          .select()
          .eq("username", username)
          .single();
    
        if (usernameAlreadyTaken) {
          loading.value = false; 
          return (errorMessage.value = "Username already exists");
        }
    

        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          loading.value = false;
          return (errorMessage.value = error.message);
        }
    
        await supabase.from("users").insert({
          username,
          email,
        });
    
        // const { data: newUser } = await supabase
        //   .from("users")
        //   .select()
        //   .eq("email", email)
        //   .single();
    
        // user.value = {
        //   id: newUser.id,
        //   username: newUser.username,
        //   email: newUser.email,
        //   password: newUser,
        // };
    
        loading.value = false;
    }

    const handleLogout = () => {}

    const getUser = () => {}

    const clearErrorMessage = () => {
        errorMessage.value = "";
      };

    return {user, errorMessage, loading, handleLogin, handleRegister, handleLogout, getUser, clearErrorMessage}
})