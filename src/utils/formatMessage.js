const { marked } = require('marked');

const messageTemplate = (growth) => {
  const template = `
Hello ${growth.userName}\n
签到状态：${growth.checkedIn ? `**签到 +${growth.incrPoint} 矿石**` : '今日已签到'}\n
当前矿石数：**${growth.sumPoint}**\n
连续签到天数：**${growth.contCount}**\n
累计签到天数：**${growth.sumCount}**\n
当前幸运值：**${growth.luckyValue}**\n
免费抽奖次数：**${growth.freeCount}**次 | ${growth.freeDrawed ? `**恭喜抽中 ${growth.lotteryName}🎉**` : '今日已免费抽奖'}\n
<p><details><summary>当前矿石可兑换物品：</summary>
<ul>
${growth.benefitList.map((item) => {
    return `<li>${item.lottery_name}：<strong>🧊${item.count}</strong> <strong>🫙${item.today_cap}</strong></li>`
  }).join("")}
</ul></details></p>异常信息：${growth.catchException ? `${growth.error}` : '暂无'}\n
`
  return marked(template.trim())
}

module.exports = messageTemplate;