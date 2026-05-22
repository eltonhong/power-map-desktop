<template>
  <div class="chart-panel">
    <div ref="chartDom" class="chart-dom"></div>
    <div class="chart-footer">
      <div class="chart-legend">
        <span v-for="(label, role) in ROLE_LABELS" :key="role" class="legend-item">
          <span class="legend-dot" :style="{ background: ROLE_COLORS[role] }"></span>
          <span class="legend-text">{{ label }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useProjectStore } from '@/stores/project'
import { useECharts } from '@/composables/useECharts'
import { ROLE_COLORS, ROLE_LABELS } from '@/engine/role-classifier'

const props = defineProps({ highlightId: { type: Number, default: null } })

const store = useProjectStore()
const { initChart, setOption, resize, dispose, getChart } = useECharts()
const chartDom = ref(null)

onMounted(() => {
  initChart(chartDom.value)
  renderChart()
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', resize)
  dispose()
})

watch(() => store.current?.nodes, renderChart, { deep: true })
watch(() => store.current?.connections, renderChart, { deep: true })
watch(() => props.highlightId, renderChart)

function renderChart() {
  if (!store.current) return
  const nodes = store.current.nodes
  const connections = store.current.connections
  const series = []

  if (connections.length > 0) {
    const lineTypeMap = { ally: '#22c55e', oppose: '#ff4d4f', faction: '#3b82f6', hierarchy: '#8b949e' }
    const dashMap = { ally: 'solid', oppose: 'dashed', faction: 'dotted', hierarchy: 'solid' }
    series.push({
      type: 'lines', coordinateSystem: 'cartesian2d', polyline: false,
      animationDuration: 400,
      data: connections.map(c => {
        const fn = nodes.find(n => n.id === c.from)
        const tn = nodes.find(n => n.id === c.to)
        if (!fn || !tn) return null
        return {
          coords: [[fn.attitude, fn.power], [tn.attitude, tn.power]],
          lineStyle: { color: lineTypeMap[c.type] || '#8b949e', type: dashMap[c.type] || 'solid', width: 1.5 }
        }
      }).filter(Boolean)
    })
  }

  series.push({
    type: 'scatter', symbolSize: 22, animationDuration: 500, animationEasing: 'cubicInOut',
    data: nodes.map(n => ({
      value: [n.attitude, n.power], name: n.name,
      itemStyle: {
        color: ROLE_COLORS[n.role_type] || '#6b7280',
        shadowBlur: props.highlightId === n.id ? 20 : 4,
        shadowColor: props.highlightId === n.id ? ROLE_COLORS[n.role_type] : 'rgba(0,0,0,0.3)'
      },
      symbolSize: props.highlightId === n.id ? 32 : 22
    })),
    label: {
      show: true, position: 'top', formatter: p => p.name,
      color: '#e6edf3', fontSize: 11, fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif', distance: 10
    },
    emphasis: { scale: 1.4, itemStyle: { shadowBlur: 20, shadowColor: 'rgba(226,176,74,0.6)' } }
  })

  const axisColor = 'rgba(255,255,255,0.10)'
  const labelColor = '#8b949e'

  setOption({
    animation: true,
    grid: { left: 50, right: 30, top: 30, bottom: 30 },
    xAxis: {
      min: -5, max: 5, interval: 1,
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: { color: labelColor, fontSize: 10, fontFamily: 'JetBrains Mono, Consolas, monospace' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } },
      name: '态度 →',
      nameTextStyle: { color: labelColor, fontSize: 11, padding: [0, 0, 8, 0] }
    },
    yAxis: {
      min: 1, max: 10, interval: 1,
      axisLine: { lineStyle: { color: axisColor } },
      axisLabel: { color: labelColor, fontSize: 10, fontFamily: 'JetBrains Mono, Consolas, monospace' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } },
      name: '权力 ↑',
      nameTextStyle: { color: labelColor, fontSize: 11, padding: [0, 0, 0, 0] }
    },
    series
  })
}

function exportPNG() {
  const chart = getChart()
  if (!chart) return
  const url = chart.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#090d13' })
  const a = document.createElement('a')
  a.download = `power-map-${store.current.scene}-${new Date().toISOString().slice(0, 10)}.png`
  a.href = url; a.click()
  window.$toast?.('导出成功', 'success')
}

defineExpose({ exportPNG })
</script>

<style scoped>
.chart-panel { flex: 1; display: flex; flex-direction: column; min-height: 0; position: relative; }
.chart-dom { flex: 1; min-height: 0; }
.chart-footer { padding: 6px 0; flex-shrink: 0; }
.chart-legend { display: flex; gap: 14px; justify-content: center; align-items: center; }
.legend-item { display: flex; align-items: center; gap: 5px; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.legend-text { font-size: var(--fs-caption); color: var(--text-tertiary); font-family: var(--font-en); }
</style>
