const axios = require('axios')
const { PUSHPLUS_TOKEN } = require('../ENV.js')
const SUCCESS_CODE = 200

const pushplus = async ({ title = '', content = '' } = {}) => {
  console.log(content);

  try {
    await axios
      .post('https://www.pushplus.plus/api/send', {
        token: PUSHPLUS_TOKEN,
        template: 'html',
        title,
        channel: "wechat",
        content,
      }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then(response => {
        if (response?.data?.code !== SUCCESS_CODE) {
          throw new Error(response?.data?.msg)
        }
      })
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = pushplus