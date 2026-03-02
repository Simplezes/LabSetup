window.CARS = window.CARS || {};

/*
 * =========================================================================
 * FULL CAR SETUP TEMPLATE
 * =========================================================================
 * To add a new car:
 * 1. Copy this file and rename it to your car's ID (e.g., my_new_car.js).
 * 2. Replace "car_id_here" with your car's unique ID on line 12 and 13.
 * 3. Replace "Car Name Here" with the display name of the car.
 * 4. Fill in the setupStructure values according to your car's specifics.
 * 5. Add custom presets at the bottom.
 * 6. Make sure to include this new script in your index.html file!
 * =========================================================================
 */
window.CARS["car_id_here"] = {
    id: "car_id_here",
    name: "Car Name Here",
    setupStructure: [
        {
            group: "Tires & Brakes",
            items: [
                { id: "tpressure_f", name: "Front Tire Pressure", type: "numeric", unit: "kPa", min: 130, max: 210, step: 1, default: 136 },
                { id: "tpressure_r", name: "Rear Tire Pressure", type: "numeric", unit: "kPa", min: 130, max: 210, step: 1, default: 136 },
                { id: "bias", name: "Brake Bias", type: "numeric", unit: "%", min: 40.0, max: 60.0, step: 0.25, default: 50.0 },
                {
                    id: "fbd", name: "Front Brake Duct", type: "labeled",
                    options: [
                        { label: "Open", value: 0.0 },
                        { label: "25mm", value: 0.2 },
                        { label: "50mm", value: 0.4 },
                        { label: "75mm", value: 0.6 },
                        { label: "100mm", value: 0.8 },
                        { label: "125mm", value: 0.9 },
                        { label: "Closed", value: 1.0 }
                    ],
                    default: 0
                },
                {
                    id: "rbd", name: "Rear Brake Duct", type: "labeled",
                    options: [
                        { label: "Open", value: 0.0 },
                        { label: "25mm", value: 0.2 },
                        { label: "50mm", value: 0.4 },
                        { label: "75mm", value: 0.6 },
                        { label: "100mm", value: 0.8 },
                        { label: "125mm", value: 0.9 },
                        { label: "Closed", value: 1.0 }
                    ],
                    default: 0
                }
            ]
        },
        {
            group: "Suspension",
            items: [
                { id: "fh", name: "Front Ride Height", type: "numeric", unit: "cm", min: 4.0, max: 8.0, step: 0.1, default: 5.0 },
                { id: "rh", name: "Rear Ride Height", type: "numeric", unit: "cm", min: 4.0, max: 12.0, step: 0.1, default: 6.0 },
                { id: "fs", name: "Front Springs", type: "numeric", min: 1, max: 10, step: 1, default: 5 },
                { id: "rs", name: "Rear Springs", type: "numeric", min: 1, max: 10, step: 1, default: 5 },
                { id: "fpk", name: "Front Packers", type: "numeric", unit: "cm", min: 0.0, max: 5.0, step: 0.1, default: 0.0 },
                { id: "rpk", name: "Rear Packers", type: "numeric", unit: "cm", min: 0.0, max: 5.0, step: 0.1, default: 0.0 },
                {
                    id: "farb", name: "Front ARB", type: "labeled",
                    // Example mapping discrete settings to labels and values dynamically
                    // e.g. "D1-D1 (Soft)", "D1-D2", ...
                    options: ["1 (Soft)", "2", "3", "4", "5", "6 (Hard)"].map((l, i) => ({ label: l, value: i })),
                    default: 2
                },
                {
                    id: "rarb", name: "Rear ARB", type: "labeled",
                    options: ["1 (Soft)", "2", "3", "4", "5", "6 (Hard)"].map((l, i) => ({ label: l, value: i })),
                    default: 2
                }
            ]
        },
        {
            group: "Dampers",
            items: [
                { id: "fsb", name: "Front Slow Bump", type: "numeric", min: 0, max: 15, step: 1, default: 5 },
                { id: "fsr", name: "Front Slow Rebound", type: "numeric", min: 0, max: 15, step: 1, default: 5 },
                { id: "ffb", name: "Front Fast Bump", type: "numeric", min: 0, max: 15, step: 1, default: 5 },
                { id: "ffr", name: "Front Fast Rebound", type: "numeric", min: 0, max: 15, step: 1, default: 5 },
                { id: "rsb", name: "Rear Slow Bump", type: "numeric", min: 0, max: 15, step: 1, default: 5 },
                { id: "rsr", name: "Rear Slow Rebound", type: "numeric", min: 0, max: 15, step: 1, default: 5 },
                { id: "rfb", name: "Rear Fast Bump", type: "numeric", min: 0, max: 15, step: 1, default: 5 },
                { id: "rfr", name: "Rear Fast Rebound", type: "numeric", min: 0, max: 15, step: 1, default: 5 }
            ]
        },
        {
            group: "Aero & Alignment",
            items: [
                // Wing can be numeric or labeled
                { id: "wing", name: "Rear Wing", type: "numeric", unit: "deg", min: 0.0, max: 13.0, step: 1.0, default: 5.0 },
                // Another variation for wing you might need:
                // { id: "ldwing", name: "Rear Wing", type: "labeled", unit: "deg", options: [1.0, 2.0, 3.0].map(v => ({ label: `${v} deg`, value: v })), default: 0 },

                { id: "ftoe", name: "Front Toe", type: "numeric", unit: "deg", min: -1.0, max: 1.0, step: 0.05, default: -0.10 },
                { id: "rtoe", name: "Rear Toe", type: "numeric", unit: "deg", min: -1.0, max: 1.0, step: 0.05, default: 0.10 },
                { id: "fcam", name: "Front Camber", type: "numeric", unit: "deg", min: -5.0, max: -1.0, step: 0.1, default: -2.0 },
                { id: "rcam", name: "Rear Camber", type: "numeric", unit: "deg", min: -4.0, max: -0.5, step: 0.1, default: -1.5 }
            ]
        }
    ],
    presets: {
        "Default Setup": {
            desc: "The standard factory setup as a baseline.",
            values: {
                // Group 1
                tpressure_f: 136, tpressure_r: 136, bias: 50.0, fbd: 0, rbd: 0,
                // Group 2
                fh: 5.0, rh: 6.0, fs: 5, rs: 5, fpk: 0.0, rpk: 0.0, farb: 2, rarb: 2,
                // Group 3
                fsb: 5, fsr: 5, ffb: 5, ffr: 5, rsb: 5, rsr: 5, rfb: 5, rfr: 5,
                // Group 4
                wing: 5.0, ftoe: -0.10, rtoe: 0.10, fcam: -2.0, rcam: -1.5
            }
        },
        "High Downforce": {
            desc: "More wing, tweaked ride height and suspension for high grip.",
            values: { wing: 10.0, fh: 5.5, rh: 7.0, fs: 4, rs: 6 }
        }
    }
};
