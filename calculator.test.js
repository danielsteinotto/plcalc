import {describe, test} from 'node:test';
import assert from 'node:assert';
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

const balance = 100000;
const entry = 5000;
const quantitiy = 10;

describe('calcAccRiskPct', () => {
    test('calculates account balance loss percentage', () => {
        let l = 1000;
        let r = calcAccRiskPct(balance, l);
        assert.strictEqual(r, 1);
    });
});

describe('calcAccRewardPct', () => {
    test('calculates account balance reward percentage', () => {
        let p = 2000;
        let r = calcAccRewardPct(balance, p);
        assert.strictEqual(r, 2);
    });
});

describe('calcLongPosProfit', () => {
    test('calculates position profit when take profit > entry', () => {
        let tp = entry + 2000;
        let p = calcLongPosProfit(entry, tp, quantitiy);
        assert.strictEqual(p, 20000);
    });

    test('calculates position profit when take profit === entry', () => {
        let tp = entry;
        let p = calcLongPosProfit(entry, tp, quantitiy);
        assert.strictEqual(p, 0);
    });

    test('errors when take profit < entry', () => {
        let tp = entry - 2000;
        let p = calcLongPosProfit(entry, tp, quantitiy);
        assert.strictEqual(p, -1);
    });
});

describe('calcLongPosLoss', () => {
    test('returns loss when stop loss < entry', () => {
        let sl = entry - 1000;
        let p = calcLongPosLoss(entry, sl, quantitiy);
        assert.strictEqual(p, 10000);
    });

    test('returns loss when stop loss === entry', () => {
        let sl = entry;
        let p = calcLongPosLoss(entry, sl, quantitiy);
        assert.strictEqual(p, 0);
    });

    test('errors when stop loss > entry', () => {
        let sl = entry + 1000;
        let p = calcLongPosLoss(entry, sl, quantitiy);
        assert.strictEqual(p, -1);
    });
});

describe('calcLongPosRiskRewardRatio', () => {
    test('returns risk/reward ratio when take profit > entry and stop loss < entry', () => {
        let tp = entry + 2000;
        let sl = entry - 1000;
        let r = calcLongPosRiskRewardRatio(entry, tp, sl, quantitiy);
        assert.strictEqual(r, 2);
    });

    test('errors when take profit < entry', () => {
        let tp = entry - 2000;
        let sl = entry - 1000;
        let r = calcLongPosRiskRewardRatio(entry, tp, sl, quantitiy);
        assert.strictEqual(r, -1);
    });

    test('errors when stop loss > entry', () => {
        let tp = entry + 2000;
        let sl = entry + 1000;
        let r = calcLongPosRiskRewardRatio(entry, tp, sl, quantitiy);
        assert.strictEqual(r, -1);
    });
});

describe('calcShortPosProfit', () => {
    test('calculates position profit when take profit > entry', () => {
        let tp = entry - 2000;
        let p = calcShortPosProfit(entry, tp, quantitiy);
        assert.strictEqual(p, 20000);
    });

    test('calculates position profit when take profit === entry', () => {
        let tp = entry;
        let p = calcShortPosProfit(entry, tp, quantitiy);
        assert.strictEqual(p, 0);
    });

    test('errors when take profit > entry', () => {
        let tp = entry + 2000;
        let p = calcShortPosProfit(entry, tp, quantitiy);
        assert.strictEqual(p, -1);
    });
});

describe('calcShortPosLoss', () => {
    test('returns loss when stop loss > entry', () => {
        let sl = entry + 1000;
        let p = calcShortPosLoss(entry, sl, quantitiy);
        assert.strictEqual(p, 10000);
    });

    test('returns loss when stop loss === entry', () => {
        let sl = entry;
        let p = calcShortPosLoss(entry, sl, quantitiy);
        assert.strictEqual(p, 0);
    });

    test('errors when stop loss < entry', () => {
        let sl = entry - 1000;
        let p = calcShortPosLoss(entry, sl, quantitiy);
        assert.strictEqual(p, -1);
    });
});

describe('calcShortPosRiskRewardRatio', () => {
    test('returns risk/reward ratio when take profit < entry and stop loss > entry', () => {
        let tp = entry - 2000;
        let sl = entry + 1000;
        let r = calcShortPosRiskRewardRatio(entry, tp, sl, quantitiy);
        assert.strictEqual(r, 2);
    });

    test('errors when take profit > entry', () => {
        let tp = entry + 2000;
        let sl = entry + 1000;
        let r = calcLongPosRiskRewardRatio(entry, tp, sl, quantitiy);
        assert.strictEqual(r, -1);
    });

    test('errors when stop loss < entry', () => {
        let tp = entry - 2000;
        let sl = entry - 1000;
        let r = calcLongPosRiskRewardRatio(entry, tp, sl, quantitiy);
        assert.strictEqual(r, -1);
    });
});