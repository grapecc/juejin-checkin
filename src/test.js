const formatMessage = require('./utils/formatMessage.js');
const growth = {
  userName: '张三', // 用户名
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
  benefitList: [{
    lottery_name: 'iPhone 14 Pro Max',
    count: 1,
    today_cap: 1,
  }], // 可兑换奖品数量
}
console.log(formatMessage(growth));