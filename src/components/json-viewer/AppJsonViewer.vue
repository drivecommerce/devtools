
<template>
    <div
        v-if="requestData"
        class="
          overflow-hidden rounded-xl bg-white py-4

          dark:bg-[#202124]
        "
    >
        <div
            class="
              mx-4 mb-4 border-b border-gray-300 pb-2 opacity-40

              dark:border-gray-800
            "
        >
            <span class="text-sm">
                Request details
            </span>
        </div>

        <ObjectVisualizer
            root-name="JSON"
            :data="requestData"
            :expand-on-created-and-updated="checkExpandPath"
            :get-keys="(object: any, path: any) => Object.keys(object)"
        />
    </div>

    <div
        ref="header"
        class="
          sticky -top-px z-10 flex min-h-[50px] items-center justify-center rounded-xl bg-white p-2 transition-all

          dark:bg-gray-800
        "
        :class="{
            'is-stickied': isStickied,
        }"
    >
        <div class="relative max-w-[400px] grow">
            <div class="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-2">
                <SearchIcon />
            </div>
            <input
                v-model="filter"
                type="text"
                class="
                  block w-full rounded border-gray-200 px-4 py-1 ps-8 text-sm

                  dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-600

                  disabled:pointer-events-none disabled:opacity-50

                  focus:border-blue-500 focus:ring-blue-500
                "
                placeholder="Apply a filter..."
            >
        </div>
    </div>

    <div
        class="
          overflow-hidden rounded-xl bg-white py-4

          dark:bg-[#202124]
        "
    >
        <div
            v-if="requestData"
            class="
              mx-4 mb-4 border-b border-gray-300 pb-2 opacity-40

              dark:border-gray-800
            "
        >
            <span class="text-sm">
                Response details
            </span>
        </div>

        <ObjectVisualizer
            root-name="JSON"
            :data="activeData"
            :expand-on-created-and-updated="checkExpandPath"
            :get-keys="(object: any, path: any) => Object.keys(object)"
        />
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, onMounted, onUnmounted } from 'vue';

    import { ObjectVisualizer } from 'object-visualizer';
    import 'object-visualizer/dist/index.min.css';

    const props = defineProps<{
        jsonData: any
        expanded?: boolean
    }>();

    const filter = ref('');
    const hasFilter = computed(() => filter.value.length >= 3);

    const header = ref(null);
    const isStickied = ref(false);

    /**
     * Check if JSON path should be expanded initially.
     */
    function checkExpandPath(p: [string]) {
        if (props.expanded) {
            return true;
        }

        if (hasFilter.value) {
            return true;
        }

        if (p?.length < 2) {
            return true;
        }

        return false;
    }

    /**
     * Filters the object properties.
     */
    function filterObject(data: any, filter: string) {
        const filterString = String(filter).toLowerCase();

        function matchesFilter(value: any) {
            if (typeof value === 'string' || typeof value === 'number') {
                return String(value).toLowerCase().includes(filterString);
            }
            return false;
        }

        function matchesKey(key: any) {
            return key.toLowerCase().includes(filterString);
        }

        function recursiveFilter(obj: any) {
            if (Array.isArray(obj)) {
                const filteredArray: any = obj
                    .map(recursiveFilter)
                    .filter(item => item !== null && item !== undefined);

                if (obj.some(matchesFilter)) {
                    return obj;
                }

                return filteredArray.length > 0 ? filteredArray : null;
            }

            if (typeof obj === 'object' && obj !== null) {
                const newObj: any = {};

                let hasPrimitiveMatch = false;
                let hasSubMatch = false;

                for (const [key, value] of Object.entries(obj)) {
                    if (typeof value === 'string' || typeof value === 'number') {
                        if (matchesFilter(value)) {
                            newObj[key] = value;
                            hasPrimitiveMatch = true;
                        }

                        continue;
                    }

                    const filteredValue = recursiveFilter(value);

                    if (filteredValue !== null && filteredValue !== undefined) {
                        newObj[key] = filteredValue;
                        hasSubMatch = true;

                        continue;
                    }

                    if (matchesKey(key)) {
                        newObj[key] = value;
                        hasSubMatch = true;

                        continue;
                    }
                }

                if (hasPrimitiveMatch) {
                    for (const [key, value] of Object.entries(obj)) {
                        if (typeof value === 'string' || typeof value === 'number') {
                            newObj[key] = value;
                        }
                    }

                    return newObj;
                }

                return hasSubMatch ? newObj : null;
            }

            // Check if the primitive matches the filter
            return matchesFilter(obj) ? obj : null;
        }

        return recursiveFilter(data);
    }

    /**
     * Calculate filtered data array.
     */
    const activeData = computed(() => {
        if (hasFilter.value) {
            let filtered: any = filterObject(props.jsonData.data, filter.value);

            if (filtered == null) {
                filtered = 'No matches';
            }

            return filtered;
        }

        return props.jsonData.data;
    });

    const requestData = computed(() => {
        if (props.jsonData?.request) {
            return props.jsonData?.request;
        }

        return null;
    });

    let observer: any = null;

    const handleIntersect = (entries: any) => {
        for (const entry of entries) {
            isStickied.value = entry.boundingClientRect.top <= 0;
        }
    };

    onMounted(() => {
        observer = new IntersectionObserver(handleIntersect, {
            threshold: [1],
        });

        if (header.value) {
            observer.observe(header.value);
        }
    });

    onUnmounted(() => {
        if (observer && header.value) {
            observer.unobserve(header.value);
        }
    });
</script>

<style scoped>
    .is-stickied {
        border-radius: 0;
        border-bottom: 1px solid rgb(203, 213, 225);
    }

    @media (prefers-color-scheme: dark) {
        .is-stickied {
            border-radius: 0;
            border-bottom: 1px solid rgb(51, 65, 85);
        }
    }

    .object-visualizer {
        padding-top: 0px;
        padding-bottom: 0px;

        font-size: 12px;
    }

    .object-visualizer >>> .value {
        white-space: normal;
    }

    .object-visualizer >>> .string {
        white-space: normal;
    }
</style>
