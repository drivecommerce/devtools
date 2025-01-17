<template>
    <div
        v-for="(item, i) in listItems"
        :key="i"
        :item="item"
        :index="i"
        data-component="TimelineList"
        @click="() => handleSelectItem(i)"
    >
        <TimelineListHeading v-if="item.heading">
            {{ item.heading }}
        </TimelineListHeading>

        <TimelineListItem :is-selected="selectedBlueprintDataIndex === i">
            <template #primary>
                <div class="w-full grow truncate">
                    {{ item.label }}
                </div>
            </template>
            <template #type>
                <span
                    v-if="item.dataType === 'blueprint'"
                    class="
                      inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-800

                      dark:bg-blue-800/30 dark:text-blue-500
                    "
                >Blueprint</span>
                <span
                    v-if="item.dataType === 'recipe-save'"
                    class="
                      inline-flex items-center gap-x-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800

                      dark:bg-yellow-800/30 dark:text-yellow-500
                    "
                >Recipe Saved</span>
                <span
                    v-if="item.dataType === 'recipe-load'"
                    class="
                      inline-flex items-center gap-x-1.5 rounded-full bg-teal-100 px-3 py-1.5 text-xs font-medium text-teal-800

                      dark:bg-teal-800/30 dark:text-teal-500
                    "
                >Recipe Loaded</span>
                <span
                    v-if="item.dataType === 'custom-service'"
                    class="
                      inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800

                      dark:bg-white/10 dark:text-white
                    "
                >Custom Data Service</span>
                <span
                    v-if="item.dataType === 'datagrid'"
                    class="
                      inline-flex items-center gap-x-1.5 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-800

                      dark:bg-indigo-800/30 dark:text-indigo-500
                    "
                >Data Grid</span>
                <span
                    v-if="item.dataType === 'moderation'"
                    class="
                      inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800

                      dark:bg-red-800/30 dark:text-red-500
                    "
                >Moderation</span>
                <span
                    v-if="item.dataType === 'analytics'"
                    class="
                      inline-flex items-center gap-x-1.5 rounded-full bg-pink-100 px-3 py-1.5 text-xs font-medium text-pink-800

                      dark:bg-pink-800/30 dark:text-pink-500
                    "
                >Analytics</span>
            </template>
        </TimelineListItem>
    </div>
</template>

<script lang="ts" setup>
    import TimelineListHeading from '@/components/ui/timeline/TimelineListHeading.vue';
    import TimelineListItem from '@/components/ui/timeline/TimelineListItem.vue';

    const { listItems } = defineProps<{
        listItems: any[];
    }>();

    const interceptors = inject<any>('interceptors');

    if (!interceptors) {
        throw new Error('interceptors is undefined');
    }

    const selectedBlueprintDataIndex = ref<number>(interceptors.state.selectedBlueprintDataIndex);

    const handleSelectItem = (index: number) => {
        interceptors.state.selectedBlueprintDataIndex = index;
    };

    watchEffect(() => {
        selectedBlueprintDataIndex.value = interceptors.state.selectedBlueprintDataIndex;
    });
</script>
