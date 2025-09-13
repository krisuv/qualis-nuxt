<script setup lang="ts">
import type { Component } from 'vue'

interface SocialLinkProps {
   icon: Component;
}

defineProps<SocialLinkProps>()
</script>

<template>
  <component :is="icon" class="border-2 size-8.5 rounded-full bg-black-earth text-light-beige p-1" />
</template>