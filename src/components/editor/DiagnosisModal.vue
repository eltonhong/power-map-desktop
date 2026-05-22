<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-panel">
        <h2>全局诊断</h2>

        <div class="health-section">
          <div class="health-score" :style="{ color: result.levelColor }">
            {{ displayScore }}
          </div>
          <div class="health-label">健康度评分</div>
          <div class="risk-level" :class="result.level">
            {{ result.level === 'red' ? '🔴 高风险' : result.level === 'yellow' ? '🟡 中等风险' : '🟢 结构健康' }}
          </div>
          <div class="phase-tag">{{ result.phase }}</div>
        </div>

        <div class="counts-grid">
          <div class="count-item">
            <strong>{{ result.counts.champions }}</strong>
            <span>Champion</span>
          </div>
          <div class="count-item">
            <strong>{{ result.counts.blockers }}</strong>
            <span>Blocker</span>
          </div>
          <div class="count-item">
            <strong>{{ result.counts.movers }}</strong>
            <span>Mover</span>
          </div>
          <div class="count-item">
            <strong>{{ result.counts.bystanders }}</strong>
            <span>Bystander</span>
          </div>
          <div class="count-item danger">
            <strong>{{ result.counts.highPowerBlockers }}</strong>
            <span>高权力Blocker</span>
          </div>
          <div class="count-item safe">
            <strong>{{ result.counts.strongChampions }}</strong>
            <span>强Champion</span>
          </div>
        </div>

        <div class="suggestions">
          <h4>优先执行建议</h4>
          <div v-for="(s, i) in result.suggestions" :key="i" class="suggestion-item">
            <span class="sug-num">{{ i + 1 }}</span>
            <span>{{ s }}</span>
            <button class="mini-copy" @click="copy(s)">📋</button>
          </div>
        </div>

        <div class="modal-actions">
          <button class="export-btn" @click="exportResult">导出诊断文本</button>
          <button class="close-btn" @click="$emit('close')">关闭</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useProjectStore } from '@/stores/project'
import { diagnose } from '@/engine/diagnosis-engine'

defineEmits(['close'])
const store = useProjectStore()
const displayScore = ref(0)

const result = computed(() => diagnose(store.current?.nodes || []))

// Animate score counter
watch(
  () => result.value.health,
  (target) => {
    const start = displayScore.value
    const diff = target - start
    const duration = 800
    const startTime = Date.now()

    function step() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      displayScore.value = Math.round(start + diff * eased)
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  },
  { immediate: true }
)

function copy(text) {
  navigator.clipboard.writeText(text)
  window.$toast?.('已复制', 'success')
}

function exportResult() {
  const r = result.value
  const lines = [
    `权力地图诊断报告 - ${new Date().toLocaleDateString()}`,
    `健康度评分: ${r.health}/100 [${r.level === 'red' ? '高风险' : r.level === 'yellow' ? '中等风险' : '结构健康'}]`,
    `当前阶段: ${r.phase}`,
    `Champion: ${r.counts.champions} | Blocker: ${r.counts.blockers} | Mover: ${r.counts.movers} | Bystander: ${r.counts.bystanders}`,
    `高权力Blocker: ${r.counts.highPowerBlockers} | 强Champion: ${r.counts.strongChampions}`,
    '',
    '优先执行建议:',
    ...r.suggestions.map((s, i) => `${i + 1}. ${s}`)
  ]
  const text = lines.join('\n')
  navigator.clipboard.writeText(text)
  window.$toast?.('诊断结果已复制到剪贴板', 'success')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-panel {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  width: 500px;
  max-height: 85vh;
  overflow-y: auto;
  animation: fadeInScale 0.3s ease;
}
.modal-panel h2 {
  font-family: var(--font-en);
  font-size: 18px;
  margin-bottom: 24px;
}
.health-section {
  text-align: center;
  margin-bottom: 24px;
}
.health-score {
  font-family: var(--font-mono);
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
}
.health-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}
.risk-level {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
}
.phase-tag {
  display: inline-block;
  margin-top: 6px;
  padding: 2px 12px;
  border: 1px solid var(--gold);
  border-radius: 12px;
  font-size: 12px;
  color: var(--gold);
}
.counts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 24px;
}
.count-item {
  background: var(--overlay-hover);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}
.count-item strong {
  font-family: var(--font-mono);
  font-size: 20px;
  display: block;
}
.count-item span {
  font-size: 11px;
  color: var(--text-secondary);
}
.count-item.danger strong { color: var(--risk-red); }
.count-item.safe strong { color: var(--risk-green); }
.suggestions { margin-bottom: 20px; }
.suggestions h4 {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}
.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 0;
  font-size: 13px;
  line-height: 1.6;
}
.sug-num {
  background: var(--gold);
  color: #000;
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}
.mini-copy {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s;
}
.mini-copy:hover { opacity: 1; }
.modal-actions {
  display: flex;
  gap: 10px;
}
.export-btn, .close-btn {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.export-btn {
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold);
}
.export-btn:hover { background: rgba(226, 176, 74, 0.1); }
.close-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
}
.close-btn:hover { background: rgba(255, 255, 255, 0.04); }
</style>
