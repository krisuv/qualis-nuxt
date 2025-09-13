<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import PriceInput from './PriceInput.vue';

interface PriceRangeInputProps {
  /** id/name prefix – e.g. "price" → "price-min", "price-max" */
  id: string;
  label: string;
  hint: string;

  /** hard bounds for both thumbs / fields */
  min?: number;
  max?: number;
  step?: number;

  onChangeMin: (value: number) => void;
  onChangeMax: (value: number) => void;

  /** v-model two-element tuple: [lower, upper] */
  modelValue?: [number, number];

  /** show the numeric inputs under the slider? */
  showFields?: boolean;
}

const props = withDefaults(defineProps<PriceRangeInputProps>(), {
  min: 0,
  max: 10_000,
  step: 50,
  modelValue: () => [0, 10_000],
  showFields: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: [number, number]): void;
}>();

/* local mirrors of the tuple */
const lower = ref(props.modelValue[0]);
const upper = ref(props.modelValue[1]);

/* clamp & swap helper */
function normalise() {
  lower.value = Math.max(props.min, Math.min(lower.value, props.max));
  upper.value = Math.max(props.min, Math.min(upper.value, props.max));
  if (lower.value > upper.value) [lower.value, upper.value] = [upper.value, lower.value];
}

/* parent → local sync */
watch(
  () => props.modelValue,
  ([lo, hi]) => {
    lower.value = lo;
    upper.value = hi;
  },
);

/* local → parent sync */
watch([lower, upper], () => {
  normalise();
  emit('update:modelValue', [lower.value, upper.value]);
});

/* coloured-track width */
const percentage = (v: number) => ((v - props.min) / (props.max - props.min)) * 100;
const leftPercentage  = computed(() => percentage(lower.value));
const rightPercentage = computed(() => percentage(upper.value));

</script>

<template>
  <div>
    <label :for="`${id}-min`" id="`${id}-min`" class="block font-bold mb-1 text-black-earth-800">
      {{ label }}
    </label>

    <div class="relative h-6">
      <div class="absolute top-1/2 w-full h-[2px] -translate-y-1/2 bg-black-earth-300 rounded" />
      <div
        class="absolute top-1/2 h-[2px] -translate-y-1/2 bg-black-earth-700 rounded"
        :style="{ left: leftPercentage + '%', right: 100 - rightPercentage + '%' }"
      />

      <input
        tabindex="-1"
        type="range"
        class="range-thumb px-0 border-none"
        :id="`${id}-min`"
        :value="lower"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        v-model.number="lower"
        :aria-labelledby="`${id}-label`"
      />
      <input
        tabindex="-1"
        type="range"
        class="range-thumb px-0 border-none"
        :id="`${id}-max`"
        :value="upper"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        v-model.number="upper"
        :aria-labelledby="`${id}-label`"
      />
    </div>

    
    <!-- live values -->
    <div class="flex justify-between mt-1 text-base font-medium text-black-earth-700">
      <span aria-live="polite">{{ lower }} zł</span>
      <span aria-live="polite">{{ upper }} zł</span>
    </div>
    
    <!-- helper text -->
    <p class="block text-sm mt-1">{{ hint }}</p>
    <!-- OPTIONAL NUMBER FIELDS -->
    <div v-if="props.showFields" class="flex gap-4 mt-2">
      <PriceInput v-model.number="lower" hint="Min" label="Min" id="min" size="small" />
      <PriceInput v-model.number="upper" hint="Max" label="Max" id="max" size="small" />
    </div>
  </div>
</template>

<style scoped>
.range-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
}

.range-thumb::-webkit-slider-thumb {
  pointer-events: auto;
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #654c2c;        
  cursor: pointer;
  border: 2px solid #f5f1ec; 
}

.range-thumb::-moz-range-thumb {
  pointer-events: auto;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #654c2c;
  cursor: pointer;
  border: 2px solid #f5f1ec;
}
</style>
