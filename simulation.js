class Simulation {

    constructor(options = {}) {
        this.options = {};
        this.interval = undefined;
        this.intervalTime = 1;

        this.buildSimulation();
    }

    buildSimulation() {
        this.parametersGetter = (() => {});
        this.experiment = (() => {});
        this.aggregate = (() => {});

        this.experimentContext = {
            random: (dimension = 1) => (min = 0, max = 1) => {
                let result = [];
                for(let i = 0;i < dimension;i++) {
                    result.push(Math.random() * max + min);
                }

                return result;
            },
            iterations: 1,
            iteration: 0,
            experimentCount: 0,
            histograma: {},
            stats: { histograma: {} }
        };
    }

    setIterations(iterations) {
        this.experimentContext.iterations = iterations;
        return this;
    }

    setParameters(parametersGetter) {
        this.parametersGetter = parametersGetter;
        return this;
    }

    setExperiment(experiment) {
        this.experiment = experiment;
        return this;
    }

    setAggregate(aggregate) {
        this.aggregate = aggregate;
        return this;
    }

    static setter(object, handler, initial) {
        if(object) {
            handler(object !== undefined);
        }
        else object = initial;
    }

    collectStats() {
        for(let paramName in this.experimentContext.histograma) {
            setter(this.experimentContext.stats.histograma[paramName],
                (singleHistograma) => setter(singleHistograma,
                    (value) => value++, 0), {});
        }
    }

    runWhile(handler) {
        this.interval = setInterval(() => {
            if(handler(this.parameters, this.experimentContext)) {
                this.singleRun(this.parametersGetter());
                this.experimentContext.experimentCount++;
            } else {
                clearInterval(this.interval);
            }
        }, 0);
        
        return this;
    }

    singleRun(parameters) {
        for(let i = 0;i < this.experimentContext.iterations;i++) {
            this.experiment(parameters, this.experimentContext);
            this.collectStats();
            this.experimentContext.iteration++;
        }
        this.aggregate(parameters, this.experimentContext);

        return this;
    }

}