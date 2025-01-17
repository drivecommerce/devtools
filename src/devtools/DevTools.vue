<template>
    <div
        class="
          relative flex h-screen max-h-screen w-screen flex-col items-center text-base

          dark:bg-gray-800 dark:text-gray-200
        "
    >
        <LoadingScreen
            v-if="isLoading"
            transition=" all 0.3s ease"
        />
        <template v-else>
            <div
                class="flex h-full w-full"
                :class="selectedJsonData?.label ? '' : 'justify-center'"
            >
                <AppJsonViewerPanel
                    v-if="selectedJsonData?.dataType === 'blueprint'"
                    title="Blueprint details"
                />

                <AppJsonViewerPanel
                    v-else-if="selectedJsonData?.dataType === 'custom-service'"
                    title="Custom service details"
                />

                <AppJsonViewerPanel
                    v-else-if="selectedJsonData?.dataType === 'moderation'"
                    title="Moderation check"
                    :expanded="true"
                />

                <AppJsonViewerPanel
                    v-else-if="selectedJsonData?.dataType === 'analytics'"
                    title="Action analytics event"
                    :expanded="true"
                />

                <AppJsonViewerPanel
                    v-else-if="selectedJsonData?.dataType === 'datagrid'"
                    title="Data grid query"
                    :expanded="true"
                />

                <AppPreviewPanel
                    v-else-if="selectedJsonData?.dataType === 'recipe-save' || selectedJsonData?.dataType === 'recipe-load'"
                />

                <template v-else>
                    <div class="flex h-full w-full flex-col items-center justify-center gap-6">
                        <WaitingForData />
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import {
        createInterceptors,
    } from '@/logic/interceptors';
    import { createSettings } from '@/logic/settings';

    // @ts-expect-error Test data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import mockBlueprintLarge from '@/mockups/mockBlueprintLarge';
    // @ts-expect-error Test data
    import mockRecipeSmallWithProduction from '@/mockups/mockRecipeSmallWithProduction';
    // @ts-expect-error Test data
    import mockCustomService from '@/mockups/mockCustomService';
    // @ts-expect-error Test data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import mockModerationRequest from '@/mockups/mockModerationRequest';
    // @ts-expect-error Test data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import mockModerationResponse from '@/mockups/mockModerationResponse';
    // @ts-expect-error Test data
    import mockDataGridRequest from '@/mockups/mockDataGridRequest';
    // @ts-expect-error Test data
    import mockDataGridResponse from '@/mockups/mockDataGridResponse';
    // @ts-expect-error Test data
    import mockAnalytics from '@/mockups/mockAnalytics';

    const interceptors = createInterceptors();
    const settings = createSettings();

    provide('interceptors', interceptors);
    provide('settings', settings);

    onMounted(() => {
        interceptors.setupInterceptors();
    });

    onUnmounted(() => {
        interceptors.removeInterceptors();
    });

    const isLoading = ref(true);

    const selectedJsonData = ref<any>(interceptors.state.blueprintData[interceptors.state.selectedBlueprintDataIndex]);

    watchEffect(() => {
        selectedJsonData.value = interceptors.state.blueprintData[interceptors.state.selectedBlueprintDataIndex];
    });

    onMounted(() => {
        setTimeout(() => {
            isLoading.value = false;

            // Add mocks if we are in the development mode.
            if ((window.chrome as any).devtools == null) {
                if (import.meta.env.DEV) {
                    interceptors.handleAddDataGrid(JSON.stringify(mockDataGridRequest), JSON.stringify(mockDataGridResponse), 'https://test1');
                    interceptors.handleAddModeration(JSON.stringify(mockModerationRequest), JSON.stringify(mockModerationResponse), 'https://test1');
                    interceptors.handleAddCustomServiceCall(JSON.stringify(mockCustomService), 'Customizer-ProductData', 'https://test1');
                    interceptors.handleAddRecipe(JSON.stringify(mockRecipeSmallWithProduction), 'recipe-save');
                    interceptors.handleAddRecipe(JSON.stringify(mockRecipeSmallWithProduction), 'recipe-load');
                    interceptors.handleAddBlueprint(JSON.stringify(mockBlueprintLarge), 0, 'https://test2');
                    interceptors.handleAddAnalytics(JSON.stringify(mockAnalytics), 0, 'https://test2');
                }
            }
        }, 100);
    });
</script>
