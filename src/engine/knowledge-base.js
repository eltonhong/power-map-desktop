// Knowledge base: (role_type × scene) → strategies
// Content derived from 权力地图-实操卡-海外销售4场景版.txt

const BASE = {
  champion: {
    definition: '拥护者/盟友：在组织内部替你说话、推动你方案的人。你不一定需要高层的支持，但你必须有一个能给你内部信息的人。',
    signals: [
      '主动给你内部信息（"我跟你说，其实老板最在意的是……"）',
      '在内部会议上替你说话（即使你不在场）',
      '愿意私下见面/接电话（不需要正式议程）',
      '与你建立私人关系（聊家庭/爱好/互相帮忙）'
    ],
    strategies: [
      '每周给Champion 1次有价值互动：不是问候，是帮Ta解决KPI痛点或提供Ta需要的信息',
      '让Champion在你的成功中有成就感：在N+2面前提到Champion的贡献，让Ta觉得帮你=帮自己',
      '永远不要让你的Champion公开站队得罪人，保护Champion=保护你自己'
    ],
    weeklyActions: [
      '发一条对Ta有价值的信息（行业动态/竞品动作/内部机会）',
      '在Ta的KPI上帮一个具体的忙',
      '在上级面前顺带提到Ta的贡献'
    ],
    crossCulture: '国内Champion直接说"我支持你"；德国Champion用流程/文档表达支持；英国Champion委婉说"This is an interesting proposal"（可能是支持也可能是反对）；中东Champion需要私人关系+家族纽带+人情交换。',
    redLines: [
      '不要把Champion的私下信息泄露给任何人',
      '不要让Champion公开为你站队得罪其同僚',
      'Champion离职/失势=你的项目50%以上概率失败，随时准备备份Champion'
    ]
  },

  mover: {
    definition: '动摇者/摇摆票：在决策链中不站队的人，可能被你说服成为Champion，也可能被Blocker拉走。80%的管理时间应该花在转化Mover上。',
    signals: [
      '"我还没想好"/"让我领导决定"/"我们再看吧"',
      '"我需要更多信息"/"让我了解一下"',
      '回复邮件很慢，但不拒绝',
      '在内部既不帮你说话，也不反对你'
    ],
    strategies: [
      '找出Mover的真正痛点：Ta的KPI是什么？Ta怕什么？你能帮Ta解决什么？',
      '不要让Mover做"支持你"的决定——让Ta做"对自己有利"的决定',
      '给Mover安全感：案例/数据/同行背书，降低Ta的决策风险'
    ],
    weeklyActions: [
      '每个月跟每个Mover至少1-2次有价值接触',
      '找到Mover的KPI痛点，提供具体帮助',
      '用成功案例和数据降低Mover的决策风险'
    ],
    crossCulture: '日本Mover说"検討します"（我们会考虑）=95%委婉拒绝；德国Mover说"Das werden wir prüfen"（我们会审查）=正在认真评估，需要数据支持。',
    redLines: [
      '不要在Mover还没准备好的时候逼迫Ta表态',
      '不要忽视Mover——Ta们是决定胜负的关键多数'
    ]
  },

  blocker: {
    definition: '阻挡者/对手：主动阻碍你推进的人。可能是利益冲突（跟竞品有关系）、可能是个人恩怨、也可能是你威胁到了Ta的位置。',
    signals: [
      '完全不回邮件/消息',
      '不断提刁钻问题（不是验证是真刁难）',
      '在内部说你坏话（你的Champion会告诉你）',
      '故意拖延决策（"我觉得还不太成熟"）'
    ],
    strategies: [
      '中和：找到Blocker的顾虑根源，给一个不伤害Ta利益的方案',
      '隔离：缩小Blocker的决策参与范围，减少Ta的破坏力',
      '绕开：跨级汇报/跨部门推进，绕过Blocker的权力范围',
      '转化（高难度）：深入了解Blocker的动机，找到共同利益点'
    ],
    weeklyActions: [
      '判断Blocker类型：利益冲突型/个人恩怨型/威胁感型/习惯性反对型',
      '选1种策略全力执行，不要同时用4种',
      '通过Champion了解Blocker的最新动态'
    ],
    crossCulture: '国内Blocker比海外更隐蔽——不直接说"不"，而是无限拖延；日本Blocker永远微笑+说"次回検討"=永远没下次；中东Blocker口头答应然后消失；德国Blocker会给你一份"全面评估"文件——如果你不符合规范就不过。',
    redLines: [
      '不要同时用4种策略——选1种，全部资源投入',
      'Blocker的破坏力=Bystander的10倍——不要忽视',
      '不要公开对抗Blocker——明面上的冲突会让你失去中立者'
    ]
  },

  bystander: {
    definition: '旁观者/路人：在决策链中存在但不主动参与的人。不帮你也不挡你。不要浪费资源在Bystander身上。',
    signals: [
      '沉默不回邮件/抄送但从不回复',
      '偶尔回邮件但不深入',
      '会议中不发言/不表态',
      '不阻挡也不推进，纯粹在场'
    ],
    strategies: [
      '不要浪费精力在Bystander身上——你的资源稀缺',
      '保持最低频率的联系（季度问候即可）',
      '观察Bystander的动向——Ta随时可能变成Mover或Blocker'
    ],
    weeklyActions: [
      '季度1次简单问候即可',
      '不要主动发长篇邮件给Bystander——发送=投递=给对方攻击你的素材',
      '关注Bystander的变动（升职/调岗/离职），变动意味着角色可能转变'
    ],
    crossCulture: '错误的做法：给Bystander发长篇邮件=投递攻击素材。正确的做法：保持存在感但不消耗资源。',
    redLines: [
      '不要在Bystander身上过度投入——你的精力稀缺',
      '不要忽视Bystander变动——离职/升职可能改变Ta的角色'
    ]
  }
}

function sceneSuffix(scene) {
  const map = {
    internal: '在职场景',
    ka: 'KA客户场景',
    agent: '代理商场景',
    job: '求职面试场景'
  }
  return map[scene] || ''
}

function applyScene(role, scene) {
  const r = JSON.parse(JSON.stringify(role))
  const suffix = sceneSuffix(scene)

  if (scene === 'internal') {
    r.strategies.unshift('画完权力地图后，优先找直属领导和N+2中的Champion，不要在试用期跟Blocker正面对抗')
    r.weeklyActions.push('重要邮件抄送N+2和Champion，建立业绩书面记录')
  } else if (scene === 'ka') {
    r.strategies.unshift('识别Economic Buyer是谁——这是唯一能拍板预算的人，其他人都只是影响者')
    r.weeklyActions.push('给Coach提供可以在内部使用的信息，让Ta在内部有面子')
  } else if (scene === 'agent') {
    r.strategies.unshift('代理商老板不一定是真权力——判断是集权还是分权：看Top Sales听谁的')
    r.weeklyActions.push('直接加Top Sales微信/WhatsApp，绕过代理管理层建立直接联系')
  } else if (scene === 'job') {
    r.strategies.unshift('面试时通过提问摸清Power Map：问"这个岗位的前任去哪了"、"这个岗位直接汇报给谁"')
    r.weeklyActions.push('入职第一周内约每个Champion和Mover各1次1对1')
  }

  return r
}

export const KNOWLEDGE = {
  champion_internal: applyScene(BASE.champion, 'internal'),
  champion_ka: applyScene(BASE.champion, 'ka'),
  champion_agent: applyScene(BASE.champion, 'agent'),
  champion_job: applyScene(BASE.champion, 'job'),
  mover_internal: applyScene(BASE.mover, 'internal'),
  mover_ka: applyScene(BASE.mover, 'ka'),
  mover_agent: applyScene(BASE.mover, 'agent'),
  mover_job: applyScene(BASE.mover, 'job'),
  blocker_internal: applyScene(BASE.blocker, 'internal'),
  blocker_ka: applyScene(BASE.blocker, 'ka'),
  blocker_agent: applyScene(BASE.blocker, 'agent'),
  blocker_job: applyScene(BASE.blocker, 'job'),
  bystander_internal: applyScene(BASE.bystander, 'internal'),
  bystander_ka: applyScene(BASE.bystander, 'ka'),
  bystander_agent: applyScene(BASE.bystander, 'agent'),
  bystander_job: applyScene(BASE.bystander, 'job')
}
