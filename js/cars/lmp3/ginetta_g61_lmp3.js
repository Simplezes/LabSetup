window.CARS = window.CARS || {};
window.CARS["ginetta_g61_lmp3"] = {
    id: "ginetta_g61_lmp3",
    name: "Ginetta G61-LM P3",
    setupStructure: [
        {
            group: "Tires & Brakes",
            items: [
                { id: "tpressure_f", name: "Front Tire Pressure", type: "numeric", unit: "kPa", min: 150, max: 196, step: 1, default: 150 },
                { id: "tpressure_r", name: "Rear Tire Pressure", type: "numeric", unit: "kPa", min: 150, max: 196, step: 1, default: 150 },
                { id: "bias", name: "Brake Bias", type: "numeric", unit: "%", min: 35.0, max: 65.0, step: 0.25, default: 51.5 },

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
                { id: "fh", name: "Front Ride Height", type: "numeric", unit: "mm", min: 40.0, max: 60.0, step: 0.5, default: 45.5 },
                { id: "rh", name: "Rear Ride Height", type: "numeric", unit: "mm", min: 50.0, max: 90.0, step: 0.5, default: 66.0 },
                { id: "fs", name: "Front Springs", type: "numeric", unit: "N/mm", min: 159, max: 228, step: 17.25, default: 175 },
                { id: "rs", name: "Rear Springs", type: "numeric", unit: "N/mm", min: 219, max: 455, step: 16.85, default: 245 },
                { id: "fpk", name: "Front Packers", type: "numeric", unit: "mm", min: 50.0, max: 320.0, step: 0.5, default: 100.0 },
                { id: "rpk", name: "Rear Packers", type: "numeric", unit: "mm", min: 75.0, max: 480.0, step: 0.5, default: 100.0 },
                { id: "farb", name: "Front ARB", type: "numeric", min: 0, max: 7, step: 1, default: 2 },
                { id: "rarb", name: "Rear ARB", type: "numeric", min: 0, max: 6, step: 1, default: 1 }
            ]
        },
        {
            group: "Third Element",
            items: [
                {
                    // 0 = Detached
                    id: "third_Fspring", name: "Front Heave Spring", type: "numeric", unit: "N/mm", min: 0, max: 150, step: 20, default: 0
                },
                {
                    // 0 = Detached
                    id: "third_Rspring", name: "Rear Heave Spring", type: "numeric", unit: "N/mm", min: 0, max: 500, step: 25, default: 0
                },
                { id: "third_fpk", name: "Front Heave Packers", type: "numeric", unit: "mm", min: 5.0, max: 35.0, step: 0.5, default: 5.0 },
                { id: "third_rpk", name: "Rear Heave Packers", type: "numeric", unit: "mm", min: 8.0, max: 58.0, step: 0.5, default: 8.0 }
            ]
        },
        {
            group: "Dampers",
            items: [
                { id: "fsb", name: "Front Slow Bump", type: "numeric", min: 1, max: 41, step: 1, default: 18 },
                { id: "fsr", name: "Front Slow Rebound", type: "numeric", min: 1, max: 25, step: 1, default: 4 },
                { id: "ffb", name: "Front Fast Bump", type: "numeric", min: 1, max: 49, step: 1, default: 24 },
                { id: "ffr", name: "Front Fast Rebound", type: "numeric", min: 1, max: 25, step: 1, default: 16 },
                { id: "rsb", name: "Rear Slow Bump", type: "numeric", min: 1, max: 41, step: 1, default: 22 },
                { id: "rsr", name: "Rear Slow Rebound", type: "numeric", min: 1, max: 25, step: 1, default: 4 },
                { id: "rfb", name: "Rear Fast Bump", type: "numeric", min: 1, max: 49, step: 1, default: 24 },
                { id: "rfr", name: "Rear Fast Rebound", type: "numeric", min: 1, max: 25, step: 1, default: 16 }
            ]
        },
        {
            group: "Aero & Alignment",
            items: [
                { id: "wing", name: "Rear Wing", type: "numeric", unit: "deg", min: 2.5, max: 18.5, step: 1.0, default: 6.5 },
                { id: "ftoe", name: "Front Toe", type: "numeric", unit: "deg", min: -1.41, max: 1.41, step: 0.17625, default: -0.00 },
                { id: "rtoe", name: "Rear Toe", type: "numeric", unit: "deg", min: -1.29, max: 1.36, step: 0.17625, default: 0.30 },
                { id: "fcam", name: "Front Camber", type: "numeric", unit: "deg", min: -4.0, max: -1.0, step: 0.1, default: -1.6 },
                { id: "rcam", name: "Rear Camber", type: "numeric", unit: "deg", min: -4.0, max: 0.0, step: 0.1, default: -1.4 }
            ]
        }
    ],
    presets: {
        "Low Downforce": {
            desc: "Minimal wing and low-rake for high-speed circuits. Trades cornering grip for straight-line speed.",
            values: { wing: 2.5, fh: 43.0, rh: 57.0, fs: 175, rs: 245, farb: 2, rarb: 0, bias: 50.0 }
        },
        "High Downforce": {
            desc: "High rake and aggressive wing for maximum mechanical grip on technical circuits.",
            values: { wing: 14.5, fh: 47.0, rh: 76.0, fs: 211, rs: 295, farb: 4, rarb: 3, bias: 51.5 }
        },
        "Understeer": {
            desc: "Stable, safe balance for endurance stints. Stiff front ARB and forward bias keeps the front planted.",
            values: { wing: 11.5, fh: 45.0, rh: 68.0, fs: 228, rs: 245, farb: 6, rarb: 0, bias: 53.0 }
        },
        "Oversteer": {
            desc: "High rear load and soft front for aggressive rotation on corner entry.",
            values: { wing: 9.5, fh: 43.0, rh: 80.0, fs: 175, rs: 320, farb: 1, rarb: 4, bias: 48.5 }
        }
    }
};