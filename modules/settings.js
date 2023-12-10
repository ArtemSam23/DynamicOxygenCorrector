let timeInMinutes = 0.1; // время сбора данных
let correctionTimeInMinutes = 0.1; // время корректировки значений

export var T = timeInMinutes * 60 * 1000;
export function setTime(minutes) {
    T = minutes * 60 * 1000;
}
export var Tcorr = correctionTimeInMinutes * 60 * 1000;
export function setCorrectionTime(minutes) {
    Tcorr = minutes * 60 * 1000;
}
export var requestPerMinute = 100; // количество запросов в минуту

export var maxPulseCorrectionThreshold = 0.1


export const pressureServerUrl = 'http://127.0.0.1:8000/pressure';
export const oxygenServerUrl = 'http://127.0.0.1:8000/oxygen';

export var interpolationPoints = [
    // Pв(кПа)  Qзад(%)
    { p: 0.00, q: 4.5 },
    { p: 0.25, q: 4.0 },
    { p: 0.35, q: 3.8 },
    { p: 0.50, q: 3.2 },
    { p: 0.65, q: 3.0 },
    { p: 0.80, q: 3.0 },
    { p: 1.20, q: 3.0 },
    { p: 1.50, q: 2.6 },
    { p: 1.80, q: 2.4 },
    { p: 2.20, q: 2.4 },
    { p: 2.50, q: 2.2 },
];
