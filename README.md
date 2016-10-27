# Monte Carlo experiments

# Useful links
 - https://www.khanacademy.org/partner-content/lebron-asks-subject/lebron-asks/v/monte-carlo-simulation-to-answer-lebron-s-question
 - https://en.wikipedia.org/wiki/Monte_Carlo_method#Introduction

# Simulation runner
```javascript
let simulator = new Simulator()

    .parameters({
        hits: 0
    })

    .experiment((parameters, { random }) => {
        let [ x, y ] = random(2)();
        if(Math.sqrt(x * x + y * y) < 1) {
            parameters.hits++;
        }
    })

    .aggregate(({ hits }, { iterations }) => {
        return hits / iterations * 4
    })

    .run(30000)
    .print('Estimation of PI:'); // Estimation of PI: 3.1448
```