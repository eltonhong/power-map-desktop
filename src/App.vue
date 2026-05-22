<template>
  <div class="app-shell">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <ToastMessage ref="toastRef" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import ToastMessage from '@/components/common/ToastMessage.vue'

const themeStore = useThemeStore()
const toastRef = ref(null)

onMounted(() => {
  themeStore.init()
  window.$toast = (text, type = 'info') => {
    toastRef.value?.show(text, type)
  }
})
</script>

<style scoped>
.app-shell {
  width: 100%;
  height: 100%;
  background: var(--bg-base);
}
</style>
