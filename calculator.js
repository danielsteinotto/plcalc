export function calcAccRiskPct(balance, loss) {
    if (loss < 0) {
        return -1;
    }
    return (loss / balance) * 100;
}

export function calcAccRewardPct(balance, profit) {
    if (profit < 0) {
        return -1;
    }
    return (profit / balance) * 100;
}

export function calcLongPosProfit(entry, takeProfit, quantity) {
    if (takeProfit < entry) {
        return -1;
    }
    return (takeProfit - entry) * quantity;
}

export function calcLongPosLoss(entry, stopLoss, quantity) {
    if (stopLoss > entry) {
        return -1;
    }
    return (entry - stopLoss) * quantity;
}

export function calcLongPosRiskRewardRatio(entry, takeProfit, stopLoss, quantity) {
    if (takeProfit < entry || stopLoss > entry) {
        return -1;
    }
    let p = calcLongPosProfit(entry, takeProfit, quantity);
    let l = calcLongPosLoss(entry, stopLoss, quantity);
    if (p < 0 || l < 0) {
        return -1;
    }
    return p / l;
}

export function calcShortPosProfit(entry, takeProfit, quantity) {
    if (takeProfit > entry) {
        return -1;
    }
    return (entry - takeProfit) * quantity;
}

export function calcShortPosLoss(entry, stopLoss, quantity) {
    if (stopLoss < entry) {
        return -1;
    }
    return (stopLoss - entry) * quantity;
}

export function calcShortPosRiskRewardRatio(entry, takeProfit, stopLoss, quantity) {
    if (takeProfit > entry || stopLoss < entry) {
        return -1;
    }
    let p = calcShortPosProfit(entry, takeProfit, quantity);
    let l = calcShortPosLoss(entry, stopLoss, quantity);
    if (p < 0 || l < 0) {
        return -1;  
    }
    return p / l;
}