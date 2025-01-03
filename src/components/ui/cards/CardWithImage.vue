<template>
    <div
        class="
          flex flex-col rounded-xl border bg-white shadow-sm

          dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70
        "
    >
        <div
            v-if="image"
            class="p-2"
        >
            <img
                class="h-auto w-full rounded-t-xl"
                :src="imageLink"
                :alt="description"
            >
        </div>
        <div
            class="
              p-4

              md:p-5
            "
        >
            <h3
                class="
                  text-sm font-medium text-gray-800

                  dark:text-white
                "
            >
                {{ description }}
            </h3>
            <p
                class="
                  mt-5 text-xs text-gray-500

                  dark:text-neutral-500
                "
            >
                <slot name="actions" />
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        image: {
            type: String,
            required: false,
            default: null,
        },
        description: {
            type: String,
            required: false,
            default: '',
        },
    });

    const imageLink = computed(() => {
        if (props.image?.startsWith('//')) {
            return `https:${props.image}`;
        }

        return props.image;
    });
</script>
