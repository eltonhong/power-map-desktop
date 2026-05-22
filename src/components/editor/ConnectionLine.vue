<template>
  <div class="connection-manager">
    <h4>关系连线管理</h4>
    <div v-if="connections.length === 0" class="empty">暂无连线，右键图谱节点添加连线</div>
    <div v-for="c in connections" :key="c.from + '-' + c.to" class="conn-item">
      <span class="conn-from">{{ getNodeName(c.from) }}</span>
      <span class="conn-arrow">→</span>
      <span class="conn-to">{{ getNodeName(c.to) }}</span>
      <span class="conn-type" :style="{ color: typeColor(c.type) }">{{ typeLabel(c.type) }}</span>
      <button class="conn-del" @click="removeConn(c)">×</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()

const connections = computed(() => store.current?.connections || [])

function getNodeName(id) {
  return store.current?.nodes.find(n => n.id === id)?.name || '?'
}

function typeLabel(t) {
  const labels = { ally: '盟友', oppose: '对立', faction: '派系', hierarchy: '上下级' }
  return labels[t] || t
}

function typeColor(t) {
  const colors = { ally: '#22c55e', oppose: '#ff4d4f', faction: '#3b82f6', hierarchy: '#6b7280' }
  return colors[t] || '#6b7280'
}

function removeConn(c) {
  store.current.connections = store.current.connections.filter(
    x => !(x.from === c.from && x.to === c.to)
  )
}
</script>

<style scoped>
.connection-manager {
  padding: 12px;
}
.connection-manager h4 {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}
.empty {
  font-size: 12px;
  color: var(--text-secondary);
  padding: 8px 0;
}
.conn-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  font-size: 12px;
}
.conn-arrow { color: var(--text-secondary); }
.conn-type {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 3px;
  background: rgba(255,255,255,0.05);
}
.conn-del {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  padding: 0 4px;
  margin-left: auto;
}
.conn-del:hover { color: var(--risk-red); }
</style>
