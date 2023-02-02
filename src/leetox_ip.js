/*
刷新IP地址
cron 0 15 * * * * leetox_ip.js
const $ = new Env('刷新IP地址');
*/

const name = '刷新IP地址'
const got = require('got')
const leetox = require('./leetox')
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
    printIp()
}

async function printIp() {
    let now = new Date();
    let houreTask = [6,9,13,20,0].includes(now.getHours()) && now.getMinutes()<5

    const request = {
        url: `https://myip.ipip.net`
    }
    const { body } = await got(request)
    //发送通知
    let nowStr = now.toLocaleDateString();
    let text = `${nowStr},${body}。`

    if(text){
        let end = text.indexOf("来自于")
        text = text.substring(15,end).trim()
        let current = await leetox.getEnv("ppp_ip")
        if(!current || text !=current || houreTask) {
            let message = `${nowStr} 当前IP地址为：${text}`
            console.log(message)
            await notify.sendNotify("IP变更通知",message);
            await leetox.updateEnv("ppp_ip",text)
        } else{
            console.log("IP地址不需要变更通知")
        }
    }
}