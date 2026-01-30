
const brackets = [
    { min: 0, max: 150000, fixed: 0, rate: 0, excess: 0 },
    { min: 150000, max: 200000, fixed: 12500, rate: 0.16, excess: 150000 },
    { min: 200000, max: 300000, fixed: 31250, rate: 0.18, excess: 200000 },
    { min: 300000, max: 500000, fixed: 49250, rate: 0.19, excess: 300000 },
    { min: 500000, max: 1000000, fixed: 87250, rate: 0.20, excess: 500000 },
    { min: 1000000, max: 1500000, fixed: 187250, rate: 0.21, excess: 1000000 },
    { min: 1500000, max: 2000000, fixed: 292250, rate: 0.22, excess: 1500000 },
    { min: 2000000, max: 2500000, fixed: 402250, rate: 0.23, excess: 2000000 },
    { min: 2500000, max: 5000000, fixed: 517250, rate: 0.24, excess: 2500000 },
    { min: 5000000, max: 10000000, fixed: 1117250, rate: 0.245, excess: 5000000 },
    { min: 10000000, max: Infinity, fixed: 2342250, rate: 0.25, excess: 10000000 },
];

function calculateIRT(salary) {
    for (const bracket of brackets) {
        if (salary > bracket.min && salary <= bracket.max) {
            const excessAmount = salary - bracket.excess;
            const variablePart = excessAmount * bracket.rate;
            return bracket.fixed + variablePart;
        }
    }
    return 0;
}

// Test boundaries
console.log('150,000:', calculateIRT(150000));
console.log('150,001:', calculateIRT(150001));
console.log('200,000:', calculateIRT(200000));
console.log('200,001:', calculateIRT(200001));
console.log('250,000:', calculateIRT(250000)); // Should be 31250 + (50000 * 0.18) = 31250 + 9000 = 40250
console.log('300,000:', calculateIRT(300000));
