const generate_a_bogus = require('./a_bogus.js')

const getAbogus = (req_url, user_agent) => {
  console.log(req_url)
  return generate_a_bogus(req_url, user_agent)
}

const getMsToken = (randomlength = 136) => {
  let randomStr = '';
    const baseStr = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789=';
    const length = baseStr.length - 1;
    for (let i = 0; i < randomlength; i++) {
        const randomIndex = Math.floor(Math.random() * (length + 1));
        randomStr += baseStr[randomIndex];
    }
    return randomStr;
}

const getUuid = (randomlength = 19) => {
  let randomStr = '';
    const baseStr = '0123456789';
    const length = baseStr.length - 1;
    for (let i = 0; i < randomlength; i++) {
        const randomIndex = Math.floor(Math.random() * (length + 1));
        randomStr += baseStr[randomIndex];
    }
    return randomStr;
}

module.exports = {
  getAbogus,
  getUuid,
  getMsToken
}
