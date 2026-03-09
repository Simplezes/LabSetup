const GAME_CATEGORIES = {
    'LMU': {
        'LMGT3': { ids: ['aston_martin_vantage_lmgt3', 'bmw_m4_lmgt3', 'chevrolet_corvette_Z06_r', 'ferrari_296_lmgt3', 'ford_mustang_lmgt3', 'lamborghini_huracan_lmgt3_evo2', 'lexus_rcf_lmgt3', 'mclaren_720s_lmgt3_evo', 'mercedes_amg_lmgt3', 'porsche_911_gt3_r_lmgt3'], color: '#0ea5e9' },
        'LMP2': { ids: ['oreca_07_gibson_lmp2'], color: '#10b981' },
        'LMP3': { ids: ['ginetta_g61_lmp3', 'ligier_js_p325_lmp3'], color: '#f59e0b' },
    }
};

const CLASS_GHOST_SCALE = {
    'LMGT3': 0.6,
    'LMP2': 0.8,
    'LMP3': 0.7
};

function getCarGhostScale() {
    if (!window.CAR) return 1;
    for (const [game, categories] of Object.entries(GAME_CATEGORIES)) {
        for (const [cls, { ids }] of Object.entries(categories)) {
            if (ids.includes(window.CAR.id)) {
                return CLASS_GHOST_SCALE[cls] ?? 1;
            }
        }
    }
    return 1;
}

function getCarCategory(carId) {
    if (!window.CARS || !window.CARS[carId]) return null;
    for (const [game, categories] of Object.entries(GAME_CATEGORIES)) {
        for (const [cls, { ids }] of Object.entries(categories)) {
            if (ids.includes(carId)) {
                return { game, class: cls };
            }
        }
    }
    return null;
}

function getTrackData(id) {
    const track = window.GLOBAL_TRACKS[id];
    if (!track) return null;

    if (track.parent && window.GLOBAL_TRACKS[track.parent]) {
        const parent = window.GLOBAL_TRACKS[track.parent];
        return {
            ...parent,
            ...track,
            characteristics: {
                ...(parent.characteristics || {}),
                ...(track.characteristics || {})
            }
        };
    }
    return track;
}

function initTracks() {
    const els = window.LMA_UI ? window.LMA_UI.els : {};
    if (!window.GLOBAL_TRACKS || !els.openTrackBtn || !els.trackDropdown) return;

    if (els.openTrackBtn) {
        els.openTrackBtn.onclick = (e) => {
            e.stopPropagation();
            const isShown = els.trackDropdown.classList.contains('show');
            if (isShown) {
                els.trackDropdown.classList.remove('show');
            } else {
                renderTrackDropdown();
                els.trackDropdown.classList.add('show');
            }
        };
    }

    window.addEventListener('click', (e) => {
        if (!els.trackDropdown.contains(e.target) && e.target !== els.openTrackBtn) {
            els.trackDropdown.classList.remove('show');
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            els.trackDropdown.classList.remove('show');
        }
    });
}

function renderMachineDropdown() {
    const els = window.LMA_UI ? window.LMA_UI.els : {};
    if (!els.machineDropdown || !window.CARS) return;
    els.machineDropdown.innerHTML = '';

    const activeGame = window.ACTIVE_GAME || 'LMU';
    const currentCategories = GAME_CATEGORIES[activeGame];

    if (!currentCategories || Object.keys(currentCategories).length === 0) {
        els.machineDropdown.innerHTML = '<div class="p-3 text-[9px] text-slate-500 uppercase tracking-widest text-center">No cars available for this game yet.</div>';
        return;
    }

    Object.entries(currentCategories).forEach(([className, { ids, color }]) => {
        const availableIds = ids.filter(id => window.CARS[id]);
        if (availableIds.length === 0) return;

        const header = document.createElement('div');
        header.className = 'dropdown-category';
        header.style.setProperty('color', color);
        header.innerText = className;
        els.machineDropdown.appendChild(header);

        availableIds.forEach(id => {
            const car = window.CARS[id];
            const isActive = window.CAR && window.CAR.id === id;
            const btn = document.createElement('button');
            btn.className = `dropdown-item ${isActive ? 'active' : ''}`;
            btn.innerHTML = `
                <span class="track-name">${car.name}</span>
            `;
            btn.onclick = () => {
                if (typeof window.loadCar === 'function') window.loadCar(id);
                els.machineDropdown.classList.remove('show');
            };
            els.machineDropdown.appendChild(btn);
        });
    });
}

function initMachineDropdown() {
    const els = window.LMA_UI ? window.LMA_UI.els : {};
    if (!els.openGarageBtn || !els.machineDropdown) return;

    if (els.openGarageBtn) {
        els.openGarageBtn.onclick = (e) => {
            e.stopPropagation();
            const isShown = els.machineDropdown.classList.contains('show');
            if (isShown) {
                els.machineDropdown.classList.remove('show');
            } else {
                if (els.trackDropdown) els.trackDropdown.classList.remove('show');
                renderMachineDropdown();
                els.machineDropdown.classList.add('show');
            }
        };
    }

    window.addEventListener('click', (e) => {
        if (!els.machineDropdown.contains(e.target) && e.target !== els.openGarageBtn) {
            els.machineDropdown.classList.remove('show');
        }
    });
}

function renderTrackDropdown() {
    const els = window.LMA_UI ? window.LMA_UI.els : {};
    if (!els.trackDropdown || !window.GLOBAL_TRACKS) return;
    els.trackDropdown.innerHTML = '';

    const tracks = window.GLOBAL_TRACKS;

    const categories = {
        "WEC World Championship": ['portimao', 'imola', 'interlagos', 'bahrain', 'cota', 'sarthe', 'fuji', 'lusail', 'monza', 'sebring', 'spa'],
        "European Le Mans Series": ['barcelona', 'paul_ricard', 'silverstone'],
        "Extra Layouts": []
    };

    const categorizedIds = new Set([...categories["WEC World Championship"], ...categories["European Le Mans Series"]]);

    Object.keys(tracks).forEach(id => {
        if (!categorizedIds.has(id) && !tracks[id].parent) {
            categories["Extra Layouts"].push(id);
        }
    });

    Object.entries(categories).forEach(([catName, ids]) => {
        if (ids.length === 0) return;

        const header = document.createElement('div');
        header.className = 'dropdown-category';
        header.innerText = catName;
        els.trackDropdown.appendChild(header);

        ids.forEach(id => {
            if (!tracks[id]) return;
            renderTrackItem(id, true);
            Object.entries(tracks).forEach(([childId, childTrack]) => {
                if (childTrack.parent === id) {
                    renderTrackItem(childId, false);
                }
            });
        });
    });

    function renderTrackItem(id, isParent) {
        const track = getTrackData(id);
        const isActive = window.SELECTED_TRACK_ID === id;
        const btn = document.createElement('button');
        btn.className = `dropdown-item ${isParent ? '' : 'nested'} ${isActive ? 'active' : ''}`;

        const stats = track.characteristics || {};

        const renderPips = (val, isWarn = false) => {
            const count = Math.round(val / 2);
            return `<div class="pip-row">${Array(5).fill(0).map((_, i) => `<div class="mini-pip ${i < count ? 'active' : ''} ${isWarn && i < count ? 'warn' : ''}"></div>`).join('')}</div>`;
        };

        btn.innerHTML = `
            <div class="flex items-center gap-2">
                ${!isParent ? '<span class="track-branch text-slate-600 font-mono">└───</span>' : ''}
                <span class="track-name ${!isParent ? 'text-[11px] opacity-90' : ''}">${track.shortName || track.name}</span>
            </div>
            <div class="flex items-center gap-3 mt-0.5 ${!isParent ? 'ml-12' : ''}">
                <span class="track-info">${track.location || ''}</span>
                <div class="track-indicators">
                    ${stats.technicality ? `<div class="pip-labeled"><span class="pip-label">TECH</span>${renderPips(stats.technicality)}</div>` : ''}
                    ${stats.bumps ? `<div class="pip-labeled"><span class="pip-label warn">BUMP</span>${renderPips(stats.bumps, true)}</div>` : ''}
                </div>
            </div>
        `;

        btn.onclick = () => {
            selectTrack(id);
            els.trackDropdown.classList.remove('show');
        };
        els.trackDropdown.appendChild(btn);
    }
}

function selectTrack(id) {
    window.SELECTED_TRACK_ID = id;
    const els = window.LMA_UI ? window.LMA_UI.els : {};
    const track = getTrackData(id);
    if (track && els.currentTrack) {
        els.currentTrack.innerText = (track.shortName || track.name).toUpperCase();

        const locationSpan = document.querySelector('.location-subtext');
        if (locationSpan) {
            locationSpan.innerText = (track.location || 'FRANCE').toUpperCase();
        }

        if (typeof window.update === 'function') window.update();
    }
}

window.LMA_TracksManager = {
    GAME_CATEGORIES,
    getCarCategory,
    initTracks,
    initMachineDropdown,
    getTrackData,
    getCarGhostScale,
    selectTrack
};
