import { ref, onUnmounted } from 'vue'
import * as echarts from 'echarts'

export function useECharts() {
  let chart = null

  function initChart(dom) {
    if (!dom) return
    chart = echarts.init(dom, null, {
      devicePixelRatio: window.devicePixelRatio || 1
    })
  }

  function setOption(option) {
    if (!chart) return
    chart.setOption(option, { notMerge: true })
  }

  function resize() {
    chart?.resize()
  }

  function dispose() {
    chart?.dispose()
    chart = null
  }

  function getChart() {
    return chart
  }

  return { initChart, setOption, resize, dispose, getChart }
}
