<script setup lang="ts">
import type { GalleryItem } from '@/typescript/interfaces';
import { MagnifyingGlassPlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { nextTick, ref, watch } from 'vue'
import ImageCarousel from '../molecules/ImageCarousel.vue';

defineProps<GalleryItem>()

const dialogOpen = ref(false)
const dialogRef = ref<HTMLDialogElement | null>(null)

watch(dialogOpen, async (value) => {
  await nextTick()

  const dialog = dialogRef.value
  if (!dialog) return

  if (value) {
    dialog.showModal()
  } else {
    dialog.close()
  }
})
</script>

<template>
  <button @click="dialogOpen = true" class="bg-light-beige shadow-lg rounded-lg h-[420px] max-w-[320px] group p-0 min-w-[320px] text-left font-normal hover:brightness-105 focus-visible:brightness-105">
    <div class="overflow-hidden rounded-lg cursor-pointer relative h-[50%]">
      <img
        :src="images[0].small.url"
        :alt="''"
        class="transition-transform duration-300 ease-in-out group-hover:scale-115 group-focus-visible:scale-115 h-full w-full object-cover"
      />
      <div
        class="absolute bottom-2 right-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0  group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
      >
        <MagnifyingGlassPlusIcon
          class="size-10 rounded-lg bg-black-earth text-light-beige p-2 shadow-md"
        />
      </div>
    </div>

    <div class="pt-5 px-5 pb-7.5 h-[50%]">
      <h4 class="pb-4">{{ name }}</h4>

      <h5>Opis</h5>
      <p class="line-clamp-3">{{ description }}</p>
    </div>
  </button>

  <dialog
    ref="dialogRef"
    id="image-dialog"
    class="m-auto rounded-lg p-6 z-10 h-[80vh] max-h-[800px] w-full max-w-[80vw] open:flex open:gap-8 open:flex-col xl:open:flex-row shadow-sm bg-linear-to-r from-light-beige-300 from-0% via-light-beige-200 via-25% to-50% to-light-beige-100"
    @close="dialogOpen = false"
  >
    <!-- <img :src="images[0].large.url" :alt="''" class="w-[70%] h-auto mb-4 rounded-lg object-cover" /> -->
    <ImageCarousel :images="images.map((image, index) => ({ src: images[index].large.url, alt: images[index].large.ext || '' }))" />

    <div class="flex-1/3">
      <div class="flex justify-between items-center mb-8">
        <h4 class="pb-0">{{ name }}</h4>
        <button
          aria-labelledby="close-label"
          @click="dialogOpen = false"
          class="size-10 rounded-lg bg-black-earth text-light-beige shadow-md flex justify-center items-center min-w-min px-1 py-1 max-w-fit max-h-fit"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
        <p id="close-label" class="visually-hidden">Kliknij aby zamknąć</p>
      </div>

      <h5>Opis</h5>
      <p class="mb-8 lg:pr-8 text-justify">{{ description }}</p>

    </div>
  </dialog>
</template>

<style>
@reference '../../assets/tailwind.css';

body:has(dialog#image-dialog[open]) {
  overflow: hidden;
}

dialog::backdrop {
  @apply bg-black-earth-800 opacity-65;
}
</style>
