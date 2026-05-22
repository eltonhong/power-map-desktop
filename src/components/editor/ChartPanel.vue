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

const emit = defineEmits(['nodeClick'])
const store = useProjectStore()
const { initChart, setOption, resize, dispose, getChart } = useECharts()
const chartDom = ref(null)

onMounted(() => {
  initChart(chartDom.value)
  renderChart()
  window.addEventListener('resize', resize)
  // Bind chart click event
  const chart = getChart()
  if (chart) {
    chart.on('click', (params) => {
      if (params.componentType === 'series' && params.seriesType === 'scatter') {
        const node = store.current?.nodes[params.dataIndex]
        if (node) emit('nodeClick', node.id)
      }
    })
  }
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
    type: 'scatter', symbolSize: 26, animationDuration: 500, animationEasing: 'cubicInOut',
    data: nodes.map(n => ({
      value: [n.attitude, n.power], name: n.name,
      position: n.position || '', role_type: n.role_type || '',
      relations: n.relations || n.info_source || n.agent_role || n.buying_role || '',
      weekly_action: n.weekly_action || n.monthly_action || '',
      itemStyle: {
        color: ROLE_COLORS[n.role_type] || '#6b7280',
        borderColor: '#fff', borderWidth: 2,
        shadowBlur: props.highlightId === n.id ? 24 : 6,
        shadowColor: props.highlightId === n.id ? ROLE_COLORS[n.role_type] : 'rgba(0,0,0,0.4)'
      },
      symbolSize: props.highlightId === n.id ? 36 : 26
    })),
    label: {
      show: true, position: 'right', formatter: p => p.name, distance: 14,
      color: '#e6edf3', fontSize: 12, fontWeight: 'bold',
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      textShadowColor: 'rgba(0,0,0,0.7)', textShadowBlur: 4
    },
    emphasis: {
      scale: 1.5,
      itemStyle: { shadowBlur: 30, shadowColor: 'rgba(226,176,74,0.8)', borderWidth: 3, borderColor: '#fff' }
    }
  })

  setOption({
    animation: true,
    backgroundColor: 'transparent',
    grid: { left: 60, right: 40, top: 20, bottom: 30 },
    // Quadrant background shading
    graphic: [
      { type: 'rect', left: '50%', top: 0, right: 0, bottom: '50%',
        style: { fill: 'rgba(34,197,94,0.03)' }, z: 0 },
      { type: 'rect', left: 0, top: 0, right: '50%', bottom: '50%',
        style: { fill: 'rgba(255,77,79,0.03)' }, z: 0 },
      { type: 'rect', left: '50%', top: '50%', right: 0, bottom: 0,
        style: { fill: 'rgba(34,197,94,0.02)' }, z: 0 },
      { type: 'rect', left: 0, top: '50%', right: '50%', bottom: 0,
        style: { fill: 'rgba(255,77,79,0.02)' }, z: 0 }
    ],
    xAxis: {
      min: -5, max: 5, interval: 1,
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.35)', width: 2, type: 'solid' } },
      axisTick: { show: true, lineStyle: { color: 'rgba(255,255,255,0.25)', width: 1 } },
      axisLabel: { color: '#c0c6ce', fontSize: 12, fontWeight: 'bold', fontFamily: 'JetBrains Mono, Consolas, monospace' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)', type: 'dashed', width: 1 } },
      name: '← 敌对                              态度                              友好 →',
      nameLocation: 'center',
      nameTextStyle: { color: '#c0c6ce', fontSize: 13, fontWeight: 'bold', padding: [16, 0, 0, 0] }
    },
    yAxis: {
      min: 1, max: 10, interval: 1,
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.35)', width: 2, type: 'solid' } },
      axisTick: { show: true, lineStyle: { color: 'rgba(255,255,255,0.25)', width: 1 } },
      axisLabel: { color: '#c0c6ce', fontSize: 12, fontWeight: 'bold', fontFamily: 'JetBrains Mono, Consolas, monospace' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)', type: 'dashed', width: 1 } },
      name: '权\n力\n↑',
      nameLocation: 'center',
      nameTextStyle: { color: '#c0c6ce', fontSize: 13, fontWeight: 'bold', padding: [0, 0, 0, 0] }
    },
    tooltip: {
      show: true,
      trigger: 'item',
      backgroundColor: 'rgba(19,24,32,0.95)',
      borderColor: 'rgba(255,255,255,0.15)',
      textStyle: { color: '#e6edf3', fontSize: 13 },
      formatter: function(p) {
        const d = p.data
        let html = `<div style="font-weight:700;font-size:14px;margin-bottom:4px">${d.name}</div>`
        if (d.position) html += `<div style="color:#8b949e;font-size:11px;margin-bottom:6px">${d.position}</div>`
        html += `<div style="display:flex;gap:12px;margin-bottom:4px">`
        html += `<span>权力: <b style="color:#e2b04a">${d.value[1]}</b></span>`
        html += `<span>态度: <b style="color:${d.value[0] >= 3 ? '#ff4d4f' : d.value[0] <= -3 ? '#22c55e' : '#e2b04a'}">${d.value[0] > 0 ? '+' : ''}${d.value[0]}</b></span>`
        html += `</div>`
        if (d.relations) html += `<div style="color:#8b949e;font-size:11px">关系: ${d.relations}</div>`
        return html
      }
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
