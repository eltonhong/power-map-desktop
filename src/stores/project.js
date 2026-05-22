import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { classifyRole } from '@/engine/role-classifier'

export const useProjectStore = defineStore('project', () => {
  const projects = ref([])
  const current = ref(null)

  const SCENE_CONFIG = {
    internal: {
      label: '公司内部',
      fields: ['name', 'position', 'power', 'attitude', 'role_type', 'relations', 'weekly_action'],
      presets: [
        { name: '直属领导', position: '', power: 8, attitude: 2 },
        { name: 'N+2领导', position: '', power: 9, attitude: 1 },
        { name: 'VP/高管', position: '', power: 10, attitude: 0 },
        { name: 'CEO/创始人', position: '', power: 10, attitude: 0 },
        { name: '同事A', position: '', power: 5, attitude: 0 },
        { name: '同事B(潜在竞争者)', position: '', power: 5, attitude: -1 },
        { name: '跨部门KP-产品', position: '', power: 6, attitude: 0 },
        { name: '跨部门KP-财务', position: '', power: 6, attitude: 0 },
        { name: 'HR', position: '', power: 4, attitude: 0 },
        { name: '助理/前台(Gatekeeper)', position: '', power: 3, attitude: 0 }
      ],
      checklist: [
        '找Champion+主动接触（每周给Champion1次有价值互动）',
        '绕开Blocker（重要汇报跨级给N+2）',
        '转化Mover变Champion（找Mover痛点帮Ta解决）',
        '业绩归属保卫（重要订单邮件抄送N+2+Champion）',
        '试用期/转正决策（3个月内判断：有Champion+N+2喜欢我=留）',
        '职业规划/跳槽路径（每年复盘1次天花板在哪）'
      ]
    },
    ka: {
      label: 'KA客户',
      fields: ['name', 'position', 'buying_role', 'concern', 'power', 'attitude', 'contact_count', 'trust', 'role_type', 'monthly_action'],
      presets: [
        { name: 'Economic Buyer', position: '', power: 9, attitude: 0 },
        { name: 'User Buyer', position: '', power: 6, attitude: 1 },
        { name: 'Technical Buyer', position: '', power: 5, attitude: 0 },
        { name: 'Coach', position: '', power: 4, attitude: 3 },
        { name: 'Gatekeeper', position: '', power: 4, attitude: 0 },
        { name: '影响人-同事', position: '', power: 4, attitude: 0 },
        { name: '影响人-上级/董事会', position: '', power: 7, attitude: 0 },
        { name: '采购', position: '', power: 5, attitude: 0 },
        { name: '财务', position: '', power: 5, attitude: 0 },
        { name: '竞品对接人', position: '', power: 4, attitude: -2 }
      ],
      checklist: [
        '报价/提案分层（EB看ROI，UB看好用，TB看规格，Coach看成就）',
        '开会前Battle Plan（列每人想要什么+担心什么+我要传递什么）',
        '内部资源调度（CTO见EB，销售工程师见TB，售后总监见UB）',
        'Champion备份策略（至少2-3个Coach，不同部门各1个）',
        '决策预判·临门一脚（通过Coach探决策时间，提前发决策包）',
        '量产后续接口（客户成功官+定期QBR+关键人离职预警）'
      ]
    },
    agent: {
      label: '代理商',
      fields: ['name', 'agent_role', 'power', 'attitude', 'role_type', 'notes'],
      presets: [
        { name: '老板/创始人', position: '', power: 10, attitude: 1 },
        { name: '老板太太/兄弟', position: '', power: 8, attitude: 0 },
        { name: '销售总监', position: '', power: 7, attitude: 0 },
        { name: '产品经理/采购', position: '', power: 5, attitude: 0 },
        { name: 'Marketing总监', position: '', power: 5, attitude: 0 },
        { name: '售后/技术支持', position: '', power: 4, attitude: 0 },
        { name: '财务', position: '', power: 4, attitude: 0 },
        { name: '仓储/物流', position: '', power: 3, attitude: 0 },
        { name: 'Top Sales', position: '', power: 6, attitude: 2 },
        { name: '竞品对接人', position: '', power: 4, attitude: -2 }
      ],
      checklist: [
        '代理ICP画像验证（画完对照雨哥P0代理画像8维，不匹配淘汰）',
        '销售赋能投入决策（给Top Sales个性化培训，不平均投入）',
        'Top Sales绑定+防代理换人（直接建联+提成奖励直发）',
        '串货治理识别（Power Map显示串货受益方，明算账+罚+重签）',
        '续约/终止决策（年度复盘Power Map+业绩双维度判断）',
        '备份代理识别（当前代理占>50%销量时培育2-3个备份）'
      ]
    },
    job: {
      label: '求职面试',
      fields: ['name', 'role', 'info_source', 'power', 'attitude', 'role_type', 'judgment'],
      presets: [
        { name: '直属领导', position: '', power: 8, attitude: 1 },
        { name: 'N+2领导', position: '', power: 9, attitude: 0 },
        { name: '用人部门负责人', position: '', power: 7, attitude: 1 },
        { name: '同事', position: '', power: 4, attitude: 0 },
        { name: 'HR', position: '', power: 3, attitude: 0 },
        { name: 'CEO/创始人', position: '', power: 10, attitude: 0 },
        { name: '前任(该岗位上一任)', position: '', power: 0, attitude: 0 },
        { name: '团队成员', position: '', power: 3, attitude: 0 },
        { name: '', position: '', power: 5, attitude: 0 },
        { name: '', position: '', power: 5, attitude: 0 }
      ],
      checklist: [
        '要不要去·决策树（按D.3信号表+Power Map完整度判断）',
        '薪资谈判定位（别只跟HR谈，让Champion替你向N+2推薪资）',
        '入职第1周接触清单（每个Champion+Mover各约1次）',
        '30/60/90天计划（30天找Champion，60天转化Mover，90天识别Blocker）',
        '同岗位前任去向=风险信号（LinkedIn查清前任去向）',
        '避坑红线（N+2是Blocker/派系内斗/无Champion/HR拒答前任=放弃offer）'
      ]
    }
  }

  const ROLE_LABELS = { champion: 'Champion', mover: 'Mover', blocker: 'Blocker', bystander: 'Bystander' }

  function createProject(scene) {
    const cfg = SCENE_CONFIG[scene]
    const nodes = cfg.presets.map((p, i) => {
      const node = {
        id: i + 1,
        name: p.name,
        power: p.power,
        attitude: p.attitude,
        role_type: classifyRole(p.power, p.attitude)
      }
      // Add all scene-specific fields
      for (const f of cfg.fields) {
        if (!(f in node)) {
          node[f] = p[f] || ''
        }
      }
      return node
    })
    const checklist = cfg.checklist.map((text, i) => ({ id: i + 1, text, done: false }))
    return {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
      name: `${cfg.label} - 新项目`,
      scene,
      createdAt: new Date().toISOString(),
      nodes,
      connections: [],
      checklist
    }
  }

  async function loadProjects() {
    // Try Electron first, fallback to localStorage
    try {
      if (window.electronAPI) {
        projects.value = await window.electronAPI.readProjects()
        return
      }
    } catch (e) { /* fallthrough */ }
    const stored = localStorage.getItem('pm-projects')
    if (stored) projects.value = JSON.parse(stored)
  }

  async function loadProject(id) {
    // Try Electron first, fallback to localStorage
    try {
      if (window.electronAPI) {
        const data = await window.electronAPI.readProject(id)
        if (data) { current.value = data; return }
      }
    } catch (e) { /* fallthrough */ }
    const stored = localStorage.getItem(`pm-project-${id}`)
    if (stored) current.value = JSON.parse(stored)
  }

  async function saveProject() {
    if (!current.value) return
    const data = JSON.parse(JSON.stringify(current.value))

    // Always save to localStorage (works in both Electron and browser)
    localStorage.setItem(`pm-project-${data.id}`, JSON.stringify(data))

    // Also try Electron API
    try {
      if (window.electronAPI) {
        await window.electronAPI.writeProject(data.id, data)
      }
    } catch (e) { /* ignore */ }

    // Update projects list in localStorage
    const idx = projects.value.findIndex(p => p.id === data.id)
    const meta = { id: data.id, name: data.name, scene: data.scene, createdAt: data.createdAt }
    if (idx >= 0) projects.value[idx] = meta
    else projects.value.push(meta)
    localStorage.setItem('pm-projects', JSON.stringify(projects.value))

    if (window.$toast) window.$toast('保存成功', 'success')
  }

  function updateNode(id, field, value) {
    const node = current.value.nodes.find(n => n.id === id)
    if (!node) return
    node[field] = value
    if (field === 'power' || field === 'attitude') {
      const newRole = classifyRole(Number(node.power), Number(node.attitude))
      if (newRole !== node.role_type) {
        node.role_type = newRole
        if (window.$toast) window.$toast(`已自动判定为：${ROLE_LABELS[newRole]}`, 'info')
      }
    }
  }

  return {
    projects, current, SCENE_CONFIG, ROLE_LABELS,
    createProject, loadProjects, loadProject, saveProject, updateNode
  }
})
