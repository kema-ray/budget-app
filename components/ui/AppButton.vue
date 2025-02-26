<template>
    <button :type="type" :class="[
        'btn',
        `btn-${variant}`,
        { 'opacity-50 cursor-not-allowed': loading }
    ]" :disabled="loading || disabled" @click="$emit('click', $event)">
        <div v-if="loading"
            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        <slot v-else />
    </button>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'button'
    },
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'danger', 'warning', 'info'].includes(value)
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

defineEmits(['click'])
</script>