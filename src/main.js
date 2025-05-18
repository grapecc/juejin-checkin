const Juejin = require('./juejin/index.js')
const pushMessage = require('./utils/pushMessage.js')
const formatMessage = require('./utils/formatMessage.js');
const { COOKIE } = require('./ENV.js')

const growth = {
  userName: '', // 用户名
  checkedIn: false, // 是否签到
  incrPoint: 0, // 签到获得矿石数
  sumPoint: 0, // 总矿石数
  contCount: 0, // 连续签到天数
  sumCount: 0, // 累计签到天数
  dipValue: 0, // 幸运值
  luckyValue: 0, // 总幸运值
  freeCount: 0, // 免费抽奖次数
  freeDrawed: false, // 是否免费抽奖
  lotteryName: '', // 奖品名称
  benefitList: [], // 可兑换奖品数量
}

const main = async () => {
  const juejin = new Juejin()

  // 登录
  try {
    await juejin.login(COOKIE)

    growth.userName = juejin.user.user_name
  } catch {
    throw new Error('登录失败, 请尝试更新 Cookies')
  }

  // 签到
  const checkIn = await juejin.getTodayStatus()

  if (!checkIn?.check_in_done) {
    const checkInResult = await juejin.checkIn()

    growth.checkedIn = true
    growth.incrPoint = checkInResult.incr_point
  }

  // 签到天数
  const counts = await juejin.getCounts()

  growth.contCount = counts.cont_count
  growth.sumCount = counts.sum_count

  // 查询幸运值
  const luckyValueResult = await juejin.getLucky()
  if (luckyValueResult) {
    growth.luckyValue = luckyValueResult.total_value
  }

  // 免费抽奖
  const lotteryConfig = await juejin.getLotteryConfig()
  growth.freeCount = lotteryConfig.free_count || 0

  if (growth.freeCount > 0) {
    const lottery = await juejin.drawLottery()
    growth.freeDrawed = true
    growth.lotteryName = lottery.lottery_name
  }

  // 当前矿石数
  growth.sumPoint = await juejin.getCurrentPoint()

  // 查询矿石可兑换物品
  const benefitPageResult = await juejin.getBenefitPage() || [];
  growth.benefitList = benefitPageResult
    .filter(b => b.benefit_config && b.benefit_config.count <= growth.sumPoint)
    .map(({ benefit_config, today_cap }) => ({
      lottery_name: benefit_config.lottery_name,
      lottery_image: benefit_config.lottery_image,
      count: benefit_config.count,
      today_cap
    }));


  pushMessage({
    type: 'info',
    message: formatMessage(growth),
  })

}

main().catch(error => {
  growth.catchException = true
  growth.error = error
  pushMessage({
    type: 'info',
    message: formatMessage(growth),
  })
})
