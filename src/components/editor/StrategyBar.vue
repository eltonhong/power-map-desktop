<template>
  <div class="strategy-bar" v-if="strategy" @click="expanded = !expanded">
    <div class="bar-main">
      <span class="phase-light" :class="strategy.phaseLight"></span>
      <span class="phase-label">{{ strategy.phase }}</span>
      <span class="bar-summary">{{ strategy.summary }}</span>
      <span v-if="strategy.risk" class="bar-risk">{{ strategy.risk }}</span>
      <span class="expand-hint">{{ expanded ? '▲' : '▼' }}</span>
    </div>
    <transition name="expand">
      <div v-if="expanded" class="bar-detail">
        <p class="priority-action">{{ strategy.priority }}</p>
        <button class="copy-btn" @click.stop="copyText">📋 复制策略</button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '@/stores/project'
import { getStrategyBar } from '@/engine/diagnosis-engine'

const store = useProjectStore()
const expanded = ref(false)

const strategy = computed(() => {
  if (!store.current?.nodes?.length) return null
  return getStrategyBar(store.current.nodes)
})

function copyText() {
  if (!strategy.value) return
  const text = `${strategy.value.summary}\n优先动作：${strategy.value.priority}`
  navigator.clipboard.writeText(text)
  window.$toast?.('已复制', 'success')
}
</script>

<style scoped>
.strategy-bar {
  background: var(--bg-glass);
  backdrop-filter: blur(var(--blur));
  border-top: 1px solid var(--border);
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
  flex-shrink: 0;
}
.strategy-bar:hover {
  background: var(--overlay-hover);
}
.bar-main {
  display: flex;
  align-items: center;
  gap: 10px;
}
.phase-light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.phase-light.red {
  background: var(--risk-red);
  box-shadow: 0 0 6px var(--risk-red);
  animation: breatheRed 2s infinite;
}
.phase-light.yellow {
  background: var(--risk-yellow);
}
.phase-light.green {
  background: var(--risk-green);
}
.phase-label {
  font-family: var(--font-en);
  font-size: 12px;
  font-weight: 600;
  color: var(--gold);
  flex-shrink: 0;
}
.bar-summary {
  font-size: 13px;
  flex: 1;
}
.bar-risk {
  font-size: 12px;
  color: var(--risk-red);
  animation: breatheRed 2s infinite;
}
.expand-hint {
  font-size: 10px;
  color: var(--text-secondary);
  flex-shrink: 0;
}
.bar-detail {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
}
.priority-action {
  font-size: 13px;
  color: var(--gold);
  flex: 1;
}
.copy-btn {
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
  flex-shrink: 0;
}
.copy-btn:hover {
  background: rgba(255, 255, 255, 0.06);
}
.expand-enter-active {
  animation: fadeInDown 0.25s ease;
}
.expand-leave-active {
  animation: fadeInDown 0.2s ease reverse;
}
</style>
