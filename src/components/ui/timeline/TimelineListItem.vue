<template>
    <div
        class="flex gap-x-3"
        data-component="TimelineListItem"
    >
        <div
            class="
              relative

              after:absolute after:bottom-0 after:start-3.5 after:top-7 after:w-px after:translate-x-[-0.5px] after:bg-gray-200

              dark:after:bg-gray-700

              last:after:hidden
            "
        >
            <div class="relative z-10 flex h-7 w-7 items-center justify-center">
                <div
                    :class="[
                        'rounded-full',
                        isSelected ? 'h-3 w-3 bg-green-500' : `
                          h-2 w-2 bg-gray-400

                          dark:bg-gray-600
                        `
                    ]"
                />
            </div>
        </div>
        <div class="grow overflow-hidden pb-2 pt-0.5">
            <div
                class="
                  flex cursor-pointer items-center gap-2 text-sm font-normal text-gray-800

                  dark:text-gray-200
                "
            >
                <slot name="primary" />
            </div>
            <p class="my-2">
                <slot name="type" />
            </p>
            <p
                class="
                  mt-1 text-sm text-gray-600

                  dark:text-gray-400
                "
            >
                <slot name="secondary" />
            </p>
            <div class="mt-3 flex">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { isSelected } = defineProps<{
        isSelected: boolean;
    }>();
</script>
