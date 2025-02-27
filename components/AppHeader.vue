<template>
    <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <NuxtLink to="/" class="flex items-center">
                    <span class="text-xl font-bold text-primary">Budget App</span>
                </NuxtLink>
                <nav class="hidden md:flex space-x-6">
                    <NuxtLink to="/" class="text-gray-700 hover:text-primary">Dashboard</NuxtLink>
                    <NuxtLink>Budgets</NuxtLink>
                    <NuxtLink>Expenses</NuxtLink>
                </nav>
                <div class="flex items-center">
                    <div class="relative" ref="profileDropdown">
                        <button @click="toggleDropdown"
                            class="flex items-center text-gray-700 hover:text-primary focus:outline-none">
                            <span class="mr-2">{{ userEmail || 'Loading...' }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <div v-if="isDropdownOpen"
                            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <!-- to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" -->
                            <!-- to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" -->
                            <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Profile
                            </NuxtLink>
                            <NuxtLink to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Settings
                            </NuxtLink>
                            <button @click="logout"
                                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Mobile Menu Button -->
                <button @click="toggleMobileMenu" class="md:hidden text-gray-700 hover:text-primary focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path v-if="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            <!-- Mobile Menu -->
            <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-2">
                <NuxtLink to="/" class="block py-2 text-gray-700 hover:text-primary">Dashboard</NuxtLink>
                <NuxtLink to="/budget" class="block py-2 text-gray-700 hover:text-primary">Budgets</NuxtLink>
                <NuxtLink to="/expenses" class="block py-2 text-gray-700 hover:text-primary">Expenses</NuxtLink>
            </div>

        </div>
    </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const isDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)
const profileDropdown = ref(null)

const { user, logout } = useAuth()
const userEmail = computed(() => user.value?.email || 'User') // Ensure reactivity

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleClickOutside = (event) => {
    if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
        isDropdownOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

</script>