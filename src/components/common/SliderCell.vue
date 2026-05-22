<template>
  <div class="slider-cell">
    <div class="slider-labels">
      <span v-for="tick in ticks" :key="tick.value" class="tick">{{ tick.label }}</span>
    </div>
    <div class="slider-row">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="0.01"
        :value="modelValue"
        @input="onInput"
        @change="onChange"
        class="slider"
      />
      <span class="slider-value" :style="valueStyle">{{ snapped }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: -5 },
  max: { type: Number, default: 10 }
})

const emit = defineEmits(['update:modelValue'])
const bumping = ref(false)
const rawValue = ref(props.modelValue)

const ticks = computed(() => {
  const arr = []
  for (let i = props.min; i <= props.max; i++) {
    arr.push({ value: i, label: i })
  }
  return arr
})

const snapped = computed(() => Math.round(rawValue.value))

const valueStyle = computed(() => ({
  transform: bumping.value ? 'scale(1.25)' : 'scale(1)',
  color: snapped.value >= 3 ? 'var(--champion)' :
         snapped.value <= -3 ? 'var(--risk-red)' :
         'var(--gold)'
}))

function onInput(e) {
  rawValue.value = Number(e.target.value)
  bumping.value = true
  emit('update:modelValue', Number(e.target.value))
}

function onChange(e) {
  const v = Math.round(Number(e.target.value))
  rawValue.value = v
  emit('update:modelValue', v)
  setTimeout(() => { bumping.value = false }, 300)
}
</script>

<style scoped>
.slider-cell { width: 100%; }
.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: var(--text-secondary);
  margin-bottom: 2px;
  font-family: var(--font-mono);
}
.slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.slider {
  flex: 1;
  -webkit-appearance: none;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  outline: none;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--gold);
  cursor: pointer;
  border: 2px solid var(--bg-base);
  box-shadow: 0 0 8px rgba(226,176,74,0.4);
  transition: transform 0.15s;
}
.slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
.slider-value {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  min-width: 28px;
  text-align: center;
  transition: all 0.15s ease;
}
</style>
