'use strict';

const leetox = require('./leetox');

// const envs = leetox.getEnv("ppp_ip")
// console.log(envs)
(async() => {
    const envs = await leetox.getEnv("ppp_ip")
    console.log(envs)
})()
leetox.updateEnv("ppp_ip",'127.0.0.1')