<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" v-model="email" type="email" required class="form-input" :disabled="loading" />
        </div>
        <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="password" v-model="password" type="password" required class="form-input" :disabled="loading" />
        </div>
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center">
                <input id="remember" type="checkbox" v-model="remember" class="h-4 w-4 text-primary"/>
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
import { useAuthStore } from '~/store/auth'

const email = ref('')
const password = ref('')
const remember = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
    try {
        // Use await to properly handle the promise
        await authStore.login(email.value, password.value, remember.value)
        router.push('/')
    } catch (error) {
        console.error('Login form error:', error)
    }
}
</script>