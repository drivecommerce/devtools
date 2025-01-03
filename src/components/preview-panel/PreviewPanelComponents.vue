<template>
    <BaseGrid>
        <MiniCard
            v-for="component in selectedJsonData.data.components"
            :key="component.code"
            :header="component.code"
            :description="component.component.placementIndependentCode"
        />
    </BaseGrid>
</template>

<script lang="ts" setup>
    defineProps({
        selectedJsonData: {
            type: Object,
            required: true
        }
    });
</script>
