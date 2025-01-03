<template>
    <div class="mx-auto flex h-full w-full">
        <AppJsonViewerList :jsons="allJsonData" />

        <div class="h-full w-full grow break-before-all overflow-auto">
            <div class="p-4">
                <div class="mb-5 flex flex-wrap items-center justify-between gap-1">
                    <div class="grow">
                        <h1
                            class="
                              text-xl font-medium text-gray-800

                              dark:text-neutral-200
                            "
                        >
                            {{ title }}
                        </h1>
                    </div>
                </div>

                <div
                    class="
                      space-y-2 rounded-2xl border border-gray-200 bg-gray-100 p-1.5

                      dark:border-neutral-700 dark:bg-neutral-800
                    "
                >
                    <InnerCard>
                        <a
                            :href="selectedJsonData.url"
                            target="_blank"
                            class="
                              break-all text-sm text-gray-800

                              dark:text-gray-400
                            "
                        >
                            <OpenLinkIcon class="mr-1 inline-block align-[-2px]" />
                            {{ selectedJsonData.url }}
                        </a>
                    </InnerCard>

                    <AppJsonViewer
                        :json-data="selectedJsonData"
                        :expanded="expanded"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { inject, ref, watchEffect } from 'vue';

    import AppJsonViewerList from '@/components/json-viewer/AppJsonViewerList.vue';

    defineProps({
        title: {
            type: String,
            required: true
        },
        expanded: {
            type: Boolean,
            required: false,
            default: false,
        },
    });

    const interceptors = inject<any>('interceptors');

    const allJsonData = ref<any[]>(interceptors.state.blueprintData);
    const selectedJsonData = ref<any>(interceptors.state.blueprintData[interceptors.state.selectedBlueprintDataIndex]);

    watchEffect(() => {
        selectedJsonData.value = interceptors.state.blueprintData[interceptors.state.selectedBlueprintDataIndex];
    });
</script>
