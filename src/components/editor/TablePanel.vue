<template>
  <div class="table-panel">
    <div class="panel-header">
      <h3>{{ cfg?.label }} · 节点列表</h3>
      <button class="add-btn" @click="addNode">+ 添加</button>
    </div>
    <div class="node-list">
      <transition-group name="node-item" tag="div">
        <div
          v-for="node in store.current.nodes"
          :key="node.id"
          class="node-row"
          :class="{ selected: selectedId === node.id, flashing: flashId === node.id }"
          @click="selectNode(node.id)"
          @mouseenter="$emit('hoverNode', node.id)"
          @mouseleave="$emit('hoverNode', null)"
        >
          <div class="row-top">
            <span class="row-name">{{ node.name || '未命名' }}</span>
            <div class="row-actions">
              <RoleBadge :role="node.role_type" />
              <button class="del-btn" @click.stop="delNode(node.id)">×</button>
            </div>
          </div>
          <div class="row-fields">
            <div class="field" v-for="f in visibleFields" :key="f.key">
              <label>{{ f.label }}</label>
              <template v-if="f.key === 'power' || f.key === 'attitude'">
                <SliderCell
                  :modelValue="node[f.key]"
                  :min="f.key === 'power' ? 1 : -5"
                  :max="f.key === 'power' ? 10 : 5"
                  @update:modelValue="v => update(node.id, f.key, v)"
                />
              </template>
              <template v-else-if="f.key === 'role_type'">
                <select
                  :value="node.role_type"
                  @change="update(node.id, 'role_type', ($event.target).value)"
                  class="field-select"
                >
                  <option value="">-- 自动判定 --</option>
                  <option value="champion">Champion</option>
                  <option value="mover">Mover</option>
                  <option value="blocker">Blocker</option>
                  <option value="bystander">Bystander</option>
                </select>
              </template>
              <template v-else>
                <input
                  :value="node[f.key] || ''"
                  @input="update(node.id, f.key, ($event.target).value)"
                  class="field-input"
                  :placeholder="f.label"
                />
              </template>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '@/stores/project'
import { classifyRole } from '@/engine/role-classifier'
import SliderCell from '@/components/common/SliderCell.vue'
import RoleBadge from '@/components/common/RoleBadge.vue'

const store = useProjectStore()
const selectedId = ref(null)
const flashId = ref(null)

const emit = defineEmits(['selectNode', 'hoverNode'])

const cfg = computed(() => store.SCENE_CONFIG[store.current?.scene])

const visibleFields = computed(() => {
  if (!store.current) return []
  const scene = store.current.scene
  const fieldKeys = store.SCENE_CONFIG[scene]?.fields || []
  const labels = {
    name: '姓名', position: '职位', power: '权力(1-10)', attitude: '态度(-5~+5)',
    role_type: '角色类型', relations: '利益关系', weekly_action: '本周动作',
    buying_role: '4类角色', concern: '关心什么', contact_count: '接触次数',
    trust: '信任度(1-5)', monthly_action: '本月动作',
    agent_role: '在代理公司角色', notes: '备注',
    role: '角色', info_source: '信息来源', judgment: '关键判断'
  }
  return fieldKeys.map(k => ({ key: k, label: labels[k] || k }))
})

function selectNode(id) {
  selectedId.value = id
  emit('selectNode', id)
}

function update(id, field, value) {
  store.updateNode(id, field, value)
}

function addNode() {
  const maxId = store.current.nodes.reduce((m, n) => Math.max(m, n.id), 0)
  const newNode = {
    id: maxId + 1,
    name: '新节点',
    position: '',
    power: 5,
    attitude: 0,
    role_type: 'bystander'
  }
  // Add empty values for all scene-specific fields
  const sceneFields = store.SCENE_CONFIG[store.current.scene]?.fields || []
  for (const f of sceneFields) {
    if (!(f in newNode)) newNode[f] = ''
  }
  store.current.nodes.push(newNode)
  selectedId.value = newNode.id
  flashId.value = newNode.id
  setTimeout(() => { flashId.value = null }, 1500)
}

function delNode(id) {
  store.current.nodes = store.current.nodes.filter(n => n.id !== id)
  store.current.connections = store.current.connections.filter(
    c => c.from !== id && c.to !== id
  )
  if (selectedId.value === id) selectedId.value = null
}
</script>

<style scoped>
.table-panel {
  height: 100%;
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.panel-header h3 {
  font-family: var(--font-en);
  font-size: 13px;
  font-weight: 600;
}
.add-btn {
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--gold);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}
.add-btn:hover {
  background: rgba(226, 176, 74, 0.08);
  border-color: var(--gold);
}
.node-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}
.node-row {
  background: var(--overlay-hover);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.node-row:hover {
  border-color: rgba(255, 255, 255, 0.12);
}
.node-row.selected {
  border-color: var(--gold);
  background: rgba(226, 176, 74, 0.06);
}
.node-row.flashing {
  animation: flashHighlight 0.5s ease 3;
}
.row-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.row-name {
  font-size: 13px;
  font-weight: 600;
}
.row-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.del-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;
  transition: color 0.15s;
}
.del-btn:hover { color: var(--risk-red); }
.row-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.field { margin-bottom: 4px; }
.field label {
  display: block;
  font-size: 10px;
  color: var(--text-secondary);
  margin-bottom: 2px;
}
.field-input, .field-select {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--input-bg);
  color: var(--text-primary);
  font-size: 12px;
  outline: none;
  transition: border-color 0.2s;
}
.field-input:focus, .field-select:focus {
  border-color: var(--gold);
}
.field-select option {
  background: var(--bg-surface);
  color: var(--text-primary);
}

.node-item-enter-active {
  animation: fadeInUp 0.35s ease;
}
.node-item-leave-active {
  animation: shrinkOut 0.25s ease forwards;
}
</style>
