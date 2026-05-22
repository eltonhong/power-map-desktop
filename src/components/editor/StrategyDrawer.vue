<template>
  <transition name="drawer-bg">
    <div v-if="visible" class="drawer-overlay" @click.self="close">
      <transition name="drawer-pnl">
        <div v-if="visible" class="drawer-panel">
          <!-- Header -->
          <div class="drawer-header">
            <div class="header-info">
              <span class="header-role-dot" :style="{ background: roleDotColor }"></span>
              <h3 class="header-name">{{ selectedNode?.name || '未命名' }}</h3>
            </div>
            <div class="header-meta">
              <RoleBadge :role="selectedNode?.role_type" />
              <span class="header-position" v-if="selectedNode?.position">{{ selectedNode?.position }}</span>
            </div>
            <button class="close-btn" @click="close">×</button>
          </div>

          <!-- Score bars -->
          <div class="score-row">
            <div class="score-bar">
              <span class="score-label">权力</span>
              <div class="score-track"><div class="score-fill power" :style="{ width: (selectedNode?.power||0)*10 + '%' }"></div></div>
              <span class="score-num">{{ selectedNode?.power }}<small>/10</small></span>
            </div>
            <div class="score-bar">
              <span class="score-label">态度</span>
              <div class="score-track"><div class="score-fill" :class="attitudeFillClass" :style="{ width: ((selectedNode?.attitude||0)+5)*10 + '%' }"></div></div>
              <span class="score-num" :class="attitudeTextClass">{{ attitudeSign }}{{ Math.abs(selectedNode?.attitude||0) }}<small>/±5</small></span>
            </div>
          </div>

          <div v-if="strategy" class="drawer-body">
            <!-- Definition -->
            <section class="drawer-block">
              <h4 class="block-title">角色定义</h4>
              <p class="block-text">{{ strategy.definition }}</p>
            </section>

            <div class="block-divider"></div>

            <!-- Signals -->
            <section class="drawer-block">
              <h4 class="block-title">识别信号</h4>
              <ul class="signal-list">
                <li v-for="s in strategy.signals" :key="s" class="signal-item">
                  <span class="signal-dot"></span>
                  <span>{{ s }}</span>
                </li>
              </ul>
            </section>

            <div class="block-divider"></div>

            <!-- Core Strategies - SMART format -->
            <section class="drawer-block">
              <h4 class="block-title">核心策略 · SMART 框架</h4>
              <div v-for="(s, i) in strategy.strategies" :key="i" class="smart-card">
                <div class="smart-label">策略 {{ i + 1 }}</div>
                <div class="smart-content" v-html="renderSmartText(s)"></div>
                <button class="smart-copy" @click="copy(s)">一键复制</button>
              </div>
            </section>

            <div class="block-divider"></div>

            <!-- Weekly Actions -->
            <section class="drawer-block">
              <h4 class="block-title">本周落地动作</h4>
              <div v-for="(a, i) in strategy.weeklyActions" :key="i" class="action-card">
                <div class="action-num">{{ i + 1 }}</div>
                <p class="action-text">{{ a }}</p>
                <button class="action-copy" @click="copy(a)">复制</button>
              </div>
            </section>

            <div class="block-divider" v-if="strategy.crossCulture"></div>

            <!-- Cross-Culture -->
            <section class="drawer-block" v-if="strategy.crossCulture">
              <h4 class="block-title">跨文化提醒</h4>
              <div class="culture-text" v-html="renderedCulture"></div>
            </section>

            <div class="block-divider"></div>

            <!-- Red Lines -->
            <section class="drawer-block red">
              <h4 class="block-title red-title">避坑红线</h4>
              <ul class="redline-list">
                <li v-for="r in strategy.redLines" :key="r" class="redline-item">
                  <span class="redline-icon">⚠</span>
                  <span>{{ r }}</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '@/stores/project'
import { getStrategy } from '@/engine/strategy-matcher'
import { ROLE_COLORS } from '@/engine/role-classifier'
import RoleBadge from '@/components/common/RoleBadge.vue'

const store = useProjectStore()
const visible = ref(false)
const selectedId = ref(null)

const selectedNode = computed(() =>
  store.current?.nodes.find(n => n.id === selectedId.value)
)
const strategy = computed(() => {
  if (!selectedNode.value || !store.current) return null
  return getStrategy(selectedNode.value.role_type, store.current.scene)
})

const roleDotColor = computed(() => ROLE_COLORS[selectedNode.value?.role_type] || 'var(--bystander)')
const attitudeSign = computed(() => (selectedNode.value?.attitude || 0) > 0 ? '+' : '')
const attitudeFillClass = computed(() => {
  const v = selectedNode.value?.attitude || 0
  return v >= 3 ? 'positive' : v <= -3 ? 'negative' : 'neutral'
})
const attitudeTextClass = computed(() => {
  const v = selectedNode.value?.attitude || 0
  return v >= 3 ? 'text-positive' : v <= -3 ? 'text-negative' : 'text-neutral'
})

const renderedCulture = computed(() => {
  if (!strategy.value?.crossCulture) return ''
  return strategy.value.crossCulture
    .replace(/\n\n/g, '</p><p class="culture-p">')
    .replace(/\n- /g, '<br>• ')
    .replace(/^/, '<p class="culture-p">')
    .replace(/$/, '</p>')
})

function renderSmartText(text) {
  return text
    .replace(/【(.+?)】/g, '<strong class="smart-tag">$1</strong>')
    .replace(/\n\n/g, '</p><p class="smart-p">')
    .replace(/\n(\d)\./g, '<br><span class="smart-num">$1.</span>')
    .replace(/\n·/g, '<br><span class="smart-bullet">·</span>')
    .replace(/\n-/g, '<br><span class="smart-dash">—</span>')
    .replace(/^/, '<p class="smart-p">')
    .replace(/$/, '</p>')
}

function open(nodeId) {
  selectedId.value = nodeId
  visible.value = true
}
function close() { visible.value = false }
function copy(text) {
  navigator.clipboard.writeText(text)
  window.$toast?.('已复制', 'success')
}

defineExpose({ open, close })
</script>

<style scoped>
/* ---- Overlay ---- */
.drawer-overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.55); z-index: 100;
}

/* ---- Panel ---- */
.drawer-panel {
  position: absolute; right: 0; top: 0; bottom: 0; width: 440px;
  background: var(--bg-glass); backdrop-filter: blur(20px);
  border-left: 1px solid var(--border-strong); box-shadow: var(--shadow-lg);
  display: flex; flex-direction: column; overflow: hidden;
}

/* ---- Header ---- */
.drawer-header {
  padding: 20px 24px 16px; border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.header-info { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.header-role-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.header-name { font-size: 18px; font-weight: 700; color: var(--text-primary); }
.header-meta { display: flex; align-items: center; gap: 10px; }
.header-position { font-size: 13px; color: var(--text-secondary); }
.close-btn {
  position: absolute; top: 16px; right: 20px;
  background: none; border: none; color: var(--text-tertiary);
  font-size: 24px; cursor: pointer; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-sm); transition: all var(--transition-fast);
}
.close-btn:hover { color: var(--text-primary); background: var(--overlay-hover); }

/* ---- Scores ---- */
.score-row { display: flex; gap: 16px; padding: 16px 24px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
.score-bar { flex: 1; display: flex; align-items: center; gap: 10px; }
.score-label { font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 1px; width: 28px; }
.score-track { flex: 1; height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
.score-fill { height: 100%; border-radius: 3px; transition: width 0.4s ease; }
.score-fill.power { background: var(--gold); }
.score-fill.positive { background: var(--champion); }
.score-fill.negative { background: var(--risk-red); }
.score-fill.neutral { background: var(--text-tertiary); }
.score-num { font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: var(--gold); min-width: 50px; text-align: right; }
.score-num small { font-size: 11px; font-weight: 400; color: var(--text-tertiary); }
.score-num.text-positive { color: var(--champion); }
.score-num.text-negative { color: var(--risk-red); }
.score-num.text-neutral { color: var(--text-tertiary); }

/* ---- Body ---- */
.drawer-body { flex: 1; overflow-y: auto; padding: 0 24px 32px; }

/* ---- Blocks ---- */
.drawer-block { padding: 20px 0; }
.block-divider { height: 1px; background: var(--border); margin: 0; }
.block-title {
  font-size: 13px; font-weight: 700; color: var(--gold); text-transform: uppercase;
  letter-spacing: 1.5px; margin-bottom: 14px;
}
.block-text { font-size: 14px; line-height: 1.85; color: var(--text-primary); }

/* ---- Signals ---- */
.signal-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.signal-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; line-height: 1.7; color: var(--text-secondary); }
.signal-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); margin-top: 8px; flex-shrink: 0; }

/* ---- SMART Cards ---- */
.smart-card {
  background: var(--bg-elevated); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 18px; margin-bottom: 14px;
}
.smart-label {
  font-size: 11px; font-weight: 700; color: var(--gold); text-transform: uppercase;
  letter-spacing: 1px; margin-bottom: 10px;
}
.smart-content { font-size: 13px; line-height: 1.9; color: var(--text-secondary); }
.smart-content :deep(.smart-p) { margin-bottom: 10px; }
.smart-content :deep(.smart-tag) {
  display: block; font-size: 13px; font-weight: 700; color: var(--text-primary);
  margin: 12px 0 6px; padding-left: 8px; border-left: 3px solid var(--gold);
}
.smart-content :deep(.smart-num) { font-weight: 600; color: var(--gold); }
.smart-content :deep(.smart-bullet) { color: var(--gold); margin-right: 4px; }
.smart-content :deep(.smart-dash) { color: var(--text-tertiary); margin-right: 4px; }
.smart-copy {
  margin-top: 12px; padding: 6px 16px; border: 1px solid var(--border);
  border-radius: var(--radius-md); background: transparent; color: var(--gold);
  font-size: 12px; cursor: pointer; transition: all var(--transition-fast);
}
.smart-copy:hover { background: rgba(226,176,74,0.08); border-color: var(--gold); }

/* ---- Action Cards ---- */
.action-card {
  display: flex; align-items: flex-start; gap: 12px;
  background: var(--bg-elevated); border: 1px solid var(--border);
  border-radius: var(--radius-md); padding: 14px; margin-bottom: 8px;
}
.action-num {
  width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
  background: var(--gold); color: #000; font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; margin-top: 2px;
}
.action-text { flex: 1; font-size: 13px; line-height: 1.8; color: var(--text-secondary); }
.action-copy {
  padding: 4px 10px; border: 1px solid var(--border); border-radius: var(--radius-sm);
  background: transparent; color: var(--text-tertiary); font-size: 11px; cursor: pointer;
  flex-shrink: 0; transition: all var(--transition-fast);
}
.action-copy:hover { color: var(--gold); border-color: var(--gold); }

/* ---- Culture ---- */
.culture-text { font-size: 13px; line-height: 1.9; color: var(--text-secondary); }
.culture-text :deep(.culture-p) { margin-bottom: 10px; }

/* ---- Redlines ---- */
.drawer-block.red { padding-bottom: 24px; }
.red-title { color: var(--risk-red) !important; }
.redline-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.redline-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; line-height: 1.7; color: var(--risk-red); }
.redline-icon { flex-shrink: 0; margin-top: 1px; }

/* ---- Transitions ---- */
.drawer-bg-enter-active { transition: opacity 0.3s ease; }
.drawer-bg-leave-active { transition: opacity 0.25s ease; }
.drawer-bg-enter-from, .drawer-bg-leave-to { opacity: 0; }
.drawer-pnl-enter-active { animation: slideInRight 0.35s cubic-bezier(0.16,1,0.3,1); }
.drawer-pnl-leave-active { animation: slideInRight 0.25s ease reverse; }
</style>
