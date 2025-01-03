<template>
    <div
        class="
          flex w-full min-w-[200px] max-w-[200px] flex-1 grow flex-col overflow-y-auto border-r border-slate-300

          dark:border-slate-700

          lg:min-w-[250px] lg:max-w-[250px]

          xl:min-w-[300px] xl:max-w-[300px]
        "
    >
        <div
            class="
              sticky top-0 z-10 flex flex min-h-[50px] items-center justify-start border-b border-slate-300 p-2

              dark:border-slate-700
            "
        >
            <ButtonGhost
                class="w-auto"
                @click="handleClearList"
            >
                <TrashIcon />
            </ButtonGhost>
        </div>

        <div class="h-full w-full pr-2 pt-4">
            <TimelineList :list-items="listItems" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import TrashIcon from '@/components/icons/TrashIcon.vue';

    const interceptors = inject<any>('interceptors');

    if (!interceptors) {
        throw new Error('interceptors is undefined');
    }

    const handleClearList = () => {
        interceptors.clearBlueprintData();
    };

    const { jsons } =
        defineProps<{
            jsons: any[];
        }>();

    const listItems = ref<any[]>([]);

    watchEffect(() => {
        listItems.value = jsons.map(({ label, dataType, url }) => ({
            label,
            dataType,
            url
        }));
    });
</script>
