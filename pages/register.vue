<template>
    <AuthRegisterForm />
</template>

<script setup>
definePageMeta({
    layout: 'auth',
    middleware: 'guest'
})
</script>