<script setup lang="ts">
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

interface ImageCarouselProps {
  images: {src: string, alt: string}[]
}

withDefaults(defineProps<ImageCarouselProps>(), {
  images: () => []
})

const config = {
  itemsToShow: 1,
  gap: 1,
  wrapAround: true
}

</script>

<template>
  <div class="resize-x flex-2/3 max-h-[400px] lg:max-h-full">
    <Carousel v-bind="config" class="carousel">
      <Slide v-for="image in images" :key="image.src" class="relative">
        <img :src="image.src" :alt="image.alt" class="h-full w-full mb-0 rounded-lg object-contain relative z-10" />
        <img :src="image.src" :alt="image.alt" class="h-full w-full mb-0 rounded-lg object-cover filter blur-xs absolute top-0 left-0 opacity-50 brightness-50 transform scale-105" />
      </Slide>
  
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style>
@reference '../../assets/tailwind.css';

.carousel {
  @apply h-full p-0;

  --vc-nav-color-hover: #e5e5e5;
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 40px;
  --vc-nav-height: 40px;

  --vc-icn-width: 28px;
  --vc-icn-height: 28px; 
}

.carousel__viewport {
  @apply rounded-lg;
}

.carousel__next,
.carousel__prev {
  @apply bg-black-earth-700 text-creamy-100 rounded-full w-[40px] h-[40px] min-w-[40px];
}

.carousel__next {
  @apply -translate-x-4;
}

.carousel__prev {
  @apply translate-x-4;
}


</style>