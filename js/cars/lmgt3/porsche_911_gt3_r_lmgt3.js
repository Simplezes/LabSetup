window.CARS = window.CARS || {};
window.CARS["porsche_911_gt3_r_lmgt3"] = {
    id: "porsche_911_gt3_r_lmgt3",
    name: "Porsche 911 GT3 R LMGT3",
    setupStructure: [
        {
            group: "Tires & Brakes",
            items: [
                { id: "tpressure_f", name: "Front Tire Pressure", type: "numeric", unit: "kPa", min: 136, max: 210, step: 1, default: 136 },
                { id: "tpressure_r", name: "Rear Tire Pressure", type: "numeric", unit: "kPa", min: 136, max: 210, step: 1, default: 136 },
                { id: "bias", name: "Brake Bias", type: "numeric", unit: "%", min: 43.0, max: 57.0, step: 0.25, default: 48.8 },
                {
                    id: "fbd", name: "Front Brake Duct", type: "labeled",
                    options: [
                        { label: "Open", value: 0.0 },
                        { label: "20mm", value: 0.2 },
                        { label: "40mm", value: 0.4 },
                        { label: "60mm", value: 0.6 },
                        { label: "80mm", value: 0.8 },
                        { label: "Closed", value: 1.0 }
                    ],
                    default: 0
                },
                {
                    id: "rbd", name: "Rear Brake Duct", type: "labeled",
                    options: [
                        { label: "Open", value: 0.0 },
                        { label: "20mm", value: 0.2 },
                        { label: "40mm", value: 0.4 },
                        { label: "60mm", value: 0.6 },
                        { label: "80mm", value: 0.8 },
                        { label: "Closed", value: 1.0 }
                    ],
                    default: 0
                }
            ]
        },
        {
            group: "Suspension",
            items: [
                { id: "fh", name: "Front Ride Height", type: "numeric", unit: "cm", min: 5.0, max: 8.0, step: 0.1, default: 5.2 },
                { id: "rh", name: "Rear Ride Height", type: "numeric", unit: "cm", min: 5.0, max: 10.0, step: 0.1, default: 6.9 },
                { id: "fs", name: "Front Springs", type: "numeric", min: 1, max: 15, step: 1, default: 5 },
                { id: "rs", name: "Rear Springs", type: "numeric", min: 1, max: 15, step: 1, default: 2 },
                { id: "fpk", name: "Front Packers", type: "numeric", unit: "cm", min: 0.0, max: 4.0, step: 0.1, default: 0.0 },
                { id: "rpk", name: "Rear Packers", type: "numeric", unit: "cm", min: 0.0, max: 4.0, step: 0.1, default: 0.0 },
                { id: "farb", name: "Front ARB", type: "numeric", min: 0, max: 7, step: 1, default: 5 },
                { id: "rarb", name: "Rear ARB", type: "numeric", min: 0, max: 7, step: 1, default: 1 }
            ]
        },
        {
            group: "Dampers",
            items: [
                { id: "fsb", name: "Front Slow Bump", type: "numeric", min: 0, max: 18, step: 1, default: 7, reverse: true },
                { id: "fsr", name: "Front Slow Rebound", type: "numeric", min: 0, max: 18, step: 1, default: 11, reverse: true },
                { id: "ffb", name: "Front Fast Bump", type: "numeric", min: 0, max: 18, step: 1, default: 11, reverse: true },
                { id: "ffr", name: "Front Fast Rebound", type: "numeric", min: 0, max: 18, step: 1, default: 11, reverse: true },
                { id: "rsb", name: "Rear Slow Bump", type: "numeric", min: 0, max: 18, step: 1, default: 8, reverse: true },
                { id: "rsr", name: "Rear Slow Rebound", type: "numeric", min: 0, max: 18, step: 1, default: 11, reverse: true },
                { id: "rfb", name: "Rear Fast Bump", type: "numeric", min: 0, max: 18, step: 1, default: 14, reverse: true },
                { id: "rfr", name: "Rear Fast Rebound", type: "numeric", min: 0, max: 18, step: 1, default: 14, reverse: true }
            ]
        },
        {
            group: "Aero & Alignment",
            items: [
                { id: "wing", name: "Rear Wing", type: "numeric", unit: "deg", min: 6.3, max: 12.3, step: 1.0, default: 7.3 },
                { id: "ftoe", name: "Front Toe", type: "numeric", unit: "deg", min: -1.003, max: 1.003, step: 0.0626875, default: 0.000 },
                { id: "rtoe", name: "Rear Toe", type: "numeric", unit: "deg", min: -1.0003, max: 1.0003, step: 0.0626875, default: 0.251 },
                { id: "fcam", name: "Front Camber", type: "numeric", unit: "deg", min: -4.4, max: -1.8, step: 0.1, default: -2.0 },
                { id: "rcam", name: "Rear Camber", type: "numeric", unit: "deg", min: -4.4, max: -1.4, step: 0.1, default: -1.5 }
            ]
        }
    ],
    presets: {

    }
};
