// 知识库: (角色 × 场景) → STAR 策略
// 理论来源: Rules for Radicals (Alinsky 1971) / Strategic Selling (Miller & Heiman 1985)
//           Power Base Selling (Holden 2003) / 权力:为什么只为某些人所拥有 (Pfeffer 2010)

const championBase = {
  theory: `【理论根源】
Rules for Radicals (Alinsky 1971): "Never go outside the experience of your people" — 每一个权力运动都必须有一个内部人做向导。Alinsky 在芝加哥的社区组织中首次系统化了"内线(inside man)"的概念，这就是 Champion 的理论起源。

Strategic Selling (Miller & Heiman 1985): 将 Alinsky 的政治组织方法论引入 B2B 销售，在 Blue Sheet 中将 Champion 定义为 Coach — 四种 Buying Influence 中最关键的角色。Coach 给你三种东西:信息(Information)、指导(Guidance)、背书(Endorsement)。

Power Base Selling (Holden 2003): 进一步将 Champion 拆分为三级 — 弱 Champion(愿意见你)、中 Champion(愿意分享信息)、强 Champion(愿意为你冒险)。没有强 Champion 的大项目 50% 会失败。

权力 (Pfeffer 2010): 第 7 章"建立关系"中通过大量实证数据证明——在组织晋升中，有一个 sponsor(即 Champion)比个人能力更能预测结果。Pfeffer 称之为"the single most replicable finding in organizational behavior"。`,
  definition: `在组织内部替你说话、推动你方案的人。你不一定需要最高层的支持，但你必须有一个能给你内部信息、在关键时刻替你背书的人。Alinsky 说得好:"In the world as it is, not as we want it to be" — Champion 就是帮你在"真实世界"里导航的人。`,
  signals: [
    `主动给你内部信息("我跟你说，其实老板最在意的是……")——这印证了 Alinsky 的核心原则:信息是权力的第一表现形式`,
    `在内部会议上替你说话(即使你不在场)——Pfeffer 研究指出:私下支持不等于真支持，公开背书才是真正的 Champion 行为`,
    `愿意私下见面/接电话(不需要正式议程)——Holden 的 Coach 判定标准第一条:Willingness to meet informally`,
    `与你建立私人关系——Pfeffer 第 7 章:networking 不是"搞关系"，而是建立基于互惠的专业信任`
  ],
  strategies: [
    `【S-具体(Specific)】你找到了一个愿意帮你的内部人(Ta 可能是直属领导、客户内部的技术专家、代理商里的 Top Sales)，但 Ta 对你的支持还不够深入，或者 Ta 的权力不足以单独推动决策。
【M-可衡量(Measurable)】将 Ta 从"弱/中 Champion"升级为"强 Champion"——让 Ta 不仅愿意给你信息，更愿意在关键决策会议上为你公开支持。
【A-可实现(Achievable)】】
1. 每周给 Ta 提供 1 次有价值互动——不是问候，是帮 Ta 解决 KPI 痛点。研究 Ta 的 OKR/KPI，如果你能帮 Ta 达成目标，Ta 自然会帮你。Alinsky:"The price of a successful attack is a constructive alternative."
2. 在 Ta 的上级面前用"我们团队"的语言提到 Ta 的贡献——让 Ta 觉得帮你的过程也提升了自己的职场资本。Pfeffer 研究证实:让人在你成功中有份"功劳"，是维系长期联盟的最强纽带。
3. 给 Ta 一套能够向其他人展示的"正面方案"——Holden 称这为 Armor(盔甲):让 Champion 在支持你的时候有东西可以展示，而不是空口白话。
【R-相关(Relevant)& T-时限(Time-bound)】Champion 从被动提供信息升级为主动推动决策，在关键会议上为你的方案公开背书，你的提案通过率提升 50% 以上。`,

    `【S-具体(Specific)】你已经在跟 Champion 合作，但你担心如果 Ta 离职或调动，你的整个项目会崩塌——"单点依赖"是最危险的权力结构。
【M-可衡量(Measurable)】在 90 天内建立至少 2 个备份 Champion，分散风险，降低对单一个体的依赖。
【A-可实现(Achievable)】】
1. 在当前 Champion 所在的部门之外，寻找第二个潜在 Champion——最好来自不同职能(比如一个是技术线、一个是业务线)。Holden 称之为"Champion Redundancy"(盟友冗余)。
2. 用同样的方法培养第二个 Champion:先提供价值→再建立信任→最后请求支持。Pfeffer 第 8 章:"权力结构的韧性来自于节点冗余，而非节点强度。"
3. 确保两个 Champion 彼此认识但不属于同一派系——Alinsky 警告:"不要把鸡蛋放在一个篮子里，更不要把篮子放在同一辆车上。"
【R-相关(Relevant)& T-时限(Time-bound)】即使一个 Champion 离职或调动，你的项目仍然有内部支撑，不会一夜间归零。`
  ],
  weeklyActions: [
    `信息投喂:发一条对 Ta 有实际价值的信息(行业动态/竞品动作/内部机会)，不要群发，要针对 Ta 的具体岗位定制`,
    `KPI 助攻:找到 Ta 当前最头疼的一件事，主动提供解决方案或资源——Pfeffer: "The most powerful people are those who solve others' problems"`,
    `向上曝光:在上级面前顺带提到 Ta 的贡献，让 Ta 觉得跟你合作"不吃亏"，反而是自己的职场加分项`
  ],
  crossCulture: `【跨文化 Champion 识别与运营】
- 中国:Champion 直接说"我支持你"，表达明确。但如果 Ta 说"我尽量"——大概率是委婉拒绝。
- 德国:Champion 用流程和文档表达支持。如果 Ta 主动给你内部规范文件，这就是德国式 Champion 信号。
- 英国:Champion 说"This is an interesting proposal"——可能是支持也可能是反对，需要看后续行动。Miller & Heiman 原注:英国商务文化中直接表达立场被视为不专业。
- 中东:Champion 依赖私人关系+家族纽带。在沙特/阿联酋，你需要先建立"人与人"的关系，才能谈"公司与公司"的合作。
- 日本:Champion 几乎不会公开表达支持——Ta 会在会前会后私下给你信息，但在正式会议上保持沉默。这不是不忠，是文化。`,
  redLines: [
    `绝不要把 Champion 私下给你的信息泄露给任何人——Alinsky: "Keep the pressure on" 不等于公开信息。泄露一次，永久失去`,
    `不要让你的 Champion 公开为你站队得罪其同僚——Holden: Champion 需要 plausible deniability(合理的否认空间)，不要让 Ta 成为靶子`,
    `Champion 离职/失势 = 项目 50% 以上概率失败。Pfeffer 研究:权力结构变化时，原来的"盟友"可能变成"包袱"。随时准备备份 Champion`
  ]
}

const moverBase = {
  theory: `【理论根源】
Rules for Radicals (Alinsky): Alinsky 将组织分为三类人——"have, have-not, and have-a-little"。Mover 就是"have-a-little":他们有点权力但不多，最怕失去已有的东西，最容易被一个"安全的替代方案"说服。Alinsky 的金句:"The price of a successful attack is a constructive alternative."——给 Mover 一个安全的选项，Ta 就会站过来。

Strategic Selling (Miller & Heiman): Mover 对应 Blue Sheet 中的"未表态影响者"。Miller 的量化研究显示:在 B2B 决策委员会中，平均 40-60% 的成员在投票前 48 小时仍然未表态——这些人就是决定胜负的关键。

权力 (Pfeffer): 第 3 章"权力领地"指出:组织中 65% 的人在被分配任务时没有明确的初始立场，他们会根据"哪边看起来会赢"来决定站队。`,
  definition: `动摇者/摇摆票——在决策链中不站队的人，可能被你说服成为 Champion，也可能被 Blocker 拉走。你的核心任务不是"说服"Mover 支持你，而是创造一个让 Mover 觉得"支持你是最安全选择"的局面。`,
  signals: [
    `"我还没想好 / 让我领导决定 / 我们再看吧"——Alinsky:犹豫的人不是反对你，是怕选错`,
    `"我需要更多信息 / 让我了解一下"——Strategic Selling:这是 Mover 在给自己找"台阶"，给 Ta 数据和案例`,
    `回复邮件很慢，但不拒绝——Holden 分类:这不是消极，是观望。观望者最容易被利益驱动`,
    `在内部既不帮你说话也不反对你——Pfeffer:沉默是权力场中最常见的"自保策略"`
  ],
  strategies: [
    `【S-具体(Specific)】决策链中有 3-5 个 Mover，他们不表态不反对，在观望局势。你现在的 Champion 力量不够强，不足以让 Mover 自动站过来。
【M-可衡量(Measurable)】将"观望者"转化为"支持者"——不需要 Ta 们立刻成为 Champion，只需要在关键决策时刻不反对你、或者投赞成票。
【A-可实现(Achievable)】】
1. 找出每个 Mover 的"Win-Result"(个人获胜点):Ta 的 KPI 是什么?Ta 怕什么?你能帮 Ta 解决什么?Strategic Selling 的核心方法论:找到每个人"赢了能得到什么"。
2. 不要让 Mover 做"支持你"的决定——让 Ta 做"对自己有利"的决定。Alinsky:"The most effective means are the simple ones that people understand." 用 Ta 熟悉的语言解释"为什么支持这个方案对 Ta 自己有好处"。
3. 给 Mover 铺好台阶:案例/数据/同行背书，让 Ta 可以跟别人说"我看了数据/案例后觉得这个方案靠谱"而不是"我站某某那边"。Holden:给 Mover 一个能向别人解释自己立场的理由。
【R-相关(Relevant)& T-时限(Time-bound)】至少 50% 的 Mover 在关键决策时投赞成票或不反对，你的支持阵营从 1-2 人扩大到 4-5 人，形成"多数派"印象——Pfeffer 研究:多数派印象一旦形成，会自我强化。`,

    `【S-具体(Specific)】你发现 Mover 中有 1-2 个"高权力 Mover"(权力 7-10 分但态度中立)——Ta 们的决定将极大影响最终结果。但 Ta 们特别谨慎，不愿意轻易表态。
【M-可衡量(Measurable)】不要逼高权力 Mover 表态，而是让 Ta"自己说服自己"——高权力者最抗拒的是被说服。
【A-可实现(Achievable)】】
1. 用"试点/小范围验证"代替"正式承诺":请 Ta 参与一个小规模试验或 Demo，让 Ta 亲身体验你的方案的价值，而不是听你讲。Pfeffer 第 5 章:"亲身体验是最强的说服力，没有之一。"
2. 找 Ta 的同行/对标企业案例:如果 Ta 是 CFO，就给同行业 CFO 的成功案例;如果 Ta 是 CTO，就给技术同行背书。Alinsky:"People only understand what they have experienced."
3. 让 Champion 在非正式场合(午餐/咖啡/走廊)跟 Ta 聊，而不是正式会议——降低对抗性，增加信任感。Holden 称这为"Off-line Influence"(线下影响)。
【R-相关(Relevant)& T-时限(Time-bound)】高权力 Mover 在正式决策前已经通过非正式渠道了解并认可你的方案，正式投票时不再反对。`
  ],
  weeklyActions: [
    `找到每个 Mover 的"Win-Result":研究 Ta 的 KPI/OKR，记录下你能帮 Ta 达成的 1 个具体目标`,
    `给每个 Mover 发 1 份针对 Ta 岗位定制的案例或数据——不要群发同一份材料，Mover 最在意"跟我的工作有什么关系"`,
    `安排 1 次 Champion 和 Mover 的非正式接触(午餐/咖啡/线上 1:1)，让 Mover 从第三方听到对你的正面评价——Pfeffer:"第三方的背书比你的自述有效 10 倍"`
  ],
  crossCulture: `【跨文化 Mover 转化策略】
- 日本:Mover 说"検討します(我们会考虑)"=95% 委婉拒绝。如果日本 Mover 真的在考虑，Ta 会回问你具体问题。如果只是说"検討します"然后沉默，那就是"不"。
- 德国:Mover 说"Das werden wir prüfen(我们会审查)"=正在认真评估。你需要立刻提供详细的数据和文档——德国人用事实做决策。
- 中东:Mover 倾向通过中间人传话而非直接沟通。在沙特/阿联酋，你需要找一个双方都认识的人来传递信息。
- 印度:Mover 可能在会议上点头但在会后反对——因为当面说"不"被认为不礼貌。你需要在会后 1:1 确认真实立场。`,
  redLines: [
    `不要在 Mover 还没准备好的时候逼迫 Ta 表态——Alinsky:"A tactic that drags on too long becomes a drag."逼迫只会把 Mover 推向 Blocker`,
    `不要忽视 Mover——Ta 们是决定胜负的关键多数。Strategic Selling 数据:80% 的销售时间应花在影响未表态者，而不是跟已表态者反复沟通`
  ]
}

const blockerBase = {
  theory: `【理论根源】
Rules for Radicals (Alinsky): 第 5 章"对抗与极化"——Alinsky 提出了著名的对手处理法则:"Pick the target, freeze it, personalize it, and polarize it." 但在商业场景中，Holden 修正了这条:不要 polarize(极化)，要 neutralize(中和)或 bypass(绕开)。因为商业中的 Blocker 明天可能是你的老板或客户。

Power Base Selling (Holden): 专门辟出第 9-11 章讲"Dealing with Opposition"。Holden 将 Blocker 分为四类——利益冲突型(你动了 Ta 的预算/供应商)、个人恩怨型(你跟 Ta 有过节)、威胁感型(你的方案会让 Ta 的岗位变得多余)、习惯性反对型(逢人必反、跟内容无关)。

权力 (Pfeffer): 第 3 章"权力领地"——Pfeffer 研究指出:组织中最强烈的本能不是追求利益，而是保卫领地。如果有人动了你的预算、团队或决策权，你会本能地成为 Blocker——这不是人品问题，是人性。`,
  definition: `阻挡者/对手——出于利益、情感、或本能而主动阻碍你推进的人。Blocker 不一定是你敌人:可能只是你的方案威胁到了 Ta 的权力领地(Pfeffer)，或者 Ta 跟你的竞品有 20 年交情而你不知道(Holden)。`,
  signals: [
    `完全不回邮件/消息——Alinsky:"The first rule of opposition is: determine who has the power to say yes."沉默的人往往有否决权`,
    `不断提刁钻问题——注意区分:Technical Buyer 是验证可行性(善意)，Blocker 是找茬拖延(恶意)。Strategic Selling 原注:看提问的目的是"弄清楚"还是"弄黄它"`,
    `在内部说你坏话——你的 Champion 会告诉你。Alinsky 称之为"shadow campaign"(影子战役):明面不反对、暗中搞破坏`,
    `故意拖延决策("我觉得还不太成熟")——Holden 分类:这是最常见的 Blocker 策略，成本最低、最难被追责`
  ],
  strategies: [
    `【S-具体(Specific)】你识别出 1-2 个明确在阻碍你推进的 Blocker——Ta 可能是高权力的 VP，可能跟竞品有私下关系，也可能只是觉得你的方案威胁到了 Ta 的位置。直接对抗风险太大，无视则项目不可能成功。
【M-可衡量(Measurable)】从 Holden 的四种策略中选 1 种(不是同时)，评估可行性后全力执行。

【A-可实现(Achievable)】(四选一)】
选项 1-中和(Neutralize):找到 Blocker 的顾虑根源。Ta 怕什么?你的方案是否真的伤害了 Ta 的利益?如果是预算冲突，能否给 Ta 一个"不伤害你预算"的替代方案?——Holden 首选策略，成功概率最高。
选项 2-隔离(Isolate):缩小 Blocker 的决策参与范围。让 Ta 的反对影响不到最终拍板人。具体方法:推动决策升级到 N+2 层面，或者把 Ta 关心的部分从本次决策中剥离出去。——Alinsky:"Keep the pressure on, with different tactics."
选项 3-绕开(Bypass):跨级汇报/跨部门推进。Pfeffer:"每个组织中都有第二路径"——找到不经过 Blocker 也能到达 Economic Buyer 的路。
选项 4-转化(Convert):深入了解 Blocker 的动机并转化。这是最难也是最理想的策略——如果成功了你会多一个 Champion;但如果失败了你可能浪费了宝贵的时间资源。

【R-相关(Relevant)& T-时限(Time-bound)】Blocker 的破坏力被有效控制或消除，项目得以继续推进。如果选择了中和/转化策略且成功，原来的 Blocker 可能变成 Mover 甚至 Champion——这是最理想的结果。`,

    `【S-具体(Specific)】你面对的 Blocker 特别难缠——高权力(8-10 分)、高敌对(态度 -4 到 -5)、而且跟决策者(Economic Buyer)有直接通道。中和和隔离都不太可行。
【M-可衡量(Measurable)】采用"绕开+Bystander 联盟"策略——不求消灭 Blocker，只求让 Ta 的反对不影响最终拍板。
【A-可实现(Achievable)】】
1. 找到 Economic Buyer 的另一条信息通道:EB 除了听 Blocker 的意见之外还听谁的?找到那个人，让 Champion 通过那个人向 EB 传递你的信息。Holden 称之为"Second Channel"(第二通道)。
2. 让 Bystander 保持中立:在 Blocker 反对你的时候，确保 Bystander 不跟风反对。Alinsky 原话:"The spectator is not interested in the performance; he is interested in his own safety." 只要 Bystander 不觉得支持你=得罪 Blocker，Ta 们就不会跟风。
3. 做一件让 Blocker"没面子继续反对"的事:比如让你的方案获得行业背书/上级肯定/客户认可——当反对你需要跟更大的力量对抗时，大部分 Blocker 会选择收手。Pfeffer:反对的成本 > 沉默的成本 = Blocker 自然消失。
【R-相关(Relevant)& T-时限(Time-bound)】即使 Blocker 仍在反对，EB 能通过第二通道了解你的真实价值，最终决策不受 Blocker 的影响。`
  ],
  weeklyActions: [
    `诊断 Blocker 类型(Holden 四分类):利益冲突型/个人恩怨型/威胁感型/习惯性反对型——每种对应不同策略`,
    `选定 1 种策略(中和/隔离/绕开/转化)并全力执行，不要同时用多种——Alinsky:"One commitment at a time, one tactic at a time"`,
    `通过 Champion 持续获取 Blocker 的最新动态——Ta 最近的压力来源是什么?Ta 的老板对 Ta 满意吗?Ta 有没有可能在近期离职或调岗?`
  ],
  crossCulture: `【跨文化 Blocker 识别与应对】
- 中国:Blocker 比海外更隐蔽——不直接说"不"，而是无限拖延、反复要求补充材料、或者把决策推给"集体讨论"。识别方法:看进度是否在每次跟你接触后有实质推进。
- 日本:日本 Blocker 永远微笑+说"次回検討(下次再议)"=永远没下次。在日本文化中直接说"不"是禁忌，你需要通过"是否会主动联系你"来判断——如果 Ta 从不主动联系你，Ta 就是 Blocker。
- 德国:德国 Blocker 会给你一份"全面评估"文件——11 页文档列出你方案的所有不合规之处。这时不要试图逐条反驳——找 Champion 帮你解读哪些是真正的问题、哪些是拖延工具。
- 中东:Blocker 口头答应你所有要求，然后完全消失。你需要持续跟进、通过中间人确认、并且确保 Champion 在内部保持存在感。`,
  redLines: [
    `不要同时用 4 种策略——选 1 种，全部资源投入。Alinsky:"The price of a divided attack is defeat"`,
    `Blocker 的破坏力 = Bystander 的 10 倍——Pfeffer 研究证实:负面影响力在组织中的传播速度和破坏力远超正面影响力`,
    `不要公开对抗 Blocker——Holden:一旦变成"你 vs Ta"的公开战，所有中立者都会躲开，而你会发现 Ta 的盟友比你想象的多得多`
  ]
}

const bystanderBase = {
  theory: `【理论根源】
Rules for Radicals (Alinsky): Alinsky 在社区组织中发现:"Most people are spectators in their own drama." —— 大部分人是你故事里的观众，不是演员。Bystander 不关心你赢还是输，只关心自己安不安全。

权力 (Pfeffer): 第 8 章"权力的成本"——Pfeffer 统计:组织中约 40% 的人是纯粹的旁观者。他们不生产权力，只消费"安全的旁观位置"。但 Pfeffer 同时警告:"Bystanders are latent power actors — they activate only when their own interests are directly threatened."(旁观者是潜伏的权力行动者——只有当自己的利益被直接威胁时才会激活。)

Power Base Selling (Holden): "不要在 Bystander 身上浪费你的稀缺资源。" Holden 的核心洞察:Bystander 不是你的目标——但如果你的对手把 Bystander 激活了，你就多了一群你不知道的敌人。`,
  definition: `旁观者/路人——在决策链中存在但不主动参与的人。不帮你也不挡你。不要浪费资源在 Bystander 身上，但必须知道什么会"唤醒"他们。`,
  signals: [
    `沉默——邮件抄送但从不回复、会议中不发言不表态。Pfeffer:"Silence is a form of power preservation"(沉默是权力自保的一种形式)`,
    `偶尔回邮件但不深入——你发 5 封 Ta 回 1 封，内容永远是"收到""谢谢""有空聊"`,
    `会议中坐在角落、不发言、不看你的 PPT——但 Ta 确实在会议室里，说明 Ta 有被邀请的权利`,
    `不阻挡也不推进，纯粹在场——Alinsky:"The spectator is not interested in the performance; he is interested in his own safety."`
  ],
  strategies: [
    `【S-具体(Specific)】你的权力地图上有 2-3 个 Bystander——Ta 们在决策链上，但完全不参与你的项目。你可能会想"要不要主动接触一下"，或者担心"Ta 们会不会突然跳出来反对"。
【M-可衡量(Measurable)】用最少的资源维持 Bystander 的中立状态——不要让 Ta 们被 Blocker 激活，但也不要浪费时间试图转化 Ta 们。
【A-可实现(Achievable)】】
1. 保持最低频率的联系:每季度 1 次简单问候即可。Holden 的核心原则:"Qualify ruthlessly, invest selectively"(无情地筛选，选择性地投入)。
2. 不要给 Bystander 发长篇邮件——Alinsky 警告:"发送=投递=给对方攻击你的素材"。Bystander 本来不管你的事，你给 Ta 发了详细方案之后，Ta 反而有东西可以挑剔了。
3. 关注 Bystander 的变动:升职/调岗/离职/被卷入派系斗争——任何变动都可能改变 Ta 的角色。Pfeffer:"Bystander 常在权力真空期突然行动"。
【R-相关(Relevant)& T-时限(Time-bound)】Bystander 保持中立，不成为你的阻力。如果 Ta 未来变成 Mover 或 Champion，你有一个已经存在的微弱联系可以快速激活。`,
    `【S-具体(Specific)】你发现某个 Bystander 和 Blocker 关系密切——Ta 可能被 Blocker 拉过去成为第二个反对者。或者某个高权力的 Bystander(权力 7+)虽然不表态，但 Ta 如果突然反对你，会带来致命打击。
【M-可衡量(Measurable)】"预防性隔离"——确保 Bystander 不会被 Blocker 激活，同时不引起 Blocker 的警觉。
【A-可实现(Achievable)】】
1. 通过 Champion 定期了解 Bystander 的动态——Ta 对项目的态度有没有变化?Blocker 有没有在私下接触 Ta?
2. 如果发现 Blocker 在拉拢 Bystander:先 Blocker 一步，通过非正式渠道(午餐/咖啡/行业活动)跟 Bystander 接触一次，不是去"争取支持"，而是简单表达"如果你对这个项目有任何疑问我可以随时解答"——Humble(谦逊)是最强的防护工具。
3. 不要让 Bystander 觉得"支持你=得罪 Blocker"。如果这个等式在 Ta 心里成立，Ta 大概率会站在 Blocker 那边——因为 Blocker 看起来比你更有势力。Pfeffer:权力较弱的一方永远需要先证明自己"不会让盟友吃亏"。
【R-相关(Relevant)& T-时限(Time-bound)】Bystander 不被 Blocker 激活，你的反对阵营不会扩大。同时 Bystander 因为你的低调处理，不会对你产生负面印象。`
  ],
  weeklyActions: [
    `季度问候:每 3 个月 1 次简单问候即可——"最近忙什么?有空喝杯咖啡"——不要谈项目，不要谈诉求`,
    `观察变动:Bystander 有没有最近升职/调岗/被卷入什么项目?变动意味着角色可能转变`,
    `不主动发材料:不要给 Bystander 发方案文档/提案/数据——Alinsky 和 Holden 在这点上出奇一致:给旁观者材料=给未来的对手武器`
  ],
  crossCulture: `【跨文化 Bystander 特征】
- 在等级分明文化中(日本/韩国/印度):Bystander 特别多——因为文化规范要求"不在其位不谋其政"。不要误把文化规范当敌意。
- 在关系驱动文化中(中东/拉美/南欧):Bystander 可能只是因为跟你"不熟"——一旦建立了私人关系，可能迅速转化为 Champion。
- 在规则驱动文化中(德国/瑞士/北欧):Bystander 通常是因为"不在我的职责范围内"——不要试图让 Ta 越界支持你，这违背 Ta 的职场规范。`,
  redLines: [
    `不要在 Bystander 身上过度投入——你的精力是稀缺资源。Pfeffer:资源错配是权力失败的第一原因`,
    `不要忽视 Bystander 变动——Ta 的离职/升职/调岗在任何时候都可能改变权力格局`,
    `不要把 Bystander 的沉默误读为支持——沉默就只是沉默，不代表默认、不代表同意、更不代表你"稳了"`
  ]
}

function sceneAdder(scene) {
  if (scene === 'internal') return {
    prefix: `【在职场景专属】`,
    extra: `在职场景核心逻辑(Pfeffer 第 9 章"职场晋升的权力策略"):在组织内部，你的权力不是靠"表现好"获得的，而是靠"有人愿意为你背书"获得的。你的直属领导不一定是你的 Champion——Ta 可能是你的 Blocker。`,
    action: `完成本周的 3 条行动后,发一封简短邮件给你的 Champion,抄送 N+2,汇报进展——不用长篇大论,3 句话足够。Pfeffer 第 6 章:"Visible accomplishment beats invisible excellence."(可见的成果胜过隐形的卓越)。`
  }
  if (scene === 'ka') return {
    prefix: `【KA 客户场景专属】`,
    extra: `KA 场景核心逻辑(Strategic Selling Blue Sheet):在 B2B 大客户销售中,决策链不是一个人而是 3-7 人的 Buying Committee。你的首要任务是识别 Economic Buyer——唯一能拍板预算的人。其他所有人都是影响者。`,
    action: `把本次的策略要点提炼成 4 个版本——EB 版(ROI 导向)、UB 版(好用导向)、TB 版(合规导向)、Coach 版(成就导向)——分别发送。Miller & Heiman 原始方法论:"Don't present; align."(不要展示,要对齐)。`
  }
  if (scene === 'agent') return {
    prefix: `【代理商场景专属】`,
    extra: `代理商场景核心逻辑(Power Base Selling 第 12 章):代理商的权力结构跟直营公司完全不同——老板不一定是真权力。要判断是集权型(老板一人说了算)还是分权型(销售总监/Top Sales 有独立话语权)。`,
    action: `本周内直接加代理商 Top Sales 的微信/WhatsApp,建立独立于代理公司管理层的直接联系。Holden 核心原则:"Never let the intermediary control your access to the end user."(永远不要让中间商控制你接触终端用户的通道)。`
  }
  if (scene === 'job') return {
    prefix: `【求职面试场景专属】`,
    extra: `求职场景核心逻辑(Pfeffer 第 1 章"权力为什么重要"):面试是你第一次实践"权力地图"的场景——你需要在 offer 签字之前就画出目标公司的权力结构。Pfeffer:"The best time to understand the power dynamics of an organization is before you join it."`,
    action: `在 LinkedIn 上找到该岗位的前任,私信问 3 个问题:1)这个岗位最需要的能力是什么?2)直属领导的风格是怎样的?3)公司目前最大的挑战是什么?——这些问题能帮你画出 70% 的 Power Map。`
  }
  return { prefix: '', extra: '', action: '' }
}

function applyScene(role, scene) {
  const r = JSON.parse(JSON.stringify(role))
  const s = sceneAdder(scene)
  r.strategies = r.strategies.map(t => s.prefix + '\n' + s.extra + '\n\n' + t)
  r.weeklyActions = [...r.weeklyActions, s.action]
  return r
}

export const KNOWLEDGE = {
  champion_internal: applyScene(championBase, 'internal'),
  champion_ka: applyScene(championBase, 'ka'),
  champion_agent: applyScene(championBase, 'agent'),
  champion_job: applyScene(championBase, 'job'),
  mover_internal: applyScene(moverBase, 'internal'),
  mover_ka: applyScene(moverBase, 'ka'),
  mover_agent: applyScene(moverBase, 'agent'),
  mover_job: applyScene(moverBase, 'job'),
  blocker_internal: applyScene(blockerBase, 'internal'),
  blocker_ka: applyScene(blockerBase, 'ka'),
  blocker_agent: applyScene(blockerBase, 'agent'),
  blocker_job: applyScene(blockerBase, 'job'),
  bystander_internal: applyScene(bystanderBase, 'internal'),
  bystander_ka: applyScene(bystanderBase, 'ka'),
  bystander_agent: applyScene(bystanderBase, 'agent'),
  bystander_job: applyScene(bystanderBase, 'job')
}
