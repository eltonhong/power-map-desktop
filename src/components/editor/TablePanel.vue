<template>
  <div class="table-panel">
    <div class="panel-header">
      <div class="panel-title-group">
        <span class="panel-scene-badge">{{ cfg?.label }}</span>
        <span class="panel-count">{{ store.current.nodes.length }} 人</span>
      </div>
      <button class="btn btn-gold btn-sm" @click="addNode">+ 添加人物</button>
    </div>

    <div class="node-list">
      <div
        v-for="node in store.current.nodes"
        :key="node.id"
        class="node-card"
        :class="{
          selected: selectedId === node.id,
          flashing: flashId === node.id,
          collapsed: collapsedIds.has(node.id)
        }"
      >
        <!-- Card Header: always visible -->
        <div class="card-head" @click="toggleCollapse(node.id)">
          <div class="head-left" @click.stop="selectNode(node.id)">
            <span class="head-role-dot" :style="{ background: roleColor(node.role_type) }"></span>
            <span class="head-name">{{ node.name || '未命名' }}</span>
            <span class="head-position" v-if="node.position">{{ node.position }}</span>
          </div>
          <div class="head-right">
            <RoleBadge :role="node.role_type" />
            <span class="collapse-icon">{{ collapsedIds.has(node.id) ? '▸' : '▾' }}</span>
            <button class="del-btn" @click.stop="delNode(node.id)" title="删除此人物">×</button>
          </div>
        </div>

        <!-- Card Body: collapsible fields -->
        <div v-if="!collapsedIds.has(node.id)" class="card-body">
          <div class="card-fields">
            <div class="field" v-for="f in nodeFields" :key="f.key">
              <label class="field-label">{{ f.label }}</label>
              <template v-if="f.key === 'power'">
                <div class="slider-wrap">
                  <input
                    type="range" min="1" max="10" step="0.01"
                    :value="node.power"
                    @input="onSliderInput(node, 'power', $event)"
                    @change="onSliderChange(node, 'power', $event)"
                    class="slider slider-power"
                  />
                  <span class="slider-val">{{ Math.round(node.power) }}</span>
                </div>
              </template>
              <template v-else-if="f.key === 'attitude'">
                <div class="slider-wrap">
                  <input
                    type="range" min="-5" max="5" step="0.01"
                    :value="node.attitude"
                    @input="onSliderInput(node, 'attitude', $event)"
                    @change="onSliderChange(node, 'attitude', $event)"
                    class="slider slider-attitude"
                  />
                  <span class="slider-val" :class="attitudeClass(node.attitude)">
                    {{ node.attitude > 0 ? '+' : '' }}{{ Math.round(node.attitude) }}
                  </span>
                </div>
              </template>
              <template v-else-if="f.key === 'role_type'">
                <select
                  :value="node.role_type"
                  @change="update(node.id, 'role_type', ($event.target).value)"
                  class="input-select"
                >
                  <option value="">自动判定</option>
                  <option value="champion">Champion 盟友</option>
                  <option value="mover">Mover 动摇者</option>
                  <option value="blocker">Blocker 阻挡者</option>
                  <option value="bystander">Bystander 旁观者</option>
                </select>
              </template>
              <template v-else>
                <input
                  :value="node[f.key] || ''"
                  @input="update(node.id, f.key, ($event.target).value)"
                  class="input-text"
                  :placeholder="f.placeholder || f.label"
                />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!store.current.nodes.length" class="empty-hint">
        点击「+ 添加人物」开始绘制权力地图
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useProjectStore } from '@/stores/project'
import { classifyRole, ROLE_COLORS } from '@/engine/role-classifier'
import RoleBadge from '@/components/common/RoleBadge.vue'

const store = useProjectStore()
const selectedId = ref(null)
const flashId = ref(null)
const collapsedIds = reactive(new Set())

const emit = defineEmits(['selectNode', 'hoverNode'])

const cfg = computed(() => store.SCENE_CONFIG[store.current?.scene])

const nodeFields = computed(() => {
  if (!store.current) return []
  const fields = store.SCENE_CONFIG[store.current.scene]?.fields || []
  const labelMap = {
    name: '姓名', position: '职位', power: '权力 (1-10)', attitude: '态度 (-5 ~ +5)',
    role_type: '角色类型', relations: '利益关系', weekly_action: '本周动作',
    buying_role: '角色定位', concern: '关心什么', contact_count: '接触次数',
    trust: '信任度 (1-5)', monthly_action: '本月动作',
    agent_role: '代理中角色', notes: '备注',
    role: '角色', info_source: '信息来源', judgment: '关键判断'
  }
  const placeholderMap = {
    name: '输入姓名', position: '输入职位', relations: '同学/前同事/派系等',
    weekly_action: '本周具体行动', concern: 'Ta最关心什么',
    monthly_action: '本月具体行动', notes: '补充说明',
    agent_role: '如：销售总监', info_source: 'HR告知/面试提问/LinkedIn',
    judgment: '关键判断结论', role: '如：直属领导'
  }
  return fields.map(k => ({
    key: k,
    label: labelMap[k] || k,
    placeholder: placeholderMap[k] || ''
  }))
})

function roleColor(type) { return ROLE_COLORS[type] || 'var(--bystander)' }
function attitudeClass(v) {
  const r = Math.round(v)
  if (r >= 3) return 'att-positive'
  if (r <= -3) return 'att-negative'
  return 'att-neutral'
}

function selectNode(id) {
  selectedId.value = id
  emit('selectNode', id)
}

function delNode(id) {
  store.current.nodes = store.current.nodes.filter(n => n.id !== id)
  store.current.connections = store.current.connections.filter(c => c.from !== id && c.to !== id)
  if (selectedId.value === id) selectedId.value = null
}

function toggleCollapse(id) {
  if (collapsedIds.has(id)) collapsedIds.delete(id)
  else collapsedIds.add(id)
}

function update(id, field, value) {
  store.updateNode(id, field, value)
}

function onSliderInput(node, key, e) {
  const v = Number(e.target.value)
  node[key] = v
  store.updateNode(node.id, key, v)
}

function onSliderChange(node, key, e) {
  const snapped = Math.round(Number(e.target.value))
  node[key] = snapped
  store.updateNode(node.id, key, snapped)
}

function addNode() {
  const maxId = store.current.nodes.reduce((m, n) => Math.max(m, n.id), 0)
  const newNode = {
    id: maxId + 1, name: '新人物', position: '', power: 5, attitude: 0, role_type: 'bystander'
  }
  const fields = store.SCENE_CONFIG[store.current.scene]?.fields || []
  for (const f of fields) {
    if (!(f in newNode)) newNode[f] = ''
  }
  store.current.nodes.push(newNode)
  selectedId.value = newNode.id
  flashId.value = newNode.id
  collapsedIds.delete(newNode.id)
  setTimeout(() => { flashId.value = null }, 1500)
  emit('selectNode', newNode.id)
}

defineExpose({ selectedId })
</script>

<style scoped>
.table-panel {
  height: 100%;
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

/* Panel Header */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.panel-title-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
.panel-scene-badge {
  font-size: var(--fs-subtitle);
  font-weight: 600;
  color: var(--text-primary);
}
.panel-count {
  font-size: var(--fs-caption);
  color: var(--text-tertiary);
  background: var(--overlay-hover);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

/* Buttons */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border: 1px solid var(--border); border-radius: var(--radius-md);
  font-size: var(--fs-small); font-weight: 500; cursor: pointer;
  transition: all var(--transition-fast);
  padding: 6px 14px; height: var(--ctrl-height-sm);
  background: transparent; color: var(--text-primary);
}
.btn:hover { background: var(--overlay-hover); border-color: var(--border-strong); }
.btn-gold { color: var(--gold); border-color: rgba(226,176,74,0.2); }
.btn-gold:hover { background: rgba(226,176,74,0.08); border-color: var(--gold); }
.btn-sm { padding: 4px 10px; font-size: var(--fs-caption); height: auto; }

/* Node list */
.node-list {
  flex: 1; overflow-y: auto; padding: var(--space-md);
}

/* Card */
.node-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-sm);
  transition: all var(--transition-fast);
  overflow: hidden;
}
.node-card:hover { border-color: var(--border-strong); }
.node-card.selected { border-color: var(--gold); box-shadow: var(--shadow-gold); }
.node-card.flashing { animation: flashHighlight 0.5s ease 3; }
.node-card.collapsed { border-color: transparent; background: transparent; }

/* Card Head */
.card-head {
  display: flex; justify-content: space-between; align-items: center;
  padding: var(--space-md) var(--space-lg);
  cursor: pointer; user-select: none;
  transition: background var(--transition-fast);
}
.card-head:hover { background: var(--overlay-hover); }
.head-left { display: flex; align-items: center; gap: var(--space-sm); flex: 1; min-width: 0; }
.head-role-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.head-name { font-size: var(--fs-subtitle); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.head-position { font-size: var(--fs-caption); color: var(--text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.head-right { display: flex; align-items: center; gap: var(--space-sm); flex-shrink: 0; }
.collapse-icon { font-size: var(--fs-caption); color: var(--text-tertiary); width: 16px; text-align: center; }
.del-btn {
  background: none; border: none; color: var(--text-tertiary); cursor: pointer;
  font-size: 16px; padding: 2px 6px; border-radius: var(--radius-sm); line-height: 1;
  transition: all var(--transition-fast);
}
.del-btn:hover { color: var(--risk-red); background: rgba(255,77,79,0.08); }

/* Card Body */
.card-body { padding: 0 var(--space-lg) var(--space-lg); }
.card-fields { display: flex; flex-direction: column; gap: var(--space-sm); }

/* Fields */
.field { display: flex; flex-direction: column; gap: 2px; }
.field-label {
  font-size: var(--fs-tiny); color: var(--text-tertiary);
  text-transform: uppercase; letter-spacing: 0.5px;
}

/* Inputs */
.input-text, .input-select {
  width: 100%; padding: 6px 10px; border: 1px solid var(--input-border);
  border-radius: var(--radius-md); background: var(--input-bg);
  color: var(--text-primary); font-size: var(--fs-body); outline: none;
  transition: border-color var(--transition-fast);
  height: var(--ctrl-height-sm); line-height: 1;
}
.input-text:focus, .input-select:focus { border-color: var(--border-focus); }
.input-select { cursor: pointer; }
.input-select option { background: var(--bg-surface); color: var(--text-primary); }

/* Slider */
.slider-wrap { display: flex; align-items: center; gap: var(--space-sm); }
.slider {
  flex: 1; -webkit-appearance: none; height: var(--slider-track);
  border-radius: 2px; outline: none; cursor: pointer;
  background: var(--border);
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: var(--slider-thumb); height: var(--slider-thumb);
  border-radius: 50%; cursor: pointer; border: 2px solid var(--bg-surface);
  box-shadow: 0 0 8px rgba(226,176,74,0.3); transition: transform 0.15s;
}
.slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
.slider-power { background: linear-gradient(to right, var(--border), var(--gold)); }
.slider-power::-webkit-slider-thumb { background: var(--gold); }
.slider-attitude { background: linear-gradient(to right, var(--risk-red), var(--border), var(--risk-green)); }
.slider-attitude::-webkit-slider-thumb { background: var(--gold); }
.slider-val {
  font-family: var(--font-mono); font-size: var(--fs-body); font-weight: 600;
  min-width: 26px; text-align: center; color: var(--gold);
}
.att-positive { color: var(--champion); }
.att-negative { color: var(--risk-red); }
.att-neutral { color: var(--gold); }

.empty-hint {
  text-align: center; padding: var(--space-3xl) var(--space-lg);
  color: var(--text-tertiary); font-size: var(--fs-small);
}
</style>
