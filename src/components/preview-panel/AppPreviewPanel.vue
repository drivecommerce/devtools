<template>
    <div class="mx-auto flex h-full w-full">
        <AppJsonViewerList :jsons="allJsonData" />

        <div class="h-full w-full grow break-before-all space-y-8 overflow-auto">
            <div class="p-4">
                <div class="mb-5 flex flex-wrap items-center justify-between gap-1">
                    <div class="grow">
                        <h1
                            class="
                              text-xl font-medium text-gray-800

                              dark:text-neutral-200
                            "
                        >
                            Recipe details
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

                    <div class="flex justify-end">
                        <NavSegment>
                            <NavSegmentButtonActive
                                v-if="tab === 'preview'"
                            >
                                Preview
                            </NavSegmentButtonActive>
                            <NavSegmentButton
                                v-if="tab !== 'preview'"
                                @click="setTab('preview')"
                            >
                                Preview
                            </NavSegmentButton>

                            <NavSegmentButtonActive
                                v-if="tab === 'json'"
                            >
                                JSON
                            </NavSegmentButtonActive>
                            <NavSegmentButton
                                v-if="tab !== 'json'"
                                @click="setTab('json')"
                            >
                                JSON
                            </NavSegmentButton>
                        </NavSegment>
                    </div>

                    <template v-if="tab === 'json'">
                        <AppJsonViewer
                            :json-data="selectedJsonData"
                        />
                    </template>

                    <template v-if="tab === 'preview'">
                        <PreviewPanelHeader :selected-json-data="selectedJsonData" />
                        <PreviewPanelComponents :selected-json-data="selectedJsonData" />
                        <PreviewPanelViewsSection :selected-json-data="selectedJsonData" />
                        <PreviewPanelProductionReadySection :selected-json-data="selectedJsonData" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { inject, ref, watchEffect } from 'vue';

    import AppJsonViewerList from '@/components/json-viewer/AppJsonViewerList.vue';

    const interceptors = inject<any>('interceptors');

    const allJsonData = ref<any[]>(interceptors.state.blueprintData);
    const selectedBlueprintDataIndex = ref<number>(interceptors.state.selectedBlueprintDataIndex);
    const selectedJsonData = ref<any>(interceptors.state.blueprintData[interceptors.state.selectedBlueprintDataIndex]);

    const tab = ref<any>('preview');

    function setTab(t: any) {
        tab.value = t;
    }

    watchEffect(() => {
        allJsonData.value = interceptors.state.blueprintData;
        selectedBlueprintDataIndex.value = interceptors.state.selectedBlueprintDataIndex;
        selectedJsonData.value = interceptors.state.blueprintData[interceptors.state.selectedBlueprintDataIndex];
    });

</script>
