<template>
    <a
        type="button"
        class="
          inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm

          dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700

          disabled:pointer-events-none disabled:opacity-50

          focus:bg-gray-50 focus:outline-none

          hover:bg-gray-50
        "
        :href="href"
        target="_blank"
    >
        <slot />
    </a>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';

    defineProps({
        href: {
            type: String,
            required: true
        },
    });
</script>
