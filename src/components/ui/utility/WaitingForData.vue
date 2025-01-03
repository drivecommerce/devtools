<template>
    <div
        class="
          max-w-xs rounded-xl border border-gray-200 bg-white shadow-lg

          dark:border-neutral-700 dark:bg-neutral-800
        "
        role="alert"
        tabindex="-1"
        aria-labelledby="hs-toast-normal-example-label"
    >
        <div class="flex p-4">
            <div
                class="
                  text-sm text-gray-700

                  dark:text-neutral-400
                "
            >
                <div class="flex flex-col gap-6 text-center">
                    <img
                        src="../../../assets/splash-logo.svg"
                        width="150"
                    >

                    Waiting for data...
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>
