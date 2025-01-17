<template>
    <div
        class="
          flex flex-col rounded-xl border bg-white shadow-sm

          dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70
        "
    >
        <div
            v-if="image"
            class="p-2"
        >
            <img
                class="h-auto w-full rounded-t-xl"
                :src="imageLink"
                :alt="description"
            >
        </div>
        <div
            class="
              p-4

              md:p-5
            "
        >
            <h3
                class="
                  text-sm font-medium text-gray-800

                  dark:text-white
                "
            >
                {{ description }}
            </h3>
            <p
                class="
                  mt-5 text-xs text-gray-500

                  dark:text-neutral-500
                "
            >
                <slot name="actions" />
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';

    import * as tiff from 'tiff';

    // import { fromArrayBuffer } from ''geotiff";

    // const tiff = await fromArrayBuffer(tiffFil);
    // const image = await tiff.getImage();

    const props = defineProps({
        image: {
            type: String,
            required: false,
            default: null,
        },
        description: {
            type: String,
            required: false,
            default: '',
        },
    });

    const imageLink = ref<any>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function createImageFromPixels(width: number, height: number, data: Uint8Array) {
        if (data.length !== width * height * 4) {
            return '';
        }

        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        const imageData = new ImageData(new Uint8ClampedArray(data), width, height);

        ctx?.putImageData(imageData, 0, 0);

        return canvas.toDataURL();
    }

    onMounted(async () => {
        let url = props.image;

        if (props.image?.startsWith('//')) {
            url = `https:${props.image}`;
        }

        if (url.toLowerCase().endsWith('.tiff')) {
            const response = await fetch(url);

            if (response.ok) {
                const tiffFile = await response.arrayBuffer();

                const result = tiff.decode(tiffFile, {});

                // @ts-expect-error Wrong types in the module.
                const imageUrl = createImageFromPixels(result[0].width, result[0].height, result[0].data);

                imageLink.value = imageUrl;
            }
        } else {
            imageLink.value = url;
        }
    });
</script>
