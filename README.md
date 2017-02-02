# Monte Carlo experiments

# Simulation runner
```javascript
let simulation = new Simulation()
    .setParameters(() => ({
        hits: 0
    }))

    .setExperiment((params, { random }) => {
        let [ x, y ] = random(2)();
        params.hits += Math.sqrt(x ** 2 + y ** 2) < 1;
    })

    .setAggregate(({ hits }, { iterations }) => {
        let pi = hits / iterations * 4;
        console.log(`${ pi.toFixed(4) } - estimated value of PI`);
    })

    .setIterations(30000)

    .runWhile((_, { experimentCount }) =>
        experimentCount < 10);
```

# Useful links
 - https://www.khanacademy.org/partner-content/lebron-asks-subject/lebron-asks/v/monte-carlo-simulation-to-answer-lebron-s-question
 - https://en.wikipedia.org/wiki/Monte_Carlo_method#Introduction
