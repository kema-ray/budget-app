<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" v-model="email" type="email" required class="form-input" :disabled="loading" />
        </div>

        <div class="mb-6 relative">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
                <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
                    class="form-input pr-12 w-full border rounded-lg focus:ring-primary focus:border-primary transition-all"
                    :disabled="loading" />
                <button type="button" @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-3 flex items-center px-2 text-gray-500 hover:text-primary transition-all">
                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" class="h-5 w-5 text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="h-5 w-5 text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center">
                <input id="remember" type="checkbox" v-model="remember" class="h-4 w-4 text-primary" />
                <label for="remember" class="ml-2 text-sm text-gray-700">Remember Me</label>
            </div>
            <NuxtLink to="#" class="text-sm text-primary hover:underline">Forgot Password</NuxtLink>
        </div>

        <UiAppButton type="submit" :loading="authStore.loading" class="w-full">Login</UiAppButton>

        <div class="mt-4 text-center text-sm">
            <span class="text-gray-600">Don't have an account?</span>
            <NuxtLink to="/register" class="text-primary ml-1 hover:underline">Register</NuxtLink>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth' // Import the auth store
import { baseURL } from '~/api/services'

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false) // ✅ Declare loading ref
const router = useRouter()

const authStore = useAuthStore() // Initialize the store

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
    loading.value = true;
    try {
        const payload = { email: email.value, password: password.value };
        console.log('Login payload:', payload);

        const base_url = baseURL();
        const response = await $fetch(`${base_url}/auth/login`, {
            method: 'POST',
            body: payload
        });

        console.log('Full API Response:', response);

        // Extract user data from "data"
        const user = response.data;  
        if (!user) {
            throw new Error('User data is missing in response!');
        }

        authStore.setUserDetails(user);  // Pass correct user object
        router.push('/');
        console.log('Login Successful:', user);
    } catch (error) {
        console.error('Login error:', error);
    } finally {
        loading.value = false;
    }
};

</script>


