import { T, Tcorr, requestPerMinute } from './modules/settings.js';
import { maxPulseCorrectionThreshold } from './modules/settings.js';
import { getPressure, getOxygen } from './modules/dataService.js';
import { setBarIndication, resetBarIndication } from './modules/methods.js';
import { updateDisplay } from './modules/methods.js';
import { setIntervalForTime } from './modules/utils.js';
import { getEstimatedOxygen } from './modules/interpolation.js';
import { turnOffDisplay, turnOnDisplay } from './modules/methods.js';
import { setTime, setCorrectionTime } from './modules/settings.js';


let intervalId = null;
let timeOutCallback = null;
let screenMode = 'pressure'; // 'pressure', 'oxygen', 'correction'
var dispayTurnedOff = true;


async function initiateData() {
    if (intervalId != null) {
        clearInterval(intervalId);
    }
    return new Promise((resolve, reject) => {
        let deltaP;
        let minP = null;
        let maxP = null;
        let averageP;
        let sumP = 0;
        let count = 0;
        let resultsPressure;
        const startTime = Date.now();
        const interval = 60000 / requestPerMinute - 1;
        intervalId = setInterval(async () => {
            if (Date.now() - startTime > T) {
                clearInterval(intervalId);
                intervalId = null;
                resolve(resultsPressure);
            } else {
                count++;
                let pressureValue = await getPressure()
                updateDisplay(pressureValue);
                let oxygenValue = await getOxygen();
                sumP += pressureValue;
                maxP = maxP === null ? pressureValue : Math.max(maxP, pressureValue);
                minP = minP === null ? pressureValue : Math.min(minP, pressureValue);
                averageP = sumP / count;
                deltaP = maxP - minP;
                resultsPressure = {
                    'averageP': averageP,
                    'deltaP': deltaP,
                    'minP': minP,
                    'maxP': maxP
                }
            }
        }, interval);
    })
}

async function startCorrection() {
    let pressureValue = await getPressure();
    let oxygenValue = await getOxygen();
    let estimatedOxygen = getEstimatedOxygen(pressureValue);
    let correction = oxygenValue - estimatedOxygen;
    console.log('correction: ' + correction);
    if (screenMode == 'pressure') {
        updateDisplay(pressureValue);
    } else if (screenMode == 'oxygen') {
        updateDisplay(oxygenValue);
    } else if (screenMode == 'correction') {
        updateDisplay(pressureValue + correction);
    }
}

async function main() {
    if (dispayTurnedOff) {
        turnOnDisplay();
        dispayTurnedOff = false;
    }
    if (intervalId != null) {
        clearInterval(intervalId);
        intervalId = null;
        resetBarIndication();
        turnOffDisplay()
        dispayTurnedOff = true;
    } else {
        setBarIndication('reading');
        var data = await initiateData();
        console.log(data);
        let dP = data.deltaP;
        if (dP < maxPulseCorrectionThreshold * data.averageP) {
            console.log('Режим коррекции');
            setBarIndication('correction');
            intervalId, timeOutCallback = setIntervalForTime(startCorrection, 60000 / requestPerMinute, Tcorr, main);

        } else {
            console.log('Нет режима коррекции');
            turnOffDisplay()
            dispayTurnedOff = true;
            setBarIndication('error');
        }
    };
}

let popup = null;

function openSettings() {
    popup = window.open('settings.html', 'width=400,height=400', popup=true);
}

window.addEventListener('message', (event) => {
    console.log('New settings:', event.data);
    popup.close();
    setTime(event.data.timeEvaluation);
    setCorrectionTime(event.data.correctionPeriod);
});

let longPressTimeout = null;
let longPress = false;  
let selectButton = document.getElementById('select-button');
selectButton.addEventListener('mousedown', () => {
    longPressTimeout = setTimeout(() => {
        longPress = true;
        openSettings();
    }, 1000);
});
selectButton.addEventListener('mouseup', () => {
    if (!longPress) {
        main();
    } else {
        longPress = false;
    }
    clearTimeout(longPressTimeout);
});

document.getElementById('plus-button').addEventListener('click', () => {
    if (screenMode === 'correction') {
        screenMode = 'pressure';
    } else {
        screenMode = 'correction';
    }
});

document.getElementById('minus-button').addEventListener('click', () => {
    if (screenMode === 'oxygen') {
        screenMode = 'pressure';
    } else {
        screenMode = 'oxygen';
    }
});
