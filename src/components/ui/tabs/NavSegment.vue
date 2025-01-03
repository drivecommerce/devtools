<template>
    <div class="flex">
        <div
            class="
              flex rounded-lg bg-gray-100 p-1 transition

              dark:bg-neutral-700 dark:hover:bg-neutral-600

              hover:bg-gray-200
            "
        >
            <nav class="flex gap-x-2">
                <slot/>

            </nav>
        </div>
    </div>
</template>
