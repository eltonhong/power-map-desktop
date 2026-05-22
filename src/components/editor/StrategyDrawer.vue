<template>
  <transition name="drawer-bg">
    <div v-if="visible" class="drawer-overlay" @click.self="close">
      <transition name="drawer-pnl">
        <div v-if="visible" class="drawer-panel">
          <div class="drawer-header">
            <h3>{{ selectedNode?.name || '未命名' }}</h3>
            <RoleBadge :role="selectedNode?.role_type" />
            <button class="close-btn" @click="close">×</button>
          </div>

          <div class="drawer-scores">
            <div class="score-item">
              <span class="score-label">权力</span>
              <span class="score-value power">{{ selectedNode?.power }} / 10</span>
            </div>
            <div class="score-item">
              <span class="score-label">态度</span>
              <span class="score-value" :class="attitudeClass">
                {{ attitudeDisplay }}
              </span>
            </div>
          </div>

          <div v-if="strategy" class="drawer-body">
            <div class="drawer-section">
              <h4 class="section-toggle" @click="toggle('def')">
                角色定义 {{ openSections.def ? '▾' : '▸' }}
              </h4>
              <p v-if="openSections.def" class="section-content">{{ strategy.definition }}</p>
            </div>

            <div class="drawer-section">
              <h4 class="section-toggle" @click="toggle('signals')">
                识别信号 {{ openSections.signals ? '▾' : '▸' }}
              </h4>
              <ul v-if="openSections.signals" class="section-content">
                <li v-for="s in strategy.signals" :key="s">{{ s }}</li>
              </ul>
            </div>

            <div class="drawer-section">
              <h4 class="section-toggle" @click="toggle('strategies')">
                核心策略 {{ openSections.strategies ? '▾' : '▸' }}
              </h4>
              <div v-if="openSections.strategies" class="section-content">
                <div v-for="(s, i) in strategy.strategies" :key="i" class="action-row">
                  <span class="action-num">{{ i + 1 }}</span>
                  <p>{{ s }}</p>
                  <button class="mini-copy" @click="copy(s)">📋</button>
                </div>
              </div>
            </div>

            <div class="drawer-section">
              <h4 class="section-toggle" @click="toggle('actions')">
                本周落地动作 {{ openSections.actions ? '▾' : '▸' }}
              </h4>
              <div v-if="openSections.actions" class="section-content">
                <div v-for="(a, i) in strategy.weeklyActions" :key="i" class="action-row">
                  <span class="action-num">{{ i + 1 }}</span>
                  <p>{{ a }}</p>
                  <button class="mini-copy" @click="copy(a)">📋</button>
                </div>
              </div>
            </div>

            <div class="drawer-section" v-if="strategy.crossCulture">
              <h4 class="section-toggle" @click="toggle('culture')">
                跨文化提醒 {{ openSections.culture ? '▾' : '▸' }}
              </h4>
              <p v-if="openSections.culture" class="section-content">{{ strategy.crossCulture }}</p>
            </div>

            <div class="drawer-section">
              <h4 class="section-toggle" @click="toggle('redLines')">
                避坑红线 {{ openSections.redLines ? '▾' : '▸' }}
              </h4>
              <ul v-if="openSections.redLines" class="section-content red-lines">
                <li v-for="r in strategy.redLines" :key="r">{{ r }}</li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useProjectStore } from '@/stores/project'
import { getStrategy } from '@/engine/strategy-matcher'
import RoleBadge from '@/components/common/RoleBadge.vue'

const store = useProjectStore()
const visible = ref(false)
const selectedId = ref(null)
const openSections = reactive({
  def: true,
  signals: false,
  strategies: true,
  actions: true,
  culture: false,
  redLines: false
})

const selectedNode = computed(() =>
  store.current?.nodes.find(n => n.id === selectedId.value)
)

const strategy = computed(() => {
  if (!selectedNode.value || !store.current) return null
  return getStrategy(selectedNode.value.role_type, store.current.scene)
})

const attitudeDisplay = computed(() => {
  const v = selectedNode.value?.attitude
  if (v === undefined || v === null) return '--'
  return v > 0 ? `+${v} / ±5` : `${v} / ±5`
})

const attitudeClass = computed(() => {
  const v = selectedNode.value?.attitude || 0
  return v >= 3 ? 'positive' : v <= -3 ? 'negative' : 'neutral'
})

function toggle(key) {
  openSections[key] = !openSections[key]
}

function open(nodeId) {
  selectedId.value = nodeId
  visible.value = true
}

function close() {
  visible.value = false
}

function copy(text) {
  navigator.clipboard.writeText(text)
  window.$toast?.('已复制', 'success')
}

defineExpose({ open, close })
</script>

<style scoped>
.drawer-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.drawer-panel {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 380px;
  background: var(--bg-glass);
  backdrop-filter: blur(var(--blur));
  border-left: 1px solid var(--border);
  padding: 20px;
  overflow-y: auto;
}
.drawer-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.drawer-header h3 {
  font-size: 16px;
  flex: 1;
}
.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 22px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
}
.close-btn:hover { color: var(--text-primary); }
.drawer-scores {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}
.score-item { display: flex; flex-direction: column; gap: 4px; }
.score-label { font-size: 11px; color: var(--text-secondary); }
.score-value {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 600;
}
.score-value.power { color: var(--gold); }
.score-value.positive { color: var(--champion); }
.score-value.negative { color: var(--risk-red); }
.score-value.neutral { color: var(--text-secondary); }

.drawer-body { display: flex; flex-direction: column; gap: 4px; }
.drawer-section {
  border-bottom: 1px solid var(--border);
  padding: 8px 0;
}
.section-toggle {
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 0;
  user-select: none;
  color: var(--text-primary);
  transition: color 0.15s;
}
.section-toggle:hover { color: var(--gold); }
.section-content {
  padding: 6px 0 6px 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-secondary);
}
.section-content li {
  margin-bottom: 4px;
}
.action-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 0;
}
.action-num {
  background: var(--gold);
  color: #000;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}
.action-row p { flex: 1; font-size: 13px; line-height: 1.6; }
.mini-copy {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  opacity: 0.4;
  padding: 2px;
  flex-shrink: 0;
  transition: opacity 0.15s;
}
.mini-copy:hover { opacity: 1; }

.red-lines { color: var(--risk-red); }

.drawer-bg-enter-active { transition: opacity 0.3s ease; }
.drawer-bg-leave-active { transition: opacity 0.2s ease; }
.drawer-bg-enter-from,
.drawer-bg-leave-to { opacity: 0; }

.drawer-pnl-enter-active {
  animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-pnl-leave-active {
  animation: slideInRight 0.25s ease reverse;
}
</style>
