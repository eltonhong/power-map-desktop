<template>
  <div class="six-actions">
    <h4>{{ cfg?.label }} · 画完干嘛 6件事</h4>
    <div class="actions-grid">
      <div
        v-for="item in store.current.checklist"
        :key="item.id"
        class="action-item"
        :class="{ done: item.done }"
        @click="item.done = !item.done"
      >
        <input
          type="checkbox"
          :checked="item.done"
          @click.stop
          @change="item.done = ($event.target).checked"
        />
        <span>{{ item.id }}. {{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()
const cfg = computed(() => store.SCENE_CONFIG[store.current?.scene])
</script>

<style scoped>
.six-actions {
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  padding: 10px 20px;
  flex-shrink: 0;
}
.six-actions h4 {
  font-family: var(--font-en);
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  font-weight: 500;
}
.actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}
.action-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.2s;
  border-radius: 4px;
}
.action-item:hover { color: var(--text-primary); }
.action-item.done span {
  text-decoration: line-through;
  color: var(--text-secondary);
}
.action-item input[type="checkbox"] {
  cursor: pointer;
  margin-top: 2px;
  flex-shrink: 0;
}
</style>
