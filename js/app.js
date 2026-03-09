let CAR = null;

const gatherDefaults = (car) => {
    if (car && car.presets && car.presets["Base"] && car.presets["Base"].values) {
        return { ...car.presets["Base"].values };
    }
    return car && car.defaults ? { ...car.defaults } : {};
};
window.gatherDefaults = gatherDefaults;

let DEFAULTS = {};
let PHYSICS_DATA = null;
let SELECTED_TRACK_ID = 'sarthe';

// Make core state globally accessible since our modules will need it
window.CAR = CAR;
window.DEFAULTS = DEFAULTS;
window.PHYSICS_DATA = PHYSICS_DATA;
window.SELECTED_TRACK_ID = SELECTED_TRACK_ID;

const els = window.LMA_UI ? window.LMA_UI.els : {};

function loadCar(carId) {
    if (!window.CARS || !window.CARS[carId]) return;

    window.CAR = window.CARS[carId];
    window.DEFAULTS = gatherDefaults(window.CAR);

    if (window.PHYSICS_DATA && window.PHYSICS_DATA.cars) {
        const p = window.PHYSICS_DATA.cars.find(c => c.id.toLowerCase() === carId.toLowerCase());
        if (p) window.CAR.physics = { ...window.CAR.physics, ...p };
    }

    const CAR = window.CAR;

    if (CAR.setupStructure) {
        const wingHigh = CAR.setupStructure.reduce((acc, g) => acc || g.items.find(i => i.id === 'wing_highdrag'), null);
        if (wingHigh) {
            const wingActive = CAR.setupStructure.reduce((acc, g) => acc || g.items.find(i => i.id === 'wing'), null);
            if (wingActive) {
                wingHigh.id = 'wing';
                wingActive.id = 'ldwing';
            }
        }

        const hasLdWing = CAR.setupStructure.some(g => g.items.some(i => i.id === 'ldwing'));
        if (hasLdWing && els.wingToggleContainer) {
            els.wingToggleContainer.classList.remove('hidden');
            els.highDragBtn.classList.add('active', 'border-blue-500/30', 'bg-blue-500/10', 'text-blue-400');
            els.highDragBtn.classList.remove('border-white/5', 'text-slate-500');
            els.lowDragBtn.classList.remove('active', 'border-blue-500/30', 'bg-blue-500/10', 'text-blue-400');
            els.lowDragBtn.classList.add('border-white/5', 'text-slate-500');
        } else if (els.wingToggleContainer) {
            els.wingToggleContainer.classList.add('hidden');
        }

        CAR.setupStructure.forEach(group => {
            group.items.forEach(item => {
                if (els[item.id] && els[item.id].tagName === 'INPUT') {
                    const input = els[item.id];
                    if (item.type === 'labeled') {
                        input.min = 0;
                        input.max = item.options.length - 1;
                        input.step = 1;
                    } else {
                        input.min = item.min;
                        input.max = item.max;
                        input.step = item.step;
                    }
                    input.value = window.DEFAULTS[item.id];
                    if (window.updateSliderFill) window.updateSliderFill(input);
                }
            });
        });
    } else if (CAR.ranges) {
        Object.entries(CAR.ranges).forEach(([key, range]) => {
            if (els[key] && els[key].tagName === 'INPUT') {
                els[key].min = range.min;
                els[key].max = range.max;
                els[key].step = range.step;
                els[key].value = window.DEFAULTS[key];
                if (window.updateSliderFill) window.updateSliderFill(els[key]);
            }
        });
    }

    const hasSetting = (id) => {
        if (CAR.setupStructure) {
            return CAR.setupStructure.some(g => g.items.some(i => i.id === id));
        }
        return !!(CAR.ranges && CAR.ranges[id]);
    };

    const tenderEls = document.querySelectorAll('.tender-setting');
    if (hasSetting('tender_f')) {
        tenderEls.forEach(el => el.classList.remove('hidden'));
    } else {
        tenderEls.forEach(el => el.classList.add('hidden'));
    }

    const thirdSpringEls = document.querySelectorAll('.third-spring-setting');
    if (hasSetting('third_Fspring')) {
        thirdSpringEls.forEach(el => el.classList.remove('hidden'));
    } else {
        thirdSpringEls.forEach(el => el.classList.add('hidden'));
    }

    if (window.LMA_Setup && window.LMA_Setup.renderPresets) {
        window.LMA_Setup.renderPresets(CAR, els);
    }

    // Sync UI Labels
    if (els.currentCar) els.currentCar.innerText = CAR.name.toUpperCase();
    if (els.currentCarClass && window.LMA_TracksManager && window.LMA_TracksManager.getCarCategory) {
        const cat = window.LMA_TracksManager.getCarCategory(carId);
        els.currentCarClass.innerText = cat ? cat.class.toUpperCase() : "---";
    }

    if (window.update) window.update();
}
window.loadCar = loadCar;


// UI Setup logic for view switching and presets
function initAppInteractions() {
    function switchView(target) {
        const views = ['radar', 'bars'];
        views.forEach(v => {
            const btn = els[`view${v.charAt(0).toUpperCase() + v.slice(1)}`];
            const view = els[`${v}View`];
            if (!btn || !view) return;

            if (v === target) {
                view.classList.remove('hidden');
                if (v === 'bars' || v === 'radar') view.classList.add('flex');

                btn.classList.remove('text-slate-400', 'border-transparent', 'hover:text-white', 'hover:bg-white/5');
                btn.classList.add('text-blue-400', 'bg-blue-500/20', 'border-blue-500/30', 'shadow-[0_0_10px_rgba(59,130,246,0.2)]', 'hover:bg-blue-500/30');
            } else {
                view.classList.add('hidden');
                if (v === 'bars' || v === 'radar') view.classList.remove('flex');

                btn.classList.add('text-slate-400', 'border-transparent', 'hover:bg-white/5');
                btn.classList.remove('text-blue-400', 'bg-blue-500/20', 'border-blue-500/30', 'shadow-[0_0_10px_rgba(59,130,246,0.2)]', 'hover:bg-blue-500/30');
            }
        });
    }
    if (els.viewRadar) els.viewRadar.onclick = () => switchView('radar');
    if (els.viewBars) els.viewBars.onclick = () => switchView('bars');

    window.ACTIVE_GAME = 'LMU';

    document.querySelectorAll('input[type="range"]').forEach(input => {
        input.addEventListener('mousedown', () => window.getSelection().removeAllRanges());
        input.addEventListener('input', () => {
            if (input.id === 'trackTemp') return;
            if (window.updateSliderFill) window.updateSliderFill(input);
            if (window.update) window.update();
        });
        if (window.updateSliderFill) window.updateSliderFill(input);
    });

    // Game Selector Logic
    const gameBtn = document.getElementById('gameSelectorBtn');
    const gameDropdown = document.getElementById('gameDropdown');
    if (gameBtn && gameDropdown) {
        gameBtn.onclick = (e) => {
            e.stopPropagation();
            gameDropdown.classList.toggle('show');
        };
        document.addEventListener('click', (e) => {
            if (!gameBtn.contains(e.target)) {
                gameDropdown.classList.remove('show');
            }
        });
    }

    if (els.sync) {
        els.sync.onclick = () => {

            if (window.update) window.update();
        };
    }

    if (els.trackTemp) {
        els.trackTemp.oninput = () => {
            if (window.updateSliderFill) window.updateSliderFill(els.trackTemp);
            if (window.update) window.update();
        };
    }

    if (els.tempPresets) {
        els.tempPresets.querySelectorAll('button').forEach(btn => {
            btn.onclick = () => {
                const temp = btn.dataset.temp;
                els.trackTemp.value = temp;
                if (window.updateSliderFill) window.updateSliderFill(els.trackTemp);
                if (window.update) window.update();
            };
        });
    }

    if (els.weatherChips) {
        els.weatherChips.querySelectorAll('.weather-chip').forEach(chip => {
            chip.onclick = () => {
                els.weatherChips.querySelectorAll('.weather-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                if (window.update) window.update();
            };
        });
    }

    function setWingDragMode(isLowDrag) {
        if (!window.CAR || !window.CAR.setupStructure) return;

        let wingItem = null;
        let ldWingItem = null;

        for (const group of window.CAR.setupStructure) {
            for (const item of group.items) {
                if (item.id === 'wing_highdrag') wingItem = item;
                if (item.id === 'ldwing') ldWingItem = item;
                if (item.id === 'wing') {
                    if (!wingItem) wingItem = item;
                    else ldWingItem = item;
                }
            }
        }

        if (!wingItem || !ldWingItem) return;

        if (isLowDrag && wingItem.id === 'wing') {
            wingItem.id = 'wing_highdrag';
            ldWingItem.id = 'wing';
        } else if (!isLowDrag && ldWingItem.id === 'wing') {
            ldWingItem.id = 'ldwing';
            wingItem.id = 'wing';
        }

        const activeItem = window.LMA_Utils ? window.LMA_Utils.getItemConfig(window.CAR, 'wing') : null;
        if (els.wing && activeItem) {
            if (activeItem.type === 'labeled') {
                els.wing.min = 0;
                els.wing.max = activeItem.options.length - 1;
                els.wing.step = 1;
            } else {
                els.wing.min = activeItem.min;
                els.wing.max = activeItem.max;
                els.wing.step = activeItem.step;
            }
            els.wing.value = activeItem.default;
            if (window.updateSliderFill) window.updateSliderFill(els.wing);
        }

        if (isLowDrag) {
            els.lowDragBtn.classList.add('active', 'border-blue-500/30', 'bg-blue-500/10', 'text-blue-400');
            els.lowDragBtn.classList.remove('border-white/5', 'text-slate-500');
            els.highDragBtn.classList.remove('active', 'border-blue-500/30', 'bg-blue-500/10', 'text-blue-400');
            els.highDragBtn.classList.add('border-white/5', 'text-slate-500');
        } else {
            els.highDragBtn.classList.add('active', 'border-blue-500/30', 'bg-blue-500/10', 'text-blue-400');
            els.highDragBtn.classList.remove('border-white/5', 'text-slate-500');
            els.lowDragBtn.classList.remove('active', 'border-blue-500/30', 'bg-blue-500/10', 'text-blue-400');
            els.lowDragBtn.classList.add('border-white/5', 'text-slate-500');
        }

        if (window.update) window.update();
    }

    if (els.lowDragBtn) els.lowDragBtn.onclick = () => setWingDragMode(true);
    if (els.highDragBtn) els.highDragBtn.onclick = () => setWingDragMode(false);

    document.querySelectorAll('.comp-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.comp-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            window.currentCompound = btn.dataset.type;
            if (window.update) window.update();
        };
    });

    const resetMap = {
        tp_fC_label: 'tpressure_f', tp_rC_label: 'tpressure_r', fcC_label: 'fcam', rcC_label: 'rcam',
        fbdC_label: 'fbd', rbdC_label: 'rbd',
        fsC_label: 'fs', rsC_label: 'rs', fpkC_label: 'fpk', rpkC_label: 'rpk', fhC_label: 'fh', rhC_label: 'rh',
        third_FspringC_label: 'third_Fspring', third_fpkC_label: 'third_fpk', third_RspringC_label: 'third_Rspring', third_rpkC_label: 'third_rpk',
        fsbC_label: 'fsb', fsrC_label: 'fsr', ffbC_label: 'ffb', ffrC_label: 'ffr',
        rsbC_label: 'rsb', rsrC_label: 'rsr', rfbC_label: 'rfb', rfrC_label: 'rfr',
        ftoeC_label: 'ftoe', rtoeC_label: 'rtoe', farbC_label: 'farb', rarbC_label: 'rarb', wingC_label: 'wing',
        tender_fC_label: 'tender_f'
    };

    Object.entries(resetMap).forEach(([clickId, slideId]) => {
        const clickEl = document.getElementById(clickId);
        if (clickEl) {
            clickEl.onclick = (e) => {
                e.stopPropagation();
                els[slideId].value = window.DEFAULTS[slideId];
                if (window.updateSliderFill) window.updateSliderFill(els[slideId]);
                if (window.update) window.update();
            };
        }
    });

}

async function initPhysics() {
    try {
        const [lmgt3Res, lmp2Res, lmp3Res] = await Promise.all([
            fetch('data/cars/lmu/lmgt3/physics_lmgt3.json'),
            fetch('data/cars/lmu/lmp2/physics_lmp2.json'),
            fetch('data/cars/lmu/lmp3/physics_lmp3.json')
        ]);

        const lmgt3Data = await lmgt3Res.json();
        const lmp2Data = await lmp2Res.json();
        const lmp3Data = await lmp3Res.json();

        window.PHYSICS_DATA = {
            cars: [...(lmgt3Data.cars || []), ...(lmp2Data.cars || []), ...(lmp3Data.cars || [])]
        };

        if (window.CAR && window.CAR.id && window.PHYSICS_DATA.cars) {
            const p = window.PHYSICS_DATA.cars.find(c => c.id === window.CAR.id);
            if (p) window.CAR.physics = { ...window.CAR.physics, ...p };
        }
        if (window.update) window.update();
    } catch (e) {
        console.error("Failed to load physics JSON files", e);
    }
}

async function fetchAllCars() {
    window.CARS = window.CARS || {};
    const promises = [];
    if (window.LMA_TracksManager && window.LMA_TracksManager.GAME_CATEGORIES) {
        for (const [game, classes] of Object.entries(window.LMA_TracksManager.GAME_CATEGORIES)) {
            if (game !== 'LMU') continue;
            for (const [cls, { ids }] of Object.entries(classes)) {
                for (const id of ids) {
                    const url = `data/cars/lmu/${cls.toLowerCase()}/${id}.json`;
                    promises.push(
                        fetch(url).then(res => res.json()).then(data => {
                            window.CARS[id] = data;
                        }).catch(e => console.error("Failed to load car:", url, e))
                    );
                }
            }
        }
    }
    await Promise.all(promises);

    if (Object.keys(window.CARS).length > 0) {
        window.CAR = window.CARS['bmw_m4_lmgt3'] || Object.values(window.CARS)[0];
        window.DEFAULTS = gatherDefaults(window.CAR);
    }
}

async function initApp() {
    await fetchAllCars();
    initPhysics();
    initAppInteractions();

    if (window.LMA_TracksManager) {
        window.LMA_TracksManager.initMachineDropdown();
        window.LMA_TracksManager.initTracks();
    }

    if (window.LMA_UISetup) {
        window.LMA_UISetup.initUISetup();
    }

    if (window.LMA_Tooltips) {
        window.LMA_Tooltips.initTooltipsExtra();
    }

    if (window.LMA_FuelCalc) {
        window.LMA_FuelCalc.initFuelCalculator();
        if (window.LMA_FuelCalc.calculateFuel) window.LMA_FuelCalc.calculateFuel();
    }

    // Initial sync of labels if we have a car
    if (window.CAR && window.CAR.id) {
        loadCar(window.CAR.id);
    }

    if (window.update) window.update();
}

initApp();
