<template>
  <Teleport to="body">
    <div class="toast-container">
      <transition-group name="tb" tag="div">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="toast"
          :class="msg.type"
        >
          {{ msg.text }}
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([])
let id = 0

function show(text, type = 'info', duration = 2000) {
  const msg = { id: ++id, text, type }
  messages.value.push(msg)
  setTimeout(() => {
    messages.value = messages.value.filter(m => m.id !== msg.id)
  }, duration)
}

defineExpose({ show })
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}
.toast {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  background: var(--bg-glass);
  backdrop-filter: blur(var(--blur));
  border: 1px solid var(--border);
  color: var(--text-primary);
  animation: toastIn 0.3s ease;
  pointer-events: auto;
  white-space: nowrap;
}
.toast.success { border-left: 3px solid var(--risk-green); }
.toast.warning { border-left: 3px solid var(--risk-yellow); }
.toast.error { border-left: 3px solid var(--risk-red); }
.tb-leave-active { animation: toastOut 0.25s ease forwards; }
</style>
