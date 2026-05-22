<template>
  <div class="home">
    <header class="home-topbar">
      <h1 class="home-title">权力地图 <span class="title-sub">Power Map</span></h1>
      <button class="theme-btn" @click="themeStore.toggle">
        <span>{{ themeStore.theme === 'dark' ? '☀ 日间' : '🌙 夜间' }}</span>
      </button>
    </header>

    <div class="home-content">
      <section class="create-section">
        <h2 class="section-label">新建项目</h2>
        <div class="create-grid">
          <div
            v-for="(cfg, key) in SCENE_CONFIG"
            :key="key"
            class="create-card"
            @click="handleCreate(key)"
          >
            <div class="card-icon">{{ icons[key] }}</div>
            <div class="card-title">{{ cfg.label }}</div>
            <div class="card-desc">{{ descs[key] }}</div>
          </div>
        </div>
      </section>

      <section class="project-section">
        <div class="section-row">
          <h2 class="section-label">已有项目 ({{ store.projects.length }})</h2>
        </div>
        <div v-if="!store.projects.length" class="empty-state">
          <div class="empty-circle"></div>
          <p>点击上方场景卡片创建第一个项目</p>
        </div>
        <div v-else class="project-grid">
          <div
            v-for="p in store.projects"
            :key="p.id"
            class="project-card"
            @click="handleOpen(p.id)"
          >
            <div class="proj-left">
              <span class="proj-name">{{ p.name }}</span>
              <span class="proj-meta">{{ SCENE_CONFIG[p.scene]?.label }} · {{ fmtDate(p.createdAt) }}</span>
            </div>
            <div class="proj-right" @click.stop>
              <button class="proj-btn" @click="handleRename(p)">改名</button>
              <button class="proj-btn" @click="handleCopy(p.id)">复制</button>
              <button class="proj-btn danger" @click="handleDelete(p.id)">删除</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const store = useProjectStore()
const themeStore = useThemeStore()
const { SCENE_CONFIG } = store

const icons = { internal: '🏢', ka: '🏭', agent: '🤝', job: '💼' }
const descs = {
  internal: '画自己公司的权力结构，找盟友、避背刺',
  ka: '画大客户决策链，识别Economic Buyer',
  agent: '画代理商内部格局，绑定Top Sales',
  job: '画目标公司权力版图，避坑决策'
}

function fmtDate(d) {
  const date = new Date(d)
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
}

onMounted(async () => { await store.loadProjects() })

async function handleCreate(scene) {
  const project = store.createProject(scene)
  store.current = project
  await store.saveProject()
  router.push(`/editor/${project.id}`)
}

function handleOpen(id) { router.push(`/editor/${id}`) }

async function handleRename(p) {
  const newName = prompt('新项目名：', p.name)
  if (!newName || !newName.trim()) return
  p.name = newName.trim()
  localStorage.setItem('pm-projects', JSON.stringify(store.projects))
  // Also update the project file
  try {
    await store.loadProject(p.id)
    if (store.current) {
      store.current.name = p.name
      await store.saveProject()
    }
  } catch (e) { /* ignore */ }
}

async function handleDelete(id) {
  try { if (window.electronAPI) await window.electronAPI.deleteProject(id) } catch (e) {}
  store.projects = store.projects.filter(p => p.id !== id)
  localStorage.setItem('pm-projects', JSON.stringify(store.projects))
  localStorage.removeItem(`pm-project-${id}`)
  window.$toast?.('项目已删除', 'success')
}

async function handleCopy(id) {
  await store.loadProject(id)
  if (!store.current) { window.$toast?.('无法加载项目', 'error'); return }
  const copy = JSON.parse(JSON.stringify(store.current))
  copy.id = crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2)
  copy.name = store.current.name + ' (副本)'
  copy.createdAt = new Date().toISOString()
  store.current = copy
  await store.saveProject()
  await store.loadProjects()
  window.$toast?.('项目已复制', 'success')
}
</script>

<style scoped>
.home { height: 100%; display: flex; flex-direction: column; background: var(--bg-base); }

/* Topbar */
.home-topbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: var(--space-lg) var(--space-3xl); background: var(--bg-surface);
  border-bottom: 1px solid var(--border); flex-shrink: 0;
}
.home-title { font-size: var(--fs-display); font-weight: 700; color: var(--text-primary); }
.title-sub { font-family: var(--font-en); color: var(--text-tertiary); font-weight: 400; }
.theme-btn {
  padding: 6px 14px; border: 1px solid var(--border); border-radius: var(--radius-md);
  background: transparent; color: var(--text-secondary); font-size: var(--fs-small);
  cursor: pointer; transition: all var(--transition-fast);
}
.theme-btn:hover { background: var(--overlay-hover); border-color: var(--border-strong); }

/* Content */
.home-content { flex: 1; overflow-y: auto; padding: var(--space-3xl); }
.section-label { font-size: var(--fs-subtitle); font-weight: 600; color: var(--text-secondary); margin-bottom: var(--space-md); }
.section-row { display: flex; justify-content: space-between; align-items: center; }

/* Create cards */
.create-section { margin-bottom: var(--space-3xl); }
.create-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-lg); }
.create-card {
  background: var(--bg-surface); border: 1px solid var(--border);
  border-radius: var(--radius-xl); padding: var(--space-2xl);
  cursor: pointer; transition: all var(--transition-normal);
  animation: fadeInUp 0.4s ease backwards;
}
.create-card:nth-child(1) { animation-delay: 0ms; }
.create-card:nth-child(2) { animation-delay: 80ms; }
.create-card:nth-child(3) { animation-delay: 160ms; }
.create-card:nth-child(4) { animation-delay: 240ms; }
.create-card:hover { transform: scale(1.02); border-color: var(--gold); box-shadow: var(--shadow-gold); }
.create-card:active { transform: scale(0.98); }
.card-icon { font-size: 28px; margin-bottom: var(--space-md); }
.card-title { font-size: var(--fs-heading); font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
.card-desc { font-size: var(--fs-small); color: var(--text-tertiary); line-height: 1.5; }

/* Project list */
.project-section { }
.project-grid { display: flex; flex-direction: column; gap: var(--space-sm); }
.project-card {
  display: flex; justify-content: space-between; align-items: center;
  background: var(--bg-surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: var(--space-lg) var(--space-xl);
  cursor: pointer; transition: all var(--transition-fast);
  animation: fadeInUp 0.3s ease backwards;
}
.project-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-sm); }
.proj-left { display: flex; flex-direction: column; gap: 2px; }
.proj-name { font-size: var(--fs-subtitle); font-weight: 600; color: var(--text-primary); }
.proj-meta { font-size: var(--fs-caption); color: var(--text-tertiary); }
.proj-right { display: flex; gap: var(--space-sm); }
.proj-btn {
  padding: 4px 12px; border: 1px solid var(--border); border-radius: var(--radius-md);
  background: transparent; color: var(--text-secondary); font-size: var(--fs-caption);
  cursor: pointer; transition: all var(--transition-fast);
}
.proj-btn:hover { background: var(--overlay-hover); border-color: var(--border-strong); color: var(--text-primary); }
.proj-btn.danger:hover { color: var(--risk-red); border-color: var(--risk-red); background: rgba(255,77,79,0.06); }

.empty-state { text-align: center; padding: 60px 0; color: var(--text-tertiary); font-size: var(--fs-small); }
.empty-circle { width: 48px; height: 48px; border: 2px dashed var(--border); border-radius: 50%; margin: 0 auto 16px; animation: breathe 2s ease-in-out infinite; }
</style>
