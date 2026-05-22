<template>
  <div class="chart-panel" ref="containerRef">
    <div ref="chartDom" class="chart-dom"></div>
    <div class="chart-legend">
      <span v-for="(color, role) in ROLE_COLORS" :key="role" class="legend-item">
        <span class="legend-dot" :style="{ background: color }"></span>
        {{ ROLE_LABELS[role] }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useProjectStore } from '@/stores/project'
import { useECharts } from '@/composables/useECharts'
import { ROLE_COLORS, ROLE_LABELS } from '@/engine/role-classifier'

const props = defineProps({
  highlightId: { type: Number, default: null }
})

const store = useProjectStore()
const { initChart, setOption, resize, dispose, getChart } = useECharts()
const containerRef = ref(null)
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

  // Connection lines
  if (connections.length > 0) {
    const lineTypes = { ally: '#22c55e', oppose: '#ff4d4f', faction: '#3b82f6', hierarchy: '#6b7280' }
    const lineStyles = { ally: 'solid', oppose: 'dashed', faction: 'dotted', hierarchy: 'solid' }
    series.push({
      type: 'lines',
      coordinateSystem: 'cartesian2d',
      polyline: false,
      animationDuration: 400,
      data: connections.map(c => {
        const fn = nodes.find(n => n.id === c.from)
        const tn = nodes.find(n => n.id === c.to)
        if (!fn || !tn) return null
        return {
          coords: [[fn.attitude, fn.power], [tn.attitude, tn.power]],
          lineStyle: {
            color: lineTypes[c.type] || '#6b7280',
            type: lineStyles[c.type] || 'solid',
            width: 1.5
          }
        }
      }).filter(Boolean)
    })
  }

  // Scatter nodes
  series.push({
    type: 'scatter',
    symbolSize: 22,
    animationDuration: 500,
    animationEasing: 'cubicInOut',
    data: nodes.map(n => {
      const isHighlighted = props.highlightId === n.id
      return {
        value: [n.attitude, n.power],
        name: n.name,
        itemStyle: {
          color: ROLE_COLORS[n.role_type] || '#6b7280',
          shadowBlur: isHighlighted ? 16 : 4,
          shadowColor: isHighlighted ? ROLE_COLORS[n.role_type] : 'rgba(0,0,0,0.3)'
        },
        symbolSize: isHighlighted ? 30 : 22
      }
    }),
    label: {
      show: true,
      position: 'top',
      formatter: p => p.name,
      color: 'var(--text-primary)',
      fontSize: 11,
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      distance: 10
    },
    emphasis: {
      scale: 1.4,
      itemStyle: { shadowBlur: 20, shadowColor: 'rgba(226,176,74,0.6)' }
    }
  })

  const option = {
    animation: true,
    grid: { left: 50, right: 30, top: 30, bottom: 30 },
    xAxis: {
      min: -5, max: 5, interval: 1,
      axisLine: { lineStyle: { color: 'var(--border)' } },
      axisLabel: { color: '#8b949e', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      name: '态度 →',
      nameTextStyle: { color: '#8b949e', fontSize: 11, padding: [0, 0, 0, 0] }
    },
    yAxis: {
      min: 1, max: 10, interval: 1,
      axisLine: { lineStyle: { color: 'var(--border)' } },
      axisLabel: { color: '#8b949e', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      name: '权力 ↑',
      nameTextStyle: { color: '#8b949e', fontSize: 11 }
    },
    series
  }

  setOption(option)
}

function exportPNG() {
  const chart = getChart()
  if (!chart) return
  const url = chart.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#090d13'
  })
  const link = document.createElement('a')
  link.download = `power-map-${store.current.scene}-${new Date().toISOString().slice(0, 10)}.png`
  link.href = url
  link.click()
  window.$toast?.('导出成功', 'success')
}

defineExpose({ exportPNG })
</script>

<style scoped>
.chart-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 0;
}
.chart-dom {
  flex: 1;
  min-height: 0;
}
.chart-legend {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 8px;
  font-size: 11px;
  flex-shrink: 0;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);
  font-family: var(--font-en);
}
.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
</style>
