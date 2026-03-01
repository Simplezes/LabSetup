window.CARS = window.CARS || {};
window.CARS["manufacturer_model_class"] = {
    id: "manufacturer_model_class",
    name: "Manufacturer Model Name (e.g., Porsche 911 GT3 R)",
    setupStructure: [
        {
            group: "Tires & Brakes",
            items: [
                { id: "tpressure_f", name: "Front Tire Pressure", type: "numeric", unit: "kPa", min: 136, max: 210, step: 1, default: 136 },
                { id: "tpressure_r", name: "Rear Tire Pressure", type: "numeric", unit: "kPa", min: 136, max: 210, step: 1, default: 136 },
                { id: "bias", name: "Brake Bias", type: "numeric", unit: "%", min: 43.0, max: 57.0, step: 0.25, default: 50.0 },
                {
                    id: "fbd", name: "Front Brake Duct", type: "labeled",
                    options: [
                        { label: "Open", value: 0.0 },
                        { label: "33%", value: 0.33 },
                        { label: "67%", value: 0.67 },
                        { label: "Closed", value: 1.0 }
                    ],
                    default: 0
                },
                {
                    id: "rbd", name: "Rear Brake Duct", type: "labeled",
                    options: [
                        { label: "Open", value: 0.0 },
                        { label: "33%", value: 0.33 },
                        { label: "67%", value: 0.67 },
                        { label: "Closed", value: 1.0 }
                    ],
                    default: 0
                }
            ]
        },
        {
            group: "Suspension",
            items: [
                { id: "fh", name: "Front Ride Height", type: "numeric", unit: "cm", min: 5.0, max: 10.0, step: 0.1, default: 5.5 },
                { id: "rh", name: "Rear Ride Height", type: "numeric", unit: "cm", min: 5.0, max: 10.0, step: 0.1, default: 6.0 },
                { id: "fs", name: "Front Springs", type: "numeric", min: 1, max: 10, step: 1, default: 5 },
                { id: "rs", name: "Rear Springs", type: "numeric", min: 1, max: 10, step: 1, default: 5 },
                { id: "fpk", name: "Front Packers", type: "numeric", unit: "cm", min: 0.0, max: 5.0, step: 0.1, default: 0.0 },
                { id: "rpk", name: "Rear Packers", type: "numeric", unit: "cm", min: 0.0, max: 5.0, step: 0.1, default: 0.0 },
                { id: "farb", name: "Front ARB", type: "numeric", min: 0, max: 10, step: 1, default: 5 },
                { id: "rarb", name: "Rear ARB", type: "numeric", min: 0, max: 10, step: 1, default: 5 }
            ]
        },
        {
            group: "Dampers",
            items: [
                { id: "fsb", name: "Front Slow Bump", type: "numeric", min: 0, max: 20, step: 1, default: 10 },
                { id: "fsr", name: "Front Slow Rebound", type: "numeric", min: 0, max: 20, step: 1, default: 10 },
                { id: "ffb", name: "Front Fast Bump", type: "numeric", min: 0, max: 20, step: 1, default: 10 },
                { id: "ffr", name: "Front Fast Rebound", type: "numeric", min: 0, max: 20, step: 1, default: 10 },
                { id: "rsb", name: "Rear Slow Bump", type: "numeric", min: 0, max: 20, step: 1, default: 10 },
                { id: "rsr", name: "Rear Slow Rebound", type: "numeric", min: 0, max: 20, step: 1, default: 10 },
                { id: "rfb", name: "Rear Fast Bump", type: "numeric", min: 0, max: 20, step: 1, default: 10 },
                { id: "rfr", name: "Rear Fast Rebound", type: "numeric", min: 0, max: 20, step: 1, default: 10 }
            ]
        },
        {
            group: "Aero & Alignment",
            items: [
                { id: "wing", name: "Rear Wing", type: "numeric", unit: "deg", min: 1.0, max: 10.0, step: 1.0, default: 5.0 },
                { id: "ftoe", name: "Front Toe", type: "numeric", unit: "deg", min: -1.0, max: 1.0, step: 0.1, default: -0.1 },
                { id: "rtoe", name: "Rear Toe", type: "numeric", unit: "deg", min: -1.0, max: 1.0, step: 0.1, default: 0.2 },
                { id: "fcam", name: "Front Camber", type: "numeric", unit: "deg", min: -5.0, max: 0.0, step: 0.1, default: -3.0 },
                { id: "rcam", name: "Rear Camber", type: "numeric", unit: "deg", min: -5.0, max: 0.0, step: 0.1, default: -2.0 }
            ]
        }
    ],
    presets: {
        "Low Downforce": {
            desc: "Minimal wing and low ride height for maximum straight-line speed (e.g., Le Mans, Monza).",
            values: { wing: 1.0, fh: 5.0, rh: 5.5, farb: 4, rarb: 3, bias: 50.5 }
        },
        "High Downforce": {
            desc: "Aggressive wing and balanced rake for maximum cornering speed and technical circuits.",
            values: { wing: 10.0, fh: 5.5, rh: 7.0, farb: 7, rarb: 5, fs: 6, rs: 5 }
        },
        "Understeer": {
            desc: "Safety-first setup. Stiff front and forward bias makes the car highly stable and predictable.",
            values: { farb: 9, rarb: 2, fs: 7, rs: 3, fh: 5.2, rh: 5.5, bias: 54.0, wing: 6.0 }
        },
        "Oversteer": {
            desc: "Pivot-focused setup. Stiff rear and high rake allows the car to rotate aggressively on corner entry.",
            values: { farb: 2, rarb: 9, fs: 3, rs: 7, fh: 5.0, rh: 8.0, bias: 48.5, wing: 4.0 }
        }
    },

};
