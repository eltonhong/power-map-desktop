<template>
  <div class="editor" v-if="store.current">
    <AppHeader :title="store.current.name" back @back="goBack">
      <span class="save-indicator" :class="{ saved: saveStatus === 'saved' }">
        {{ saveStatus === 'saved' ? '✓ 已保存' : saveStatus === 'saving' ? '... 保存中' : '● 未保存' }}
      </span>
      <button class="toolbar-btn" @click="handleSave">保存</button>
      <button class="toolbar-btn" @click="handleExport">导出PNG</button>
      <button class="toolbar-btn" @click="showDiagnosis = true">全局诊断</button>
    </AppHeader>

    <div class="editor-body">
      <TablePanel
        class="panel-left"
        @selectNode="onSelectNode"
        @hoverNode="onHoverNode"
      />
      <div class="panel-center">
        <ChartPanel ref="chartRef" :highlightId="hoveredNodeId" />
        <StrategyBar />
      </div>
      <StrategyDrawer ref="drawerRef" />
    </div>

    <SixActionsPanel />
    <DiagnosisModal v-if="showDiagnosis" @close="showDiagnosis = false" />
  </div>
  <div v-else class="loading">
    <p>加载中...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import AppHeader from '@/components/common/AppHeader.vue'
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
let saveTimer = null

onMounted(async () => {
  await store.loadProject(route.params.id)
  if (!store.current) {
    router.push('/')
    return
  }
  saveStatus.value = 'saved'
})

watch(
  () => store.current?.nodes,
  () => {
    saveStatus.value = 'dirty'
    // Auto-save after 3 seconds of inactivity
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      handleSave()
    }, 3000)
  },
  { deep: true }
)

async function handleSave() {
  saveStatus.value = 'saving'
  await store.saveProject()
  saveStatus.value = 'saved'
}

function handleExport() {
  chartRef.value?.exportPNG()
}

function goBack() {
  if (saveStatus.value === 'dirty') {
    handleSave()
  }
  router.push('/')
}

function onSelectNode(id) {
  if (drawerRef.value) {
    drawerRef.value.open(id)
  }
}

function onHoverNode(id) {
  hoveredNodeId.value = id
}
</script>

<style scoped>
.editor {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.editor-body {
  flex: 1;
  display: flex;
  gap: 0;
  overflow: hidden;
}
.panel-left {
  width: 340px;
  min-width: 340px;
}
.panel-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.save-indicator {
  font-size: 12px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}
.save-indicator.saved {
  color: var(--risk-green);
}
.toolbar-btn {
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}
.toolbar-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
}
.loading {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}
</style>
