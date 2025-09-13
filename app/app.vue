<script setup lang="ts">
import TopHeader from './components/organisms/TopHeader.vue'
import FooterWithContact from './components/organisms/FooterWithContact.vue'
</script>

<template>
  <NuxtRouteAnnouncer />
  <TopHeader />
  <NuxtPage />
  <FooterWithContact />
</template>