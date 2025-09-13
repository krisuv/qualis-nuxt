<script setup lang="ts">
import { ref } from 'vue'
import BookshelfIcon from '../atoms/BookshelfIcon.vue'
import BedIcon from '../atoms/BedIcon.vue'
import { GalleryItemCategory } from '@/typescript/enums'
import AllCategoriesIcon from '../atoms/AllCategoriesIcon.vue'
import SinkIcon from '../atoms/SinkIcon.vue'
import KichtenIcon from '../atoms/KichtenIcon.vue'
import TvTableIcon from '../atoms/TvTableIcon.vue'
import TableLampIcon from '../atoms/TableLampIcon.vue'
import EllipsisIcon from '@heroicons/vue/24/outline/EllipsisHorizontalIcon';

interface CategoriesCarouselProps {
  selectedCategory: GalleryItemCategory | null
}

defineProps<CategoriesCarouselProps>()

const emit = defineEmits<{
  (event: 'update:selectedCategory', newValue: GalleryItemCategory | null): void
}>()


const wrapper = ref<HTMLElement | null>(null)
const dragging = ref(false)
const dragStartX = ref(0)
const dragStartLeft = ref(0)
const ignoreNextClick = ref(false) // ← suppress synthetic click
const DRAG_THRESHOLD = 5 // px

/* data */
const categories = [
  {value: null, label: 'wszystkie', icon: AllCategoriesIcon},
  { value: GalleryItemCategory.KITCHEN, label: 'kuchnia', icon: KichtenIcon },
  { value: GalleryItemCategory.LIVING_ROOM, label: 'salon', icon: TvTableIcon },
  { value: GalleryItemCategory.BEDROOM, label: 'sypialnia', icon: BedIcon },
  { value: GalleryItemCategory.OFFICE, label: 'biuro', icon: BookshelfIcon },
  { value: GalleryItemCategory.BATHROOM, label: 'łazienka', icon: SinkIcon },
  { value: GalleryItemCategory.ACCESSORIES, label: 'akcesoria', icon: TableLampIcon },
  { value: GalleryItemCategory.OTHER, label: 'inne', icon: EllipsisIcon },
]

/* ---------- pointer handlers ---------- */
function onPointerDown(e: PointerEvent) {
  if (!wrapper.value) return

  dragging.value = true
  dragStartX.value = e.pageX
  dragStartLeft.value = wrapper.value.scrollLeft
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value || !wrapper.value) return

  const dx = e.pageX - dragStartX.value

  /* once user moves farther than the threshold, we treat it as a drag
     and capture further pointer events so scrolling keeps working even
     if the pointer leaves the wrapper */
  if (Math.abs(dx) > DRAG_THRESHOLD) {
    ignoreNextClick.value = true // will cancel upcoming click
    wrapper.value.setPointerCapture(e.pointerId) // capture after threshold
  }

  wrapper.value.scrollLeft = dragStartLeft.value - dx
}

function onPointerUp(e: PointerEvent) {
  if (!wrapper.value) return
  wrapper.value.releasePointerCapture?.(e.pointerId)
  dragging.value = false
}

/* ---------- click handler ---------- */
function choose(value: GalleryItemCategory | null, e: MouseEvent) {
  if (ignoreNextClick.value) {
    // synthetic click right after a drag
    e.preventDefault()
    ignoreNextClick.value = false // clear for the next real click
    return
  }

  emit('update:selectedCategory', value)
  // selected.value = name;

  /* centre the selected button */
  const btn = document.getElementById(value || 'clear')
  const box = wrapper.value
  if (btn && box) {
    const btnRect = btn.getBoundingClientRect()
    const boxRect = box.getBoundingClientRect()
    const offset = btnRect.left - boxRect.left - boxRect.width / 2 + btnRect.width / 2
    box.scrollBy({ left: offset, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="-mx-8.5">
    <label for="categories" class="block font-bold mb-1 text-black-earth-800 px-8.5">
      Kategorie
    </label>

    <div
      ref="wrapper"
      class="scroll-wrapper overflow-x-auto select-none cursor-grab active:cursor-grabbing"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <ul
        id="categories"
        role="listbox"
        aria-label="Kategorie filtrów"
        class="flex gap-4 px-8.5 py-3 min-w-max scroll-smooth snap-x snap-mandatory"
      >
        <li
          v-for="category in categories"
          :key="category.value || 'clear'"
          :id="category.value || 'clear'"
          role="option"
          :aria-selected="selectedCategory === category.value"
          class="snap-start shrink-0"
        >
          <button
            type="button"
            :aria-pressed="selectedCategory === category.value"
            @click="choose(category.value, $event)"
            class="w-28 h-28 rounded-xl border border-black-earth/50 px-4 py-3 flex flex-col items-center justify-center text-sm font-semibold transition-colors duration-200"
            :class="
              selectedCategory === category.value
                ? 'bg-black-earth-200' /* selected – no hover tint */
                : 'hover:bg-black-earth/10' /* unselected + hover */
            "
          >
            <component :is="category.icon" class="text-black-earth-800 w-8 h-8 mb-2"  />
            <span class="capitalize text-black-earth-900" >{{ category.label }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.scroll-wrapper {
  scrollbar-width: none;
}
.scroll-wrapper::-webkit-scrollbar {
  display: none;
}

/* disable grab cursor on touch devices */
@media (hover: none) {
  .scroll-wrapper {
    cursor: auto !important;
  }
}
</style>
