<script setup lang="ts">
import HeroSection from '../components/organisms/HeroSection.vue'
import AboutSection from '../components/organisms/AboutSection.vue'
import GalleryWithSearch from '../components/organisms/GalleryWithSearch.vue'
import ContactForm from '../components/organisms/ContactForm.vue'
</script>

<template>
    <HeroSection />
    <AboutSection />
    <ClientOnly>
        <GalleryWithSearch />
        <ContactForm />
        <template #fallback>
            <div class="py-5 px-8.6">
                <h2>Ładowanie galerii...</h2>
                <p>Proszę czekać, ładujemy dane z serwera.</p>
            </div>
        </template>
    </ClientOnly>
</template>