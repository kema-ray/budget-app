<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
        <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <div class="text-center mb-8">
                <img src="~/assets/images/logo.svg" alt="Logo" class="h-12 mx-auto" />
                <h2 class="mt-4 text-3xl font-extrabold text-gray-900">
                    <slot name="title">Welcome</slot>
                </h2>
            </div>
            <slot />
        </div>
    </div>
</template>