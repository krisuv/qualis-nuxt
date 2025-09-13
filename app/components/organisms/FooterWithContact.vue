<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline';
import { PhoneIcon } from '@heroicons/vue/24/solid';
import SocialLink from '../atoms/SocialLink.vue'
import InstagramIcon from '../atoms/InstagramIcon.vue'
</script>

<template>
  <footer class="bg-light-beige py-4 px-8">
    <p class="font-playfair text-4xl text-black-earth mb-5 font-black">Qualis</p>
    <p class="font-semibold mb-3">Piotr Domański</p>
    <address class="text-xs">70-731, ul 3-maja, Pyrzyce</address>

    <dl class=" flex flex-col gap-5 my-6 text-xs">
      <div>
        <dt class="visually-hidden">E-mail</dt>
        <dd class="flex gap-4 items-center">
          <SocialLink :icon="EnvelopeIcon" />
          <a href="mailto:qualis@gmail.com" class="hover:underline">qualis@gmail.com</a>
        </dd>
      </div>

      <div>
        <dt class="visually-hidden">Numer telefonu</dt>
        <dd class="flex gap-4 items-center">
          <SocialLink :icon="PhoneIcon" />
            <a href="tel:+48601707703" class="hover:underline">(+48) 601 707 703</a>
        </dd>
      </div>

      <div>
        <dt class="visually-hidden">instagram</dt>
        <dd class="flex gap-4 items-center">
          <InstagramIcon />
           <a href="https://www.instagram.com/qualis_meble" target="_blank" rel="noopener noreferrer" class="hover:underline">
            @qualis_meble
          </a>
        </dd>
      </div>
    </dl>
    
    <small class="text-center">Qualis &copy; 2025 Wszelkie prawa zastrzeżone</small>
  </footer>
</template>
