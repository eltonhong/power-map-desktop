<template>
  <header class="app-header">
    <div class="header-left">
      <button v-if="back" class="back-btn" @click="$emit('back')">←</button>
      <h1 class="header-title">{{ title }}</h1>
    </div>
    <div class="header-right">
      <slot />
      <button class="theme-btn" @click="themeStore.toggle">
        <span class="theme-icon">{{ themeStore.theme === 'dark' ? '☀' : '🌙' }}</span>
        <span class="theme-label">{{ themeStore.theme === 'dark' ? '日间' : '夜间' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

defineProps({
  title: { type: String, default: '权力地图' },
  back: { type: Boolean, default: false }
})

defineEmits(['back'])
const themeStore = useThemeStore()
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-surface);
  -webkit-app-region: drag;
  flex-shrink: 0;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.back-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  -webkit-app-region: no-drag;
  transition: background 0.15s;
}
.back-btn:hover { background: var(--overlay-active); }
.header-title {
  font-family: var(--font-en);
  font-size: 15px;
  font-weight: 600;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  -webkit-app-region: no-drag;
}
.theme-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--overlay-hover);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 12px;
  cursor: pointer;
  padding: 5px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}
.theme-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}
.theme-icon { font-size: 14px; }
.theme-label { font-size: 12px; }
</style>
