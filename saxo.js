import https from 'node:https';

const apiUri = process.env.SAXO_TRADER_API_URI || 'https://gateway.saxobank.com/sim/openapi/port/';
const apiVersion = process.env.SAXO_TRADER_API_VERSION || 'v1';
const apiToken = process.env.SAXO_TRADER_API_TOKEN;

function request(method, path) {
    return new Promise((ok, err) => {
        let o = new URL(apiUri + apiVersion + path);
        o.method = method;
        o.headers = {
            'Authorization': 'Bearer ' + apiToken
        };
        let r = https.request(o, (r) => {
            let s = '';
            r.on('data', (d) => {
                s += d;
            });
            r.on('end', () => {
                let j = JSON.parse(s);
                ok(j);
            });
        });
        r.on('error', (e) => {
            err(e);
        });
        r.end();
    });
}

export function getAccBalance() {
    return new Promise((ok, err) => {
        request('GET', '/balances/me').then(j => {
            ok(j.CashBalance);
        }).catch(e => {
            err(e);
        });
    });
};

export function getAccCurrency() {
    return new Promise((ok, err) => {
        request('GET', '/balances/me').then(j => {
            ok(j.Currency);
        }).catch(e => {
            err(e);
        });
    });
};