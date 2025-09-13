<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

interface TextInputProps {
  value: string;
  id: string;
  label: string;
  hint: string;
  type: InputTypeHTMLAttribute;
  min?: number;
  max?: number;
  required?: boolean;
}

withDefaults(defineProps<TextInputProps>(), {
  value: '',
  min: 3,
  max: 100,
  required: false
})

const emit = defineEmits<{
  (event: 'update:value', value: string): void
}>();

function onBeforeInput(event: Event): void {
  // If this is a phone field (type="tel"), block non-digit keystrokes
  const target = event.target as HTMLInputElement;
  if (target.type === 'tel') {
    // event.data is the inserted character(s) for most inputTypes
    const data = (event as InputEvent).data;
    // Allow deletions/navigation (data can be null for deletions, etc.)
    if (data && /\D/.test(data)) {
      event.preventDefault();
    }
  }
}

function onPaste(event: Event): void {
  const inputEl = event.target as HTMLInputElement;
  if (inputEl.type === 'tel') {
    event.preventDefault();
    const pasted = (event as ClipboardEvent).clipboardData?.getData('text') || '';
    // Keep only digits, limit to 9
    const digits = pasted.replace(/\D/g, '').slice(0, 9 - inputEl.value.length);
    if (digits) {
      // Insert at cursor position:
      const { selectionStart, selectionEnd } = inputEl;
      const before = inputEl.value.slice(0, selectionStart ?? 0);
      const after = inputEl.value.slice(selectionEnd ?? 0);
      const newVal = (before + digits + after).replace(/\D/g, '').slice(0, 9);
      inputEl.value = newVal;
      emit('update:value', newVal);
      // Move cursor after inserted digits
      const pos = (before + digits).length;
      inputEl.setSelectionRange(pos, pos);
    }
  }
}

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement;

  let value = target.value;
  if(target.type === 'tel'){
    value = target.value.replace(/\D/g, '').slice(0, 9);
  }

  emit('update:value', value);
}

</script>

<template>
  <div>
    <label :for="id" class="block font-bold mb-1 text-black-earth-800">{{ label }}{{ required ? '*' : '' }}</label>
    <input
    :value="value"
    @input="onInput" 
    @beforeinput="onBeforeInput"
    @paste="onPaste"
    :type="type" 
    :id="id" 
    :name="id" 
    :required="required" 
    :min="min" 
    :max="max" 
    class="mb-1.5 w-[100%]">
    <p class="block text-sm">{{ hint }}</p>
  </div>
</template>