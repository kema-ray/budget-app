<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 mb-1" >Full name</label>
      <input
        id="name"
        v-model="name"
        type="text"
        required
        class="form-input"
        :disabled="loading"
      />
    </div>
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        class="form-input"
        :disabled="loading"
      />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
        class="form-input"
        :disabled="loading"
      />
    </div>
    <div class="mb-6">
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
      <input
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        required
        class="form-input"
        :disabled="loading"
      />
    </div>
    <UiAppButton type="submit" :loading="loading" class="w-full">Register</UiAppButton>
    <div class="mt-4 text-center text-sm">
      <span class="text-gray-600">Already have an account?</span>
      <NuxtLink to="/login" class="text-primary ml-1 hover:underline">Login</NuxtLink>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const handleSubmit = () => {
  console.log('Registering...')
}
</script>
