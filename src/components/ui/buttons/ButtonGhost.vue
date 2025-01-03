<template>
    <button
        class="
          inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-slate-600

          dark:text-gray-200 dark:hover:bg-slate-800/30 dark:hover:text-slate-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600

          disabled:pointer-events-none disabled:opacity-50

          hover:bg-slate-100 hover:text-slate-800
        "
    >
        <slot />
    </button>
</template>
