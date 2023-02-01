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
        if(!current || text !=current){
            await notify.sendNotify('刷新IP地址',text);
            await leetox.updateEnv("ppp_ip",text)
        }
    }

}