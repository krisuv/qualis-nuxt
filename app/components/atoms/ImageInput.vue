<script setup lang="ts">
import { PhotoIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'

interface ImageInputProps {
  images: File[];
  id: string
  label: string
  hint: string
  multiple?: boolean
}

const props = withDefaults(defineProps<ImageInputProps>(), {
  images: () => [],
  multiple: false,
})

const fileInput = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (event: 'update:images', value: File[]): void
}>();

const MAX_DISPLAY_IMAGE_COUNT = 3;

const thumbnails = computed(() =>
  props.images.map((file) => {
    if (file.type.startsWith('image')) {
      return URL.createObjectURL(file)
    }
    return null
  }).filter(Boolean),
)

function isHTMLInputElement(element: EventTarget | null): element is HTMLInputElement {
  return true
}

function handleSelectFile(payload: Event) {
  const element = payload.target

  if (isHTMLInputElement(element)) {
    const elementFiles = element.files

    if (elementFiles) {
      const files = Array.from(elementFiles)
      const uniqueImages = Array.from(new Set([ ...files, ...props.images]));
      emit('update:images', uniqueImages);
    }
  }
}

function clearImages(): void {
  emit('update:images', []);
}

function onKeyDown(event: KeyboardEvent): void {
  if(event.key === 'Enter') {
    fileInput.value?.click();
  }
}

</script>

<template>
  <div>
    <!-- top label -->
    <label :for="props.id" class="block font-bold mb-1 text-black-earth-800">
      {{ props.label }}
    </label>

    <!-- fake drop-zone (label) wrapping the real, hidden <input type=file> -->
    <label
      @keydown.enter.prevent="onKeyDown"
      :for="props.id"
      tabindex="0"
      class="flex flex-col items-center justify-center gap-2 rounded-lg border-1 border-dashed border-charcoal py-10 cursor-pointer text-black-earth-500 hover:bg-black-earth-50 transition h-80"
    >
      <PhotoIcon v-if="thumbnails.length === 0" class="w-12 h-12 stroke-current text-black-earth-200" />

      <span v-if="thumbnails.length === 0" class="text-base">Przeciągnij lub kliknij, aby dodać zdjęcia</span>
      <ul class="flex gap-2 my-2">
        <li :key="thumbnail || 'key'" v-for="thumbnail in thumbnails.slice(0, MAX_DISPLAY_IMAGE_COUNT)" class="basis-3xs h-30">
          <img v-if="thumbnail" :src="thumbnail" alt="" class="h-full w-full object-cover rounded-sm" />
        </li>
        <li v-if="thumbnails.length > MAX_DISPLAY_IMAGE_COUNT" class="basis-3xs h-30 flex flex-col items-center justify-center">
          <EllipsisHorizontalIcon  class="w-12 h-12 stroke-current text-black-earth-200" />
          <span>
            + {{ thumbnails.length - MAX_DISPLAY_IMAGE_COUNT }} zdjęć
          </span>
        </li>
      </ul>
      <span v-if="thumbnails.length > 0" class="text-base mb-6">Przeciągnij lub kliknij, aby dodać więcej zdjęć</span>
      <button @click="clearImages" @keydown.enter.stop="clearImages" class="bg-black-earth" :hidden="!images.length">Wyczyść</button>

      <!-- REAL file input -->
      <input
        ref="fileInput"
        class="hidden"
        type="file"
        :id="props.id"
        :name="props.id"
        accept="image/jpeg,image/png,image/webp,image/gif"
        :multiple="props.multiple"
        v-on:change="handleSelectFile"
        v-bind="$attrs"
      />
    </label>

    <!-- bottom hint -->
    <p class="block text-sm mt-1">
      {{ props.hint }}
    </p>
  </div>
</template>
