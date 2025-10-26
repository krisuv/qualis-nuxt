<script setup lang="ts">
import type { GalleryItem } from 'types/interfaces'
import { onMounted, ref, watch } from 'vue'
import { getGallery } from 'api/gallery.api'
import { AxiosError } from 'axios'
import { GalleryItemCategory } from 'types/enums'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'constants/pagination.constants'
import CategoriesCarousel from './CategoriesCarousel.vue'
import GalleryCard from './GalleryCard.vue'

const galleryItems = ref<GalleryItem[]>([]);
const selectedCategory = ref<GalleryItemCategory | null>(null);
const page = ref(DEFAULT_PAGE);
const pageSize = ref(DEFAULT_PAGE_SIZE);
const isError = ref(false);

async function handleGetGallery(): Promise<void> {
  try {
    galleryItems.value = await getGallery({ category: selectedCategory.value, page: page.value, pageSize: pageSize.value });  
    isError.value = false;
    
  } catch (error: unknown) {
      isError.value = true;
     if(error instanceof AxiosError){
      switch(error.code){
        case 'ERR_NETWORK':
          console.log('Backend not connected - using mock data for development')
          // Use mock data when backend is not available
          galleryItems.value = [
            {
              documentId: '1',
              name: 'kuchnia wykonana na wymiar',
              category: GalleryItemCategory.KITCHEN,
              description: 'Wykonana na wymiar kuchnia z naturalnego drewna w odcieniu grafitowym.',
              images: [
                {
                  small: { url: '/img/gallery/item-1/img-1.jpg', ext: 'jpg' },
                  large: { url: '/img/gallery/item-1/img-1.jpg', ext: 'jpg' }
                },
                {
                  small: { url: '/img/gallery/item-1/img-2.jpg', ext: 'jpg' },
                  large: { url: '/img/gallery/item-1/img-2.jpg', ext: 'jpg' }
                },
                {
                  small: { url: '/img/gallery/item-1/img-3.jpg', ext: 'jpg' },
                  large: { url: '/img/gallery/item-1/img-3.jpg', ext: 'jpg' }
                }
              ]
            }
          ];
          break;
        default:
          console.log('other error');
          break;  
      }
     } 
     if (galleryItems.value.length === 0) {
       galleryItems.value = [];
     }
  }
}

onMounted(() => {
  // Only run API calls on client side
  if (import.meta.client) {
    handleGetGallery();
  }
});

watch(selectedCategory, handleGetGallery);

</script>

<template>
  <section id="gallery" class="py-5 px-8.6">
    <h2>Galeria</h2>
    <p>
      Moja twórczość to nie tylko standardowe meble, jakie widzisz w mieszkaniach, ale też bardziej wymagające zamówienia pod indywidualne preferencje. <b>Sprawdź po poszczególnych kategoriach.</b>
    </p>

    <CategoriesCarousel v-model:selected-category="selectedCategory" />

    <!-- <h3>Znaleziono</h3> -->

    <!-- https://iconoir.com/ ikonki -->
    <!-- https://www.figma.com/design/01kbeCD3TAUqHaU1SZnCOg/Furniture---Appliances-Icons--Community-?node-id=139-7&t=BQSEw3CQ0YESgcm1-0 -->
    <ul class="flex flex-wrap justify-center items-center gap-6 py-6">
      <li v-for="item in galleryItems" :key="item.documentId">
        <GalleryCard v-bind="item" />
      </li>
    </ul>
  </section>
</template>
