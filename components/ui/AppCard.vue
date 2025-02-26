<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div v-if="$slots.header" class="border-b border-gray-200 px-4 py-3">
            <slot name="header" />
        </div>
        <div>
            <slot />
        </div>
        <div v-if="$slots.footer" class="border-t border-gray-200 px-4 py-3">
            <slot name="footer" />
        </div>
    </div>
</template>