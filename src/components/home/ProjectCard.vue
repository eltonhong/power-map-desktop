<template>
  <div class="project-card" @click="$emit('open')">
    <div class="card-left">
      <div class="card-name">{{ project.name }}</div>
      <div class="card-meta">
        <span class="scene-tag">{{ sceneLabel }}</span>
        <span>{{ formattedDate }}</span>
      </div>
    </div>
    <div class="card-right" @click.stop>
      <button class="card-btn" @click="$emit('copy')" title="复制项目">复制</button>
      <button class="card-btn danger" @click="$emit('delete')" title="删除项目">删除</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '@/stores/project'

const props = defineProps({ project: { type: Object, required: true } })
defineEmits(['open', 'copy', 'delete'])

const { SCENE_CONFIG } = useProjectStore()

const sceneLabel = computed(() => SCENE_CONFIG[props.project.scene]?.label || props.project.scene)
const formattedDate = computed(() => {
  const d = new Date(props.project.createdAt)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})
</script>

<style scoped>
.project-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  animation: fadeInUp 0.3s ease backwards;
}
.project-card:hover {
  transform: scale(1.01);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
.card-left { flex: 1; }
.card-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}
.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}
.scene-tag {
  background: rgba(255, 255, 255, 0.06);
  padding: 1px 8px;
  border-radius: 4px;
  font-size: 11px;
}
.card-right {
  display: flex;
  gap: 8px;
}
.card-btn {
  background: transparent;
  border: 1px solid var(--border);
  cursor: pointer;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 6px;
  color: var(--text-secondary);
  transition: all 0.2s;
}
.card-btn:hover {
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
}
.card-btn.danger:hover {
  color: var(--risk-red);
  border-color: var(--risk-red);
  background: rgba(255, 77, 79, 0.08);
}
</style>
