window.LMU_Formulas = {
    getThermalGrip: (t, profile) => {
        const { lo, hi, degrade, peak } = profile;
        if (t < 50) return 0.68;
        if (t < lo) return 0.68 + ((t - 50) / Math.max(lo - 50, 1)) * (peak - 0.68);
        if (t <= hi) return peak;
        const over = t - hi;
        return Math.max(0.55, peak - over * degrade - (over > 12 ? (over - 12) * degrade * 1.8 : 0));
    },

    getStandardizedDelta: (car, defaults, id, rawVal) => {
        if (!window.LMA_Utils) return 0;
        const currentStd = window.LMA_Utils.getStandardizedValue(car, id, rawVal);
        const defaultStd = window.LMA_Utils.getStandardizedValue(car, id, defaults[id]);

        const UNIT_RANGES = {
            'spring': 100,
            'wing': 10,
            'length': 5,
            'angle': 5
        };

        const config = window.LMA_Utils.getItemConfig(car, id);
        const unit = config ? config.unit : '';

        let divisor = 1;
        if (id.includes('s') && !id.includes('sb') && !id.includes('sr')) divisor = UNIT_RANGES.spring;
        else if (id === 'wing') divisor = UNIT_RANGES.wing;
        else if (unit === 'cm' || unit === 'mm') divisor = UNIT_RANGES.length;
        else if (unit === 'deg') divisor = UNIT_RANGES.angle;
        else {
            const r = window.LMA_Utils.getParamRange(car, id);
            divisor = Math.abs(r.max - r.min) || 1;
        }

        return (currentStd - defaultStd) / divisor;
    },

    getPhysVal: (id, sliderVal, car) => {
        if (id === 'df') return 0.5 + (sliderVal * 0.5);
        if (id === 'grip') return 0.6 + (sliderVal * 0.4);
        if (id === 'turnin') return 0.4 + (sliderVal * 0.6);
        if (id === 'bumps') return 0.3 + (sliderVal * 0.7);

        if (window.LMA_Utils) {
            const config = window.LMA_Utils.getItemConfig(car, id);
            if (config && config.type === 'labeled') {
                const opt = config.options[sliderVal];
                return (typeof opt === 'object' && opt.value !== undefined) ? opt.value : sliderVal;
            }
        }
        return sliderVal;
    }
};
