import fastify from 'fastify';
import {getAccBalance} from './saxo.js';
import {
    calcAccRiskPct,
    calcAccRewardPct,
    calcLongPosProfit,
    calcLongPosLoss,
    calcLongPosRiskRewardRatio,
    calcShortPosProfit,
    calcShortPosLoss,
    calcShortPosRiskRewardRatio,
} from './calculator.js';

const api = fastify();
const port = 3000;

api.get('/v1/calculate', async r => {
    let {type, entry, takeProfit, stopLoss, quantity} = r.query;
    entry = parseFloat(entry);
    takeProfit = parseFloat(takeProfit);
    stopLoss = parseFloat(stopLoss);
    quantity = parseInt(quantity);

    let b = 0.00;
    await getAccBalance().then(r => {
        b = r;
    }).catch(e => console.error(e));

    if (type === 'buy') {
        let p = calcLongPosProfit(entry, takeProfit, quantity);
        let l = calcLongPosLoss(entry, stopLoss, quantity);
        return {
            profit: p,
            loss: l,
            riskRewardRatio: calcLongPosRiskRewardRatio(entry, takeProfit, stopLoss, quantity),
            accountLossPct: calcAccRiskPct(b, l),
            accountGainPct: calcAccRewardPct(b, p)
        };
    } else {
        let p = calcShortPosProfit(entry, takeProfit, quantity);
        let l = calcShortPosLoss(entry, stopLoss, quantity);
        return {
            profit: p,
            loss: l,
            riskRewardRatio: calcShortPosRiskRewardRatio(entry, takeProfit, stopLoss, quantity),
            accountLossPct: calcAccRiskPct(b, l),
            accountGainPct: calcAccRewardPct(b, p)
        };
    }
});

api.listen({port}).then(() => {
    console.log(`Listening on port ${port}`);
}).catch(e => {
    throw e;
});