<template>
  <span class="role-badge" :style="{ background: bg }">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { ROLE_COLORS, ROLE_LABELS } from '@/engine/role-classifier'

const props = defineProps({
  role: { type: String, default: '' }
})

const bg = computed(() => ROLE_COLORS[props.role] || 'var(--bystander)')
const label = computed(() => ROLE_LABELS[props.role] || '未分类')
</script>

<style scoped>
.role-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  transition: background 0.3s ease;
  font-family: var(--font-en);
  color: #fff;
  letter-spacing: 0.5px;
}
</style>
