<template>
  <div class="home">
    <AppHeader title="权力地图 Power Map" />
    <div class="home-content">
      <div class="create-section">
        <CreateProjectCard
          v-for="(cfg, key) in SCENE_CONFIG"
          :key="key"
          :scene="key"
          :label="cfg.label"
          @create="handleCreate(key)"
        />
      </div>
      <ProjectList
        :projects="store.projects"
        @open="handleOpen"
        @delete="handleDelete"
        @copy="handleCopy"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import AppHeader from '@/components/common/AppHeader.vue'
import CreateProjectCard from '@/components/home/CreateProjectCard.vue'
import ProjectList from '@/components/home/ProjectList.vue'

const router = useRouter()
const store = useProjectStore()
const { SCENE_CONFIG } = store

onMounted(async () => {
  await store.loadProjects()
})

async function handleCreate(scene) {
  const project = store.createProject(scene)
  store.current = project
  await store.saveProject()
  store.projects.push({ id: project.id, name: project.name, scene: project.scene, createdAt: project.createdAt })
  localStorage.setItem('pm-projects', JSON.stringify(store.projects))
  router.push(`/editor/${project.id}`)
}

function handleOpen(id) {
  router.push(`/editor/${id}`)
}

async function handleDelete(id) {
  try {
    if (window.electronAPI) { await window.electronAPI.deleteProject(id) }
  } catch (e) { /* fallback */ }
  store.projects = store.projects.filter(p => p.id !== id)
  localStorage.setItem('pm-projects', JSON.stringify(store.projects))
  localStorage.removeItem(`pm-project-${id}`)
  window.$toast?.('项目已删除', 'success')
}

async function handleCopy(id) {
  const source = store.projects.find(p => p.id === id)
  if (!source) return
  await store.loadProject(id)
  if (!store.current) {
    window.$toast?.('无法加载项目数据', 'error')
    return
  }
  const copy = JSON.parse(JSON.stringify(store.current))
  copy.id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)
  copy.name = source.name + ' (副本)'
  copy.createdAt = new Date().toISOString()
  store.current = copy
  await store.saveProject()
  await store.loadProjects()
  window.$toast?.('项目已复制', 'success')
}
</script>

<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.home-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px 48px;
}
.create-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}
</style>
