/*
刷新IP地址
cron 0 15 * * * * leetox_ip.js
const $ = new Env('刷新IP地址');
*/

const name = '刷新IP地址'
const got = require('got')
const leetox = require('./leetox')
const notify = require('./sendNotify')
const moment = require('moment')

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
    printIp()
}

async function printIp() {
    let now = new Date();
    let houreTask = [6,9,13,20,0].includes(now.getHours()) && now.getMinutes()<5

    //发送通知
    let nowStr = moment(now).format(leetox.YYYYMMDDhhmmss)
    console.log(nowStr)
    let ipJson = await leetox.getIp()
    let {city,query} = ipJson
    let message = `${nowStr} 当前IP地址为：${query} ${city}`
    console.log(message)
    if(query){
        let current = await leetox.getEnv("ppp_ip")
        if(!current || query !=current || houreTask) {
            await notify.sendNotify("IP变更通知",message);
            await leetox.updateEnv("ppp_ip",query)
        } else{
            console.log("IP地址不需要变更通知")
        }
    }
}