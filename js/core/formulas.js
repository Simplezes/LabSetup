window.LMA_Formulas = {
    clamp: (v, min = 0, max = 100) => Math.max(min, Math.min(max, v)),

    getPt: (angle, val) => {
        const r = (val / 100) * 80;
        const rad = (angle - 90) * (Math.PI / 180);
        return `${100 + r * Math.cos(rad)},${100 + r * Math.sin(rad)}`;
    },

    shapeDamp: (v) => {
        if (!Number.isFinite(v)) return 0.2;
        const sign = v < 0 ? -1 : 1;
        const x = Math.min(1, Math.abs(v));

        const shaped = Math.pow(x, 0.85);
        const out = 0.2 + shaped * 0.8;
        return sign * out;
    }
};
