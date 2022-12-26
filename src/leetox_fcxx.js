/*
汽车签到
cron 43 7,0 18 * * * leetox_fcxx.js
const $ = new Env('常州市每日房产信息');
*/

const name = '常州市每日房产信息'
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
    let qszsl,xbzsl;
    qszsl = xbzsl = 0;
    let now = new Date();
    let _t = now.getTime();
    const request = {
        url: `https://hy.house0519.com/gsxx/gsxx/getXzqhf?_=${_t}`,
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
        // ,body: "username=admin&password=admin@Dev"
    }
    const { body } = await got.post(request)
    data = JSON.parse(body);
    const {code,msg,dataset} = data

    if(code ==1){
        dataset.rows.forEach(row=>{
            let {NAME,SL} = row;
            qszsl+=SL;

            if(NAME == "新北区"){
                xbzsl = SL;
            }
        });

        //发送通知
        let nowStr = now.toLocaleDateString();
        let text = `${nowStr} \n今日,常州市全市成交${qszsl}套房，其中新北区${xbzsl}套房。`
        console.log(text);
        await notify.sendNotify('常州市每日房产信息',text);
    }
}