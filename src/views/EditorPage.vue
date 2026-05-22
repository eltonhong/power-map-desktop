<template>
  <div class="editor" v-if="store.current">
    <header class="editor-topbar">
      <div class="topbar-left">
        <button class="topbar-back" @click="goBack">←</button>
        <div class="topbar-title">
          <span class="title-text">{{ store.current.name }}</span>
          <span class="title-scene">{{ cfg?.label }}</span>
        </div>
        <span class="save-indicator" :class="{ saved: saveStatus === 'saved' }">
          {{ saveStatus === 'saved' ? '✓ 已保存' : saveStatus === 'saving' ? '···' : '● 未保存' }}
        </span>
      </div>
      <div class="topbar-actions">
        <button class="topbar-btn" @click="showDiagnosis = true">诊断</button>
        <button class="topbar-btn" @click="handleExport">导出PNG</button>
        <button class="topbar-btn primary" @click="handleSave">保存</button>
      </div>
    </header>

    <div class="editor-body">
      <TablePanel
        class="panel-left"
        @selectNode="onSelectNode"
        @hoverNode="onHoverNode"
      />
      <div class="panel-center">
        <ChartPanel ref="chartRef" :highlightId="hoveredNodeId" @nodeClick="onSelectNode" />
        <StrategyBar />
      </div>
    </div>

    <SixActionsPanel />
    <StrategyDrawer ref="drawerRef" />
    <DiagnosisModal v-if="showDiagnosis" @close="showDiagnosis = false" />
  </div>
  <div v-else class="loading">加载中...</div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import TablePanel from '@/components/editor/TablePanel.vue'
import ChartPanel from '@/components/editor/ChartPanel.vue'
import StrategyBar from '@/components/editor/StrategyBar.vue'
import StrategyDrawer from '@/components/editor/StrategyDrawer.vue'
import SixActionsPanel from '@/components/editor/SixActionsPanel.vue'
import DiagnosisModal from '@/components/editor/DiagnosisModal.vue'

const route = useRoute()
const router = useRouter()
const store = useProjectStore()

const saveStatus = ref('saved')
const showDiagnosis = ref(false)
const chartRef = ref(null)
const drawerRef = ref(null)
const hoveredNodeId = ref(null)

const cfg = computed(() => store.SCENE_CONFIG[store.current?.scene])

onMounted(async () => {
  await store.loadProject(route.params.id)
  if (!store.current) { router.push('/'); return }
  saveStatus.value = 'saved'
})

watch(() => store.current?.nodes, () => {
  saveStatus.value = 'dirty'
}, { deep: true })

async function handleSave() {
  saveStatus.value = 'saving'
  await store.saveProject()
  saveStatus.value = 'saved'
}
function handleExport() { chartRef.value?.exportPNG() }
function goBack() {
  if (saveStatus.value === 'dirty') handleSave()
  router.push('/')
}
function onSelectNode(id) { drawerRef.value?.open(id) }
function onHoverNode(id) { hoveredNodeId.value = id }
</script>

<style scoped>
.editor { height: 100%; display: flex; flex-direction: column; background: var(--bg-base); }

/* Top Bar */
.editor-topbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: var(--space-sm) var(--space-xl); background: var(--bg-surface);
  border-bottom: 1px solid var(--border); flex-shrink: 0; -webkit-app-region: drag;
}
.topbar-left { display: flex; align-items: center; gap: var(--space-md); }
.topbar-back {
  background: none; border: none; color: var(--text-secondary); font-size: var(--fs-heading);
  cursor: pointer; padding: 2px 6px; border-radius: var(--radius-sm);
  -webkit-app-region: no-drag;
}
.topbar-back:hover { color: var(--text-primary); background: var(--overlay-hover); }
.topbar-title { display: flex; align-items: center; gap: var(--space-sm); }
.title-text { font-size: var(--fs-subtitle); font-weight: 600; color: var(--text-primary); }
.title-scene {
  font-size: var(--fs-caption); color: var(--gold); background: rgba(226,176,74,0.1);
  padding: 1px 8px; border-radius: var(--radius-sm);
}
.save-indicator { font-size: var(--fs-caption); color: var(--text-tertiary); font-family: var(--font-mono); }
.save-indicator.saved { color: var(--risk-green); }

.topbar-actions { display: flex; gap: var(--space-sm); -webkit-app-region: no-drag; }
.topbar-btn {
  padding: 6px 16px; border: 1px solid var(--border); border-radius: var(--radius-md);
  background: transparent; color: var(--text-primary); font-size: var(--fs-small);
  cursor: pointer; transition: all var(--transition-fast); height: var(--ctrl-height-sm);
}
.topbar-btn:hover { background: var(--overlay-hover); border-color: var(--border-strong); }
.topbar-btn.primary { background: var(--gold); color: #000; border-color: var(--gold); font-weight: 600; }
.topbar-btn.primary:hover { opacity: 0.9; }

/* Body */
.editor-body { flex: 1; display: flex; overflow: hidden; min-height: 0; }
.panel-left { width: 360px; min-width: 360px; }
.panel-center { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }

.loading { height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); font-size: var(--fs-body); }
</style>
