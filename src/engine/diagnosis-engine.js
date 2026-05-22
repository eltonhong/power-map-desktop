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
    suggestions.push(`【危机:无Champion】当前最严重的问题是你没有一个真正的内部支持者。没有Champion意味着:你无法获得内部信息、没有人会在你不在场时替你说话、你的提案在正式会议上没有任何背书。这就像一个人去打一场需要团队的游戏——你连开局都很难。

紧急行动:
1. 在现有联系人中找出"最可能成为Champion的1个人"——Ta不一定权力最高，但一定是对你最友好、愿意给你信息的人。先聚焦一人，不要分散精力。
2. 不要直接要求对方"支持你"——先从"提供价值"开始:帮Ta解决一个工作痛点、给Ta提供Ta需要的信息、在Ta的上级面前提到Ta的贡献。
3. 2周内如果无法在任何人身上取得突破，考虑暂缓推进——在没有Champion的情况下强行推动重大决策，失败率极高且会留下"这个人没人支持"的负面印象。`)
  }
  if (highPowerBlockers.length > 0) {
    suggestions.push(`【高危:高权力Blocker】你有${highPowerBlockers.length}个权力7分以上且态度敌对的Blocker。高权力Blocker的危险不在于"反对"本身，而在于他有渠道直接影响决策者——你根本无法绕过。而且一个Blocker的负面影响力可能抵得上数个支持者的正面影响，因为人们天然对"警惕信息"更敏感。

紧急行动:
1. 不要同时处理所有高权力Blocker——选最危险的一个(权力最高+态度最敌对)，聚焦全力应对。
2. 首选中和策略:找到这个Blocker反对你的真正原因。他怕什么?你的方案是否触碰了他的利益?如果是，能否调整你的方案来消除这种利益冲突?
3. 如果中和不可行，立即启用绕开策略:找到决策者的另一条信息通道——决策者除了听这个Blocker之外还听谁的?让Champion通过那个人向决策者传递你的价值。
4. 如果所有策略都不行:接受现实，暂停推进。有些Blocker确实无法短期处理——等待局势变化(组织调整、人事变动)可能是最明智的选择。`)
  }
  if (movers.length >= 3) {
    suggestions.push(`【机会:大量Mover可转化】你有${movers.length}个尚在观望的Mover——这是你最大的机会。大多数组织的决策结果由"未表态者"决定而不是"已表态者"。你不需要让所有Mover都支持你，你只需要让足够多的Mover觉得"支持你不亏"。

具体行动:
1. 按权力高低排序你的Mover——优先转化权力最高的2个，因为他们的转向会产生"示范效应":其他人看到"连XX都觉得这个方案靠谱"会跟风。
2. 研究每个Mover的"个人获胜点"——不是公司的KPI，是这个人自己的职业利益。Ta今年最想达成什么?Ta的老板最不满Ta什么?找到这些答案，你就找到了打动Ta的钥匙。
3. 不要对所有人用同一套说辞——给CFO看ROI、给CTO看技术架构、给销售负责人看客户反馈。每个人关心的是不同的东西。`)
  }
  if (champions.length >= 2 && highPowerBlockers.length === 0) {
    suggestions.push(`【健康:保持优势】当前权力结构对你有利——你有${champions.length}个Champion且没有高权力Blocker的威胁。这是推进的最佳时机。但健康的结构容易让人松懈。

维护行动:
1. 保持Champion的活跃度:每周至少给每个Champion 1次有价值互动——不是问候，是帮他们解决KPI痛点或提供需要的信息。Champion不是"争取到就完事了"——关系需要持续维护。
2. 预防潜在Blocker出现:回顾你的权力地图，有没有Mover正在向负态度方向移动?有没有Bystander被卷入可能对你不利的派系?提前发现、提前处理比事后补救容易得多。
3. 趁现在结构健康，推进你最需要的关键决策——等到局势变化你可能就没有这么好的窗口期了。`)
  }
  if (champions.length === 1 && movers.length === 0) {
    suggestions.push(`【脆弱:单点依赖】你只有1个Champion且没有Mover可以转化——这是典型的高风险结构:万一这个Champion离职、调岗或失势，你的整个项目就归零了。

紧急行动:
1. 不要只依赖这1个Champion——立即寻找第2个潜在支持者。可以从Bystander中寻找:有没有跟你没有利益冲突、态度中立的权力人物?从Ta们开始培养。
2. 评估这唯一Champion的"保质期":Ta在公司的地位稳固吗?Ta的老板对Ta满意吗?Ta有没有可能在近期离职?如果答案是"有风险"，你需要加倍紧迫。
3. 在当前Champion不影响你寻找新Champion的前提下，加大跟Ta的互动频率和价值输出——让这个唯一支持者更加坚定，同时寻找新的。`)
  }
  if (suggestions.length === 0) {
    suggestions.push(`【稳定:维持现状】当前权力地图的结构相对平衡——没有致命的威胁，也没有明显的突破口。这种时候最需要的是"不折腾"。

维护行动:
1. 定期(每两周)复盘权力地图——关注每个人的态度和权力变化。人际关系是动态的，上个月的Champion这个月可能因为某些事变成Mover甚至Blocker。
2. 保持对Champion的持续价值输出。维持一个盟友比争取一个新盟友成本低很多，但很多人恰恰在"稳住之后"就减少了维护。
3. 留意组织中的变动——调岗、升职、新领导上任、项目被砍——任何变动都可能改变你的权力格局。最好的防御不是建墙，是保持对地形的感知。`)
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
