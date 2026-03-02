window.CARS = window.CARS || {};
window.CARS["ligier_js_p325_lmp3"] = {
    id: "ligier_js_p325_lmp3",
    name: "Ligier JS P325 LMP3",
    setupStructure: [
        {
            group: "Tires & Brakes",
            items: [
                { id: "tpressure_f", name: "Front Tire Pressure", type: "numeric", unit: "kPa", min: 150, max: 196, step: 1, default: 150 },
                { id: "tpressure_r", name: "Rear Tire Pressure", type: "numeric", unit: "kPa", min: 130, max: 176, step: 1, default: 130 },
                { id: "bias", name: "Brake Bias", type: "numeric", unit: "%", min: 35.0, max: 65.0, step: 0.25, default: 50.0 },

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
                { id: "fh", name: "Front Ride Height", type: "numeric", unit: "mm", min: 40.0, max: 60.0, step: 0.5, default: 44.0 },
                { id: "rh", name: "Rear Ride Height", type: "numeric", unit: "mm", min: 50.0, max: 90.0, step: 0.5, default: 72.0 },
                { id: "fs", name: "Front Springs", type: "numeric", unit: "lbf/in", min: 700, max: 1250, step: 25, default: 1200 },
                { id: "rs", name: "Rear Springs", type: "numeric", unit: "lbf/in", min: 700, max: 1250, step: 25, default: 750 },
                { id: "fpk", name: "Front Packers", type: "numeric", unit: "mm", min: 5.0, max: 32.0, step: 0.5, default: 10.0 },
                { id: "rpk", name: "Rear Packers", type: "numeric", unit: "mm", min: 7.5, max: 48.0, step: 0.5, default: 10.0 },
                {
                    id: "farb", name: "Front ARB", type: "labeled",
                    options: [
                        { label: "13mm Soft (564)", value: 0 },
                        { label: "13mm Medium (832)", value: 1 },
                        { label: "13mm Hard (1348)", value: 2 },
                        { label: "14mm Soft (759)", value: 3 },
                        { label: "14mm Medium (1119)", value: 4 },
                        { label: "14mm Hard (1813)", value: 5 },
                        { label: "14.5mm Soft (873)", value: 6 },
                        { label: "14.5mm Medium (1288)", value: 7 },
                        { label: "14.5mm Hard (2086)", value: 8 },
                        { label: "15mm Soft (1000)", value: 9 },
                        { label: "15mm Medium (1475)", value: 10 },
                        { label: "15mm Hard (2389)", value: 11 },
                        { label: "15.5mm Soft (1140)", value: 12 },
                        { label: "15.5mm Medium (1682)", value: 13 },
                        { label: "15.5mm Hard (2724)", value: 14 },
                        { label: "18mm Soft (2074)", value: 15 },
                        { label: "18mm Medium (3059)", value: 16 },
                        { label: "18mm Hard (4955)", value: 17 }
                    ],
                    default: 2
                },
                {
                    id: "rarb", name: "Rear ARB", type: "labeled",
                    options: [
                        { label: "13mm Soft (299)", value: 0 },
                        { label: "13mm Medium (403)", value: 1 },
                        { label: "13mm Hard (575)", value: 2 },
                        { label: "14.5mm Soft (462)", value: 3 },
                        { label: "14.5mm Medium (624)", value: 4 },
                        { label: "14.5mm Hard (890)", value: 5 },
                        { label: "16mm Soft (685)", value: 6 },
                        { label: "16mm Medium (926)", value: 7 },
                        { label: "16mm Hard (1319)", value: 8 },
                        { label: "16.5mm Soft (775)", value: 9 },
                        { label: "16.5mm Medium (1047)", value: 10 },
                        { label: "16.5mm Hard (1492)", value: 11 },
                        { label: "18mm Soft (1098)", value: 12 },
                        { label: "18mm Medium (1483)", value: 13 },
                        { label: "18mm Hard (2113)", value: 14 }
                    ],
                    default: 1
                }
            ]
        },
        {
            group: "Third Element",
            items: [
                {
                    id: "third_Fspring", name: "Front Heave Spring", type: "labeled",
                    options: [
                        { label: "2.1 N/mm", value: 12 },
                        { label: "700 lbf/in", value: 700 },
                        { label: "1000 lbf/in", value: 1000 },
                        { label: "1300 lbf/in", value: 1300 }
                    ],
                    default: 12
                },
                {
                    id: "third_Rspring", name: "Rear Heave Spring", type: "labeled",
                    options: [
                        { label: "2.2 N/mm", value: 12.5 },
                        { label: "700 lbf/in", value: 700 },
                        { label: "750 lbf/in", value: 750 },
                        { label: "800 lbf/in", value: 800 },
                        { label: "850 lbf/in", value: 850 },
                        { label: "900 lbf/in", value: 900 },
                        { label: "950 lbf/in", value: 950 },
                        { label: "1000 lbf/in", value: 1000 },
                        { label: "1050 lbf/in", value: 1050 },
                        { label: "1100 lbf/in", value: 1100 },
                        { label: "1150 lbf/in", value: 1150 },
                        { label: "1200 lbf/in", value: 1200 },
                        { label: "1250 lbf/in", value: 1250 }
                    ],
                    default: 12.5
                },
                { id: "third_fpk", name: "Front Heave Packers", type: "numeric", unit: "mm", min: 5.0, max: 35.0, step: 0.5, default: 5.0 },
                { id: "third_rpk", name: "Rear Heave Packers", type: "numeric", unit: "mm", min: 8.0, max: 58.0, step: 0.5, default: 8.0 }
            ]
        },
        {
            group: "Dampers",
            items: [
                { id: "fsb", name: "Front Slow Bump", type: "numeric", min: 1, max: 41, step: 1, default: 24 },
                { id: "fsr", name: "Front Slow Rebound", type: "numeric", min: 1, max: 25, step: 1, default: 9 },
                { id: "ffb", name: "Front Fast Bump", type: "numeric", min: 1, max: 49, step: 1, default: 22 },
                { id: "ffr", name: "Front Fast Rebound", type: "numeric", min: 1, max: 25, step: 1, default: 8 },
                { id: "rsb", name: "Rear Slow Bump", type: "numeric", min: 1, max: 41, step: 1, default: 22 },
                { id: "rsr", name: "Rear Slow Rebound", type: "numeric", min: 1, max: 25, step: 1, default: 10 },
                { id: "rfb", name: "Rear Fast Bump", type: "numeric", min: 1, max: 49, step: 1, default: 22 },
                { id: "rfr", name: "Rear Fast Rebound", type: "numeric", min: 1, max: 25, step: 1, default: 9 }
            ]
        },
        {
            group: "Aero & Alignment",
            items: [
                { id: "wing", name: "Rear Wing", type: "numeric", unit: "deg", min: 2.5, max: 14.5, step: 0.5, default: 6.5 },
                { id: "ftoe", name: "Front Toe", type: "numeric", unit: "deg", min: -1.41, max: 1.41, step: 0.17625, default: -0.00 },
                { id: "rtoe", name: "Rear Toe", type: "numeric", unit: "deg", min: -1.29, max: 1.29, step: 0.16125, default: 0.32 },
                { id: "fcam", name: "Front Camber", type: "numeric", unit: "deg", min: -4.0, max: 0.0, step: 0.1, default: -2.4 },
                { id: "rcam", name: "Rear Camber", type: "numeric", unit: "deg", min: -4.0, max: 0.0, step: 0.1, default: -1.6 }
            ]
        }
    ],
    presets: {
        "Low Downforce": {
            desc: "Flat-wing, low-rake setup for high-speed circuits like Le Mans or Monza. Maximises top speed on long straights.",
            values: { wing: 2.5, fh: 42.0, rh: 55.0, fs: 700, rs: 700, farb: 3, rarb: 1, bias: 49.5 }
        },
        "High Downforce": {
            desc: "Aggressive wing and high rake for maximum cornering grip on technical circuits.",
            values: { wing: 14.5, fh: 46.0, rh: 78.0, fs: 900, rs: 900, farb: 5, rarb: 4, bias: 50.5 }
        },
        "Understeer": {
            desc: "Safety-first balance. Stiff front ARB and forward rake locks the front end for stable, predictable cornering.",
            values: { wing: 10.5, fh: 44.0, rh: 72.0, fs: 1100, rs: 750, farb: 7, rarb: 1, bias: 53.5, ftoe: 0.0, rtoe: 0.352 }
        },
        "Oversteer": {
            desc: "Rotation-focused setup. Stiff rear and high rake helps the car pivot aggressively on entry.",
            values: { wing: 8.5, fh: 40.0, rh: 82.0, fs: 750, rs: 1100, farb: 1, rarb: 5, bias: 47.0, ftoe: -0.176, rtoe: 0.176 }
        }
    }
};