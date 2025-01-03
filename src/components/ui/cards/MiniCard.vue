<template>
    <div
        class="
          group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition

          dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black
        "
    >
        <div class="flex gap-x-3">
            <div class="grow">
                <h2
                    class="
                      text-xs text-gray-600

                      dark:text-neutral-400
                    "
                >
                    {{ header }}
                </h2>
                <p
                    class="
                      break-word text-sm font-medium text-gray-800

                      dark:text-white
                    "
                >
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';

    defineProps({
        header: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,
            default: '',
        },
    });
</script>
