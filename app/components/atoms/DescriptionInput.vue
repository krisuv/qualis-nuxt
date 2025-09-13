<script setup lang="ts">
interface TextareaInputProps {
  value: string;
  id: string;
  label: string;
  hint: string;
  rows?: number;
  required?: boolean;
}

withDefaults(defineProps<TextareaInputProps>(), {
  value: '',
  rows: 5,
  required: false
});

const emit = defineEmits<{
  (event: 'update:value', value: string): void
}>();

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:value', target.value);
}

</script>

<template>
  <div>
    <label :for="id" class="block font-bold mb-1 text-black-earth-800">{{ label }}{{ required ? '*' : '' }}</label>
    <textarea
      :value="value"
      @input="onInput"    
      :id="id"
      :name="id"
      :rows="rows"
      :required="required"
      class="mb-1.5 w-[100%]"
    />
    <p class="block text-sm">{{ hint }}</p>
  </div>
</template>
