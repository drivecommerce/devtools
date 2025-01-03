<template>
    <dt
        class="
          min-h-8 text-sm text-gray-500

          dark:text-neutral-500

          sm:py-1
        "
    >
        <slot name="title" />
    </dt>
    <dd
        class="
          pb-3 min-h-8 text-sm text-gray-800

          dark:text-neutral-200

          sm:py-1
        "
    >
        <slot name="content" />
    </dd>
</template>
