class Simulator {

    constructor(options = {}) {
        this.options = {};
        this.params = {};
        this.experimentFunction = (() => {});
        this.aggregateFunction = (() => {});
        this.result = {};

        this.experimentContext = {
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

    experiment(experimentFunction) {
        this.experimentFunction = experimentFunction;
        return this;
    }

    aggregate(aggregateFunction) {
        this.aggregateFunction = aggregateFunction;
        return this;
    }

    run(times = 1) {
        this.experimentContext.iterations += times;
        for(let i = 0;i < times;i++) {
            this.experimentFunction(
                this.params, this.experimentContext);
        }
        this.result = this.aggregateFunction(
            this.params, this.experimentContext);

        return this;
    }

    print(message) {
        console.log(message, this.result);
        return this;
    }

}