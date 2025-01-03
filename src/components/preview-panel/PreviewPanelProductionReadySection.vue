<template>
    <InnerCard>
        <InnerCardSection>
            <span class="text-base">{{ viewsWithImages.length }} views with production assets
            </span>
        </InnerCardSection>

        <BaseGrid>
            <CardWithImage
                v-for="view in viewsWithImages"
                :key="view.code"

                :image="getImage(view)"
                :description="view.code"
            >
                <template #actions>
                    <div class="flex gap-2">
                        <LinkOutline
                            v-if="view.production"
                            :href="view.production"
                            class="flex-none"
                        >
                            <OpenLinkIcon class="mr-1 inline-block align-[-2px]" />
                            <span v-if="view.production.toLowerCase().endsWith('tiff')">tiff</span>
                            <span v-else-if="view.production.toLowerCase().endsWith('pdf')">pdf</span>
                            <span v-else-if="view.production.toLowerCase().endsWith('jpg')">jpg</span>
                            <span v-else-if="view.production.toLowerCase().endsWith('png')">png</span>
                            <span v-else-if="view.production.toLowerCase().endsWith('ai')">ai</span>
                            <span v-else>file</span>
                        </LinkOutline>
                    </div>
                </template>
            </CardWithImage>
        </BaseGrid>
    </InnerCard>
</template>

<script lang="ts" setup>
    const props = defineProps({
        selectedJsonData: {
            type: Object,
            required: true
        }
    });

    const viewsWithImages = ref<any[]>([]);

    watchEffect(() => {
        viewsWithImages.value = props.selectedJsonData.data.views.filter(
            (view: any) => view.productionReady
        )
    });

    function getImage(view: any) {
        const image = view.production?.toLowerCase();

        if (image.endsWith('.png')) {
            return view.production;
        }

        return null;
    }
</script>
