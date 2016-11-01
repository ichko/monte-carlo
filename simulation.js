class Simulation {

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
            iterations: 0,
            histograma: {},
            stats: { histograma: {} }
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

    collectStats() {
        for(let paramName in this.experimentContext.histograma) {
            let hystogramaResult = this.experimentContext.histograma[paramName];
            if(hystogramaResult) {
                if(!this.experimentContext.stats.histograma[paramName]) {
                    this.experimentContext.stats.histograma[paramName] = {};
                }

                if(this.experimentContext.stats.histograma[paramName][hystogramaResult] !== undefined) {
                    this.experimentContext.stats.histograma[paramName][hystogramaResult]++;
                } else {
                    this.experimentContext.stats.histograma[paramName][hystogramaResult] = 0;
                }
            }
        }
    }

    run(totalIterations = 1) {
        this.experimentContext.iterations += totalIterations;
        for(let i = 0;i < totalIterations;i++) {
            this.experimentFunction(
                this.params, this.experimentContext);
            this.collectStats();
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