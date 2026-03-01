window.LMA_Utils = {
    getItemConfig: (car, id) => {
        if (!car || !car.setupStructure) return null;
        for (const group of car.setupStructure) {
            const item = group.items.find(i => i.id === id);
            if (item) return item;
        }
        return null;
    },

    getParamRange: (car, id) => {
        let config = window.LMA_Utils.getItemConfig(car, id);
        if (!config && (id === 'tpressure' || id === 'tpressure_f' || id === 'tpressure_r')) {
            config = window.LMA_Utils.getItemConfig(car, 'tpressure_f') ||
                window.LMA_Utils.getItemConfig(car, 'tpressure') ||
                window.LMA_Utils.getItemConfig(car, 'tpressure_r');
        }

        if (config) {
            if (config.type === 'labeled') {
                return { min: 0, max: config.options.length - 1, step: 1 };
            }
            return { min: config.min, max: config.max, step: config.step };
        }
        if (car.ranges && car.ranges[id]) {
            return car.ranges[id];
        }
        return { min: 0, max: 100, step: 1 };
    },

    formatLabel: (car, id, val) => {
        let displayVal = val;
        const config = window.LMA_Utils.getItemConfig(car, id);

        if (config) {
            if (config.reverse && typeof val === 'number') {
                displayVal = (config.max + config.min) - val;
            }

            if (config.type === 'labeled') {
                const opt = config.options[val];
                displayVal = opt !== undefined ? (typeof opt === 'object' ? opt.label : opt) : val;
            } else if (typeof displayVal === 'number') {
                let decimals = 0;
                if (config.step !== undefined) {
                    const stepStr = config.step.toString();
                    decimals = stepStr.indexOf('.') > -1 ? stepStr.split('.')[1].length : 0;
                }
                const unit = config.unit || '';
                if (unit === 'mm' || unit === 'cm') decimals = Math.min(decimals, 1);
                else decimals = Math.min(decimals, 3);
                displayVal = displayVal.toFixed(decimals);
            }

            if (config.unit && typeof displayVal === 'string' && !displayVal.includes(config.unit)) {
                let unit = config.unit;
                if (unit === 'deg') unit = '°';
                displayVal += unit;
            }

            if (config.prefix && typeof displayVal === 'string' && !displayVal.startsWith(config.prefix)) {
                displayVal = config.prefix + displayVal;
            }
        } else if (car.ranges && car.ranges[id]) {
            const range = car.ranges[id];
            if (range.labelPrefix) displayVal = range.labelPrefix + val;
            if (range.labels) displayVal = range.labels[val] || val;
        }

        return displayVal;
    }
};
