let fuelMode = 'time';

function calculateFuel() {
    const els = window.LMA_UI ? window.LMA_UI.els : {};
    if (!els.fuelHours || !els.fuelPerLapInput) return;

    const perLapStr = els.fuelPerLapInput.value.replace(',', '.');
    const perLap = parseFloat(perLapStr) || 0;

    let targetLaps = 0;

    if (fuelMode === 'time') {
        const h = parseInt(els.fuelHours.value) || 0;
        const m = parseInt(els.fuelMinutes.value) || 0;
        const totalSec = (h * 3600) + (m * 60);

        const lapM = parseInt(els.fuelLapMin.value) || 0;
        const lapS = parseInt(els.fuelLapSec.value) || 0;
        const lapMs = parseInt(els.fuelLapMs.value) || 0;
        const lapSec = (lapM * 60) + lapS + (lapMs / 1000);

        if (lapSec > 0) {
            targetLaps = Math.ceil(totalSec / lapSec);
        }
    } else {
        targetLaps = parseInt(els.fuelTotalLaps.value) || 0;
    }

    if (targetLaps > 0 && perLap > 0) {
        if (els.fuelResultLaps) els.fuelResultLaps.innerText = targetLaps;
        const needed = targetLaps * perLap;
        if (els.fuelResultFuel) els.fuelResultFuel.innerText = Math.ceil(needed) + ' L';
        if (els.fuelResultSafety) els.fuelResultSafety.innerText = Math.ceil(needed + (perLap * 1.5)) + ' L';
    } else {
        if (els.fuelResultLaps) els.fuelResultLaps.innerText = '--';
        if (els.fuelResultFuel) els.fuelResultFuel.innerText = '-- L';
        if (els.fuelResultSafety) els.fuelResultSafety.innerText = '-- L';
    }
}

function initFuelCalculator() {
    const els = window.LMA_UI ? window.LMA_UI.els : {};

    const inputs = [
        'fuelHours', 'fuelMinutes', 'fuelLapMin', 'fuelLapSec', 'fuelLapMs', 'fuelPerLapInput', 'fuelTotalLaps'
    ];
    inputs.forEach(id => {
        if (els[id]) {
            els[id].addEventListener('input', calculateFuel);
            els[id].addEventListener('blur', () => {
                if (els[id].value === '' || isNaN(els[id].value)) {
                    els[id].value = els[id].getAttribute('min') || 0;
                    calculateFuel();
                }
            });
        }
    });

    // Custom spin buttons logic
    document.querySelectorAll('.spin-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.spin-container');
            if (!container) return;
            const input = container.querySelector('.spin-input');
            if (!input) return;

            let val = parseFloat(input.value) || 0;
            const step = parseFloat(input.getAttribute('step')) || 1;
            const min = input.hasAttribute('min') ? parseFloat(input.getAttribute('min')) : -Infinity;
            const max = input.hasAttribute('max') ? parseFloat(input.getAttribute('max')) : Infinity;

            if (btn.classList.contains('step-up')) {
                val += step;
            } else if (btn.classList.contains('step-down')) {
                val -= step;
            }

            // Fix floating point issues (e.g., 0.1 + 0.2)
            val = Math.round(val * 10) / 10;

            if (val < min) val = min;
            if (val > max) val = max;

            input.value = val;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
    });

    if (els.fuelModeTime) {
        els.fuelModeTime.onclick = () => {
            fuelMode = 'time';
            els.fuelModeTime.classList.add('active');
            if (els.fuelModeLaps) els.fuelModeLaps.classList.remove('active');
            if (els.fuelTimeInputs) els.fuelTimeInputs.classList.remove('hidden');
            if (els.fuelLapTimeLabel) els.fuelLapTimeLabel.classList.remove('hidden');
            if (els.fuelLapsInput) els.fuelLapsInput.classList.add('hidden');
            calculateFuel();
        };
    }

    if (els.fuelModeLaps) {
        els.fuelModeLaps.onclick = () => {
            fuelMode = 'laps';
            els.fuelModeLaps.classList.add('active');
            if (els.fuelModeTime) els.fuelModeTime.classList.remove('active');
            if (els.fuelTimeInputs) els.fuelTimeInputs.classList.add('hidden');
            if (els.fuelLapTimeLabel) els.fuelLapTimeLabel.classList.add('hidden');
            if (els.fuelLapsInput) els.fuelLapsInput.classList.remove('hidden');
            calculateFuel();
        };
    }

    calculateFuel();
}

// Make functions globally available
window.LMA_FuelCalc = {
    initFuelCalculator,
    calculateFuel
};
