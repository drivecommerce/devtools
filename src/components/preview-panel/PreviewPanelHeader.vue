<template>
    <InnerCard>
        <DescriptionListWrapper class="break-words">
            <DescriptionListItem>
                <template #title>
                    Recipe ID
                </template>
                <template #content>
                    {{ selectedJsonData.data.id }}
                </template>
            </DescriptionListItem>
            <DescriptionListItem>
                <template #title>
                    Product style code
                </template>
                <template #content>
                    {{ selectedJsonData.data.styleCode }}
                </template>
            </DescriptionListItem>
            <DescriptionListItem>
                <template #title>
                    Product name
                </template>
                <template #content>
                    {{ selectedJsonData.data.name }}
                </template>
            </DescriptionListItem>
            <DescriptionListItem>
                <template #title>
                    PDF link
                </template>
                <template #content>
                    <a
                        v-if="selectedJsonData.humanReadable"
                        :href="selectedJsonData.humanReadable"
                        class="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <OpenLinkIcon class="mr-1 inline-block align-[-2px]" />
                        {{ selectedJsonData.humanReadable }}
                    </a>
                    <span v-else>Not rendered</span>
                </template>
            </DescriptionListItem>

            <DescriptionListItem>
                <template #title>
                    JSON Link
                </template>
                <template #content>
                    <a
                        v-if="selectedJsonData.url"
                        :href="selectedJsonData.url"
                        class="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <OpenLinkIcon class="mr-1 inline-block align-[-2px]" />
                        {{ selectedJsonData.url }}
                    </a>
                </template>
            </DescriptionListItem>
        </DescriptionListWrapper>
    </InnerCard>
</template>

<script lang="ts" setup>

    defineProps({
        selectedJsonData: {
            type: Object,
            required: true
        }
    });
</script>
