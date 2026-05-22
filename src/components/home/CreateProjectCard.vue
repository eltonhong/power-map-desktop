<template>
  <div class="create-card" @click="$emit('create')">
    <div class="card-icon">{{ icon }}</div>
    <div class="card-title">{{ label }}</div>
    <div class="card-desc">{{ desc }}</div>
    <div class="card-action">+ 新建项目</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  scene: { type: String, required: true },
  label: { type: String, required: true }
})

defineEmits(['create'])

const icons = { internal: '🏢', ka: '🏭', agent: '🤝', job: '💼' }
const descs = {
  internal: '画自己公司的权力结构，找盟友、避背刺',
  ka: '画大客户决策链，识别Economic Buyer',
  agent: '画代理商内部格局，绑定Top Sales',
  job: '画目标公司权力版图，避坑决策'
}

const icon = computed(() => icons[props.scene])
const desc = computed(() => descs[props.scene])
</script>

<style scoped>
.create-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.25s ease;
  animation: fadeInUp 0.4s ease backwards;
}
.create-card:nth-child(1) { animation-delay: 0ms; }
.create-card:nth-child(2) { animation-delay: 80ms; }
.create-card:nth-child(3) { animation-delay: 160ms; }
.create-card:nth-child(4) { animation-delay: 240ms; }

.create-card:hover {
  transform: scale(1.02);
  border-color: var(--gold);
  box-shadow: 0 4px 24px rgba(226, 176, 74, 0.12);
}
.create-card:active {
  transform: scale(0.97);
  transition: transform 0.1s ease;
}
.card-icon {
  font-size: 32px;
  margin-bottom: 12px;
}
.card-title {
  font-family: var(--font-en);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-primary);
}
.card-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.5;
}
.card-action {
  font-size: 12px;
  color: var(--gold);
  font-weight: 500;
}
</style>
