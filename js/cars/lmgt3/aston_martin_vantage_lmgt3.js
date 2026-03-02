window.CARS = window.CARS || {};
window.CARS["aston_martin_vantage_lmgt3"] = {
    id: "aston_martin_vantage_lmgt3",
    name: "Aston Martin Vantage LMGT3",
    setupStructure: [
        {
            group: "Tires & Brakes",
            items: [
                { id: "tpressure_f", name: "Front Tire Pressure", type: "numeric", unit: "kPa", min: 136, max: 210, step: 1, default: 136 },
                { id: "tpressure_r", name: "Rear Tire Pressure", type: "numeric", unit: "kPa", min: 136, max: 210, step: 1, default: 136 },
                { id: "bias", name: "Brake Bias", type: "numeric", unit: "%", min: 43.0, max: 57.0, step: 0.25, default: 49.5 },
                {
                    id: "fbd", name: "Front Brake Duct", type: "labeled",
                    options: ["Open", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "Closed"].map((label, i) => ({ label, value: i * 0.1 })),
                    default: 0
                },
                {
                    id: "rbd", name: "Rear Brake Duct", type: "labeled",
                    options: ["Open", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "Closed"].map((label, i) => ({ label, value: i * 0.1 })),
                    default: 0
                }
            ]
        },
        {
            group: "Suspension",
            items: [
                { id: "fh", name: "Front Ride Height", type: "numeric", unit: "cm", min: 5.0, max: 8.5, step: 0.1, default: 5.6 },
                { id: "rh", name: "Rear Ride Height", type: "numeric", unit: "cm", min: 5.0, max: 10.0, step: 0.1, default: 6.8 },
                { id: "fs", name: "Front Springs", type: "numeric", min: 1, max: 6, step: 1, default: 4 },
                { id: "rs", name: "Rear Springs", type: "numeric", min: 1, max: 6, step: 1, default: 2 },
                { id: "fpk", name: "Front Packers", type: "numeric", unit: "cm", min: 0.0, max: 5.0, step: 0.1, default: 0.0 },
                { id: "rpk", name: "Rear Packers", type: "numeric", unit: "cm", min: 0.0, max: 6.0, step: 0.1, default: 0.0 },
                { id: "farb", name: "Front ARB", type: "numeric", min: 0, max: 18, step: 1, default: 6 },
                { id: "rarb", name: "Rear ARB", type: "numeric", min: 0, max: 18, step: 1, default: 2 }
            ]
        },
        {
            group: "Dampers",
            items: [
                { id: "fsb", name: "Front Slow Bump", type: "numeric", min: 1, max: 41, step: 1, default: 20, prefix: "B", reverse: true },
                { id: "fsr", name: "Front Slow Rebound", type: "numeric", min: 1, max: 41, step: 1, default: 14, prefix: "R", reverse: true },
                { id: "ffb", name: "Front Fast Bump", type: "numeric", min: 1, max: 51, step: 1, default: 44, prefix: "B", reverse: true },
                { id: "ffr", name: "Front Fast Rebound", type: "numeric", min: 1, max: 51, step: 1, default: 48, prefix: "R", reverse: true },
                { id: "rsb", name: "Rear Slow Bump", type: "numeric", min: 1, max: 41, step: 1, default: 22, prefix: "B", reverse: true },
                { id: "rsr", name: "Rear Slow Rebound", type: "numeric", min: 1, max: 41, step: 1, default: 14, prefix: "R", reverse: true },
                { id: "rfb", name: "Rear Fast Bump", type: "numeric", min: 1, max: 51, step: 1, default: 44, prefix: "B", reverse: true },
                { id: "rfr", name: "Rear Fast Rebound", type: "numeric", min: 1, max: 51, step: 1, default: 46, prefix: "R", reverse: true }
            ]
        },
        {
            group: "Aero & Alignment",
            items: [
                { id: "wing", name: "Rear Wing", type: "numeric", unit: "deg", min: 5.0, max: 11.0, step: 1.0, default: 6.0 },
                { id: "ftoe", name: "Front Toe", type: "numeric", unit: "deg", min: -0.99, max: 0.99, step: 0.061875, default: -0.06 },
                { id: "rtoe", name: "Rear Toe", type: "numeric", unit: "deg", min: -0.99, max: 0.99, step: 0.061875, default: 0.25 },
                { id: "fcam", name: "Front Camber", type: "numeric", unit: "deg", min: -5.0, max: -1.8, step: 0.1, default: -2.0 },
                { id: "rcam", name: "Rear Camber", type: "numeric", unit: "deg", min: -3.8, max: -1.0, step: 0.1, default: -1.6 }
            ]
        }
    ],
    presets: {

    }
};
