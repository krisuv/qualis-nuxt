<script setup lang="ts">
import { MAX_PRICE } from 'constants/price.constants' 

/**
 * Pure-props numeric field.
 * Works exactly like your earlier TextInput, just locked to type="number".
 * Extra listeners/attrs (e.g. @input, required) are forwarded via `$attrs`.
 */
interface NumberInputProps {
  id: string
  label: string
  hint: string,

  /** optional constraints */
  min?: number
  max?: number
  step?: number
  size?: 'small' | 'medium'
}

withDefaults(defineProps<NumberInputProps>(), {
  value: 0,
  min: 0,
  max: MAX_PRICE,
  step: 10,
  size: 'medium',
})

const price = defineModel({ default: 0 });
</script>

<template>
  <div>
    <!-- top label -->
    <label :for="id" class="block font-bold mb-1 text-black-earth-800" :class="{'text-sm' : size === 'small'}">
      {{ label }}
    </label>

    <!-- numeric input -->
    <input
      type="number"
      :id="id"
      :name="id"
      :min="min"
      :max="max"
      :step="step"
      v-model="price"
      class="mb-1.5 w-full price-input"
      :class="{
        'py-1.5 pl-3 pr-1 text-xs': size === 'small',
      }"
      v-bind="$attrs"
    />

    <!-- helper text -->
    <p class="block text-sm">{{ hint }}</p>
  </div>
</template>

<style scoped>
input[type="number"] {
  /* 1. give the browser a brand tint */
  accent-color: var(--accent, #4f46e5);

  /* 2. optional: fine‑tune in Blink/WebKit */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    margin: 0;                 /* reduce gap */
    filter: brightness(1.25);  /* lighten on default state */
    cursor: pointer;
  }

  &:hover::-webkit-inner-spin-button,
  &:hover::-webkit-outer-spin-button {
    filter: brightness(1.4);   /* hover feedback */
  }
}
</style>
