'use strict';

const got = require('got');

const api = got.extend({
    prefixUrl: 'http://192.168.6.5:9200',
    retry: {limit: 0},
    headers: {
        Accept: 'application/json'
    },
});

module.exports.test = async () => {
    console.log('hello test')
};

module.exports.getEnv = async (key) => {
    try{
        const body = await api({
            url: 'env/_doc/' + key,
            method: 'GET'
        }).json();
        return body._source.value;
    }catch (e) {
    }
};

module.exports.updateEnv = async (key, value) => {
    try{
        const body = await api({
            url: 'env/env/' + key,
            method: 'POST',
            json:{
                key:key,
                value:value
            }
        }).json();
        return true;
    }catch (e) {
        return false;
    }
};

module.exports.getIp = async () => {
    try{
        let body = await got('http://ip-api.com/json/?lang=zh-CN').json();
        return body;
    }catch (e) {
    }
};