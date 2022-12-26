/*
汽车签到
cron 43 7,0/5 * * * * IP地址刷新通知.js
const $ = new Env('IP地址刷新通知');
*/

const name = '常州市房产每日房产信息'
const got = require('got')
const notify = require('./sendNotify')

!(async () => {
  await main()
})()
    .catch((e) => {
      console.error(`${name} 错误 :${e.stack}`)
    })
    .finally(() => {
      console.log(`${name} finish`)
    })

async function main() {
  printFcxx()
}

async function printFcxx() {
  const request = {
    url: `https://hy.house0519.com/gsxx/gsxx/getXzqhf?_=1672031544643`,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
    // ,body: "username=admin&password=admin@Dev"
  }
  const { body } = await got.post(request)
  console.log(body)
  return body
}