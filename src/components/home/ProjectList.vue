<template>
  <div class="project-list">
    <h2 class="section-title">已有项目</h2>
    <div v-if="!projects || projects.length === 0" class="empty-state">
      <div class="empty-circle"></div>
      <p>还没有项目，点击上方卡片新建</p>
    </div>
    <div v-else class="list-grid">
      <ProjectCard
        v-for="(p, i) in projects"
        :key="p.id"
        :project="p"
        :style="{ animationDelay: i * 60 + 'ms' }"
        @open="$emit('open', p.id)"
        @copy="$emit('copy', p.id)"
        @delete="confirmDelete(p.id)"
      />
    </div>
  </div>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

defineProps({ projects: { type: Array, default: () => [] } })
const emit = defineEmits(['open', 'delete', 'copy'])

function confirmDelete(id) {
  if (confirm('确定删除这个项目？此操作不可撤销。')) {
    emit('delete', id)
  }
}
</script>

<style scoped>
.section-title {
  font-family: var(--font-en);
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  font-weight: 500;
}
.list-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--text-secondary);
  font-size: 13px;
}
.empty-circle {
  width: 48px;
  height: 48px;
  border: 2px dashed var(--border);
  border-radius: 50%;
  margin: 0 auto 16px;
  animation: breathe 2s ease-in-out infinite;
}
</style>
