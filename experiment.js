class Experiment {

    constructor(options = {}) {
        this.options = {};
        this.params = {};
        this.simulationFunction = (() => {});
        this.aggregateFunction = (() => {});
        this.result = {};

        this.simulationContext = {
            random: (dimension = 1) => (min = 0, max = 1) => {
                let result = [];
                for(let i = 0;i < dimension;i++) {
                    result.push(Math.random() * max + min);
                }

                return result;
            },
            iterations: 0
        };
    }

    parameters(params) {
        this.params = params;
        return this;
    }

    simulation(simulationFunction) {
        this.simulationFunction = simulationFunction;
        return this;
    }

    aggregate(aggregateFunction) {
        this.aggregateFunction = aggregateFunction;
        return this;
    }

    run(times = 1) {
        this.simulationContext.iterations += times;
        for(let i = 0;i < times;i++) {
            this.simulationFunction(
                this.params, this.simulationContext);
        }
        this.result = this.aggregateFunction(
            this.params, this.simulationContext);

        return this;
    }

    print(message) {
        console.log(message, this.result);
        return this;
    }

}

let experiment = new Experiment()
    .parameters({
        hits: 0
    })
    .simulation((parameters, { random }) => {
        let [ x, y ] = random(2)();
        if(Math.sqrt(x * x + y * y) < 1) {
            parameters.hits++;
        }
    })
    .aggregate(({ hits }, { iterations }) => hits / iterations * 4)
    .run(30000)
    .print('Estimation of PI:');
