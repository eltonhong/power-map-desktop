<template>
  <div class="six-actions">
    <div class="actions-header">
      <h4 class="actions-title">画完干嘛 · 6 件事</h4>
      <span class="actions-scene">{{ cfg?.label }}</span>
    </div>
    <div class="actions-grid">
      <div
        v-for="item in store.current.checklist"
        :key="item.id"
        class="action-card"
        :class="{ done: item.done }"
        @click="item.done = !item.done"
      >
        <div class="action-check">
          <span v-if="item.done" class="check-icon">✓</span>
          <span v-else class="check-num">{{ item.id }}</span>
        </div>
        <span class="action-text">{{ item.text }}</span>
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
  border-top: 2px solid var(--border-strong);
  padding: var(--space-lg) var(--space-xl);
  flex-shrink: 0;
}
.actions-header {
  display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-md);
}
.actions-title {
  font-size: var(--fs-subtitle); font-weight: 600; color: var(--text-primary);
}
.actions-scene {
  font-size: var(--fs-caption); color: var(--text-tertiary);
  background: var(--overlay-hover); padding: 2px 8px; border-radius: var(--radius-sm);
}
.actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-sm); }

.action-card {
  display: flex; align-items: flex-start; gap: var(--space-sm);
  background: var(--bg-elevated); border: 1px solid var(--border);
  border-radius: var(--radius-md); padding: var(--space-md);
  cursor: pointer; transition: all var(--transition-fast);
}
.action-card:hover { border-color: var(--border-strong); background: var(--overlay-hover); }
.action-card.done { opacity: 0.5; }
.action-card.done .action-text { text-decoration: line-through; color: var(--text-tertiary); }

.action-check { flex-shrink: 0; margin-top: 1px; }
.check-icon {
  display: flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--risk-green); color: #fff; font-size: var(--fs-tiny); font-weight: 700;
}
.check-num {
  display: flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; border-radius: 50%;
  border: 1px solid var(--border-strong); color: var(--text-tertiary);
  font-size: var(--fs-caption); font-family: var(--font-mono);
}
.action-text { font-size: var(--fs-small); line-height: 1.5; color: var(--text-secondary); }
</style>
