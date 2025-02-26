<template>
    <div class="min-h-screen bg-gray-100">
        <AppHeader />
        <main class="container mx-auto py-6 px-4">
            <slot />
        </main>
        <footer class="bg-white py-4 borrder-t">
            <div class="container mx-auto text-center text-gray-500">
                &copy; {{ new Date().getFullYear() }} Budget App
            </div>
        </footer>
    </div>
</template>