<template>
    <InnerCard>
        <InnerCardSection>
            <span class="text-base">{{ viewsWithImages.length }} previews with images
            </span>
        </InnerCardSection>

        <BaseGrid>
            <CardWithImage
                v-for="view in viewsWithImages"
                :key="view.code"

                :image="view.previewPng ?? view.previewJpg"
                :description="view.code"
            >
                <template #actions>
                    <div class="flex gap-2">
                        <LinkOutline
                            v-if="view.previewPng"
                            :href="makeImageLink(view.previewPng)"
                            class="flex-none"
                        >
                            <OpenLinkIcon class="mr-1 inline-block align-[-2px]" />
                            png
                        </LinkOutline>

                        <LinkOutline
                            v-if="view.previewJpg"
                            :href="makeImageLink(view.previewJpg)"
                            class="flex-none"
                        >
                            <OpenLinkIcon class="mr-1 inline-block align-[-2px]" />
                            jpeg
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
            (view: any) => view.previewPng || view.previewJpg
        )
    });

    function makeImageLink(v: any) {
        if (v?.startsWith('//')) {
            return `https://${v}`;
        }

        return v;
    }
</script>
