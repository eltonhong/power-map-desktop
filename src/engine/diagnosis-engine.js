export function diagnose(nodes) {
  const champions = nodes.filter(n => n.role_type === 'champion')
  const blockers = nodes.filter(n => n.role_type === 'blocker')
  const movers = nodes.filter(n => n.role_type === 'mover')
  const bystanders = nodes.filter(n => n.role_type === 'bystander')
  const highPowerBlockers = blockers.filter(n => n.power >= 7)
  const strongChampions = champions.filter(n => n.power >= 7)

  let health = 50
  if (champions.length >= 2) health += 20
  else if (champions.length === 1) health += 10
  else health -= 20

  if (highPowerBlockers.length === 0) health += 15
  else if (highPowerBlockers.some(b => b.attitude <= -4)) health -= 15
  else health += 5

  if (movers.length <= 2) health += 10
  else health -= 5

  if (bystanders.length <= 3) health += 5
  health = Math.max(0, Math.min(100, health))

  let level, levelColor
  if (health < 40 || champions.length === 0 || highPowerBlockers.length > 1) {
    level = 'red'
    levelColor = '#ff4d4f'
  } else if (health < 70 || movers.length > 3) {
    level = 'yellow'
    levelColor = '#e2b04a'
  } else {
    level = 'green'
    levelColor = '#22c55e'
  }

  let phase, phaseLight
  if (champions.length === 0) {
    phase = '危机期'
    phaseLight = 'red'
  } else if (blockers.length >= champions.length && highPowerBlockers.length > 0) {
    phase = '防守期'
    phaseLight = 'yellow'
  } else if (movers.length >= 3 && champions.length >= 1) {
    phase = '建设期'
    phaseLight = 'yellow'
  } else {
    phase = '进攻期'
    phaseLight = 'green'
  }

  const suggestions = []
  if (champions.length === 0) {
    suggestions.push('立即寻找至少1个潜在Champion，没有盟友寸步难行')
  }
  if (highPowerBlockers.length > 0) {
    suggestions.push(`优先处理${highPowerBlockers.length}个高权力Blocker：选择中和/隔离/绕开/转化策略之一`)
  }
  if (movers.length >= 3) {
    suggestions.push(`集中转化${movers.length}个Mover为Champion，争取数量优势`)
  }
  if (champions.length >= 2 && highPowerBlockers.length === 0) {
    suggestions.push('保持Champion活跃度，每周至少1次有价值互动')
  }
  if (champions.length === 1 && movers.length === 0) {
    suggestions.push('仅有1个Champion过于脆弱，立即寻找备份Champion')
  }
  if (suggestions.length === 0) {
    suggestions.push('维持当前策略，定期复盘更新权力地图')
  }

  return {
    health,
    level,
    levelColor,
    phase,
    phaseLight,
    counts: {
      champions: champions.length,
      blockers: blockers.length,
      movers: movers.length,
      bystanders: bystanders.length,
      highPowerBlockers: highPowerBlockers.length,
      strongChampions: strongChampions.length
    },
    suggestions: suggestions.slice(0, 3)
  }
}

export function getStrategyBar(nodes) {
  const d = diagnose(nodes)
  const summary = `你有${d.counts.champions}个Champion、${d.counts.highPowerBlockers}个高危Blocker、${d.counts.movers}个可转化Mover，当前局面${d.phase}`
  const priority = d.suggestions[0] || '维持当前策略'
  const risk = d.counts.highPowerBlockers > 0
    ? `⚠ ${d.counts.highPowerBlockers}个高权力Blocker未解除`
    : (d.counts.champions === 0 ? '⚠ 无Champion，处于孤立无援状态' : '')
  return { summary, phase: d.phase, phaseLight: d.phaseLight, priority, risk }
}
