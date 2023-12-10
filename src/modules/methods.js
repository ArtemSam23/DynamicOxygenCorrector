export function toggleDisplay() {
    let display = document.getElementById('screen');
    display.classList.toggle('inactive-display');
}

export function turnOffDisplay() {
    let display = document.getElementById('screen');
    display.classList.add('inactive-display');
    display.textContent = '88.88';
}

export function turnOnDisplay() {
    let display = document.getElementById('screen');
    display.classList.remove('inactive-display');
}

export function updateDisplay(data) {
    if (typeof data == 'number') {
        data = data.toFixed(2);
        document.getElementById('screen').textContent = data;
    } else {
        document.getElementById('screen').textContent = '99.99';
    }
}

let errorIntervalId = null;

export function setBarIndication(type) {
    resetBarIndication();
    let indicators = Array.from(bar.getElementsByClassName('bar-indicator')).reverse();

    if (type == 'correction') {
        indicators[0].classList.add('active-bar-indicator');
    }

    if (type == 'reading') {
        for (let indicator of indicators) {
            indicator.classList.add('active-bar-indicator');
        }
    }

    if (type == 'error') {
        let indicator = indicators[0]
        errorIntervalId = setInterval(() => {
            indicator.classList.toggle('active-bar-indicator');
        }, 500, );
    }
}

export function resetBarIndication() {
    if (errorIntervalId != null) {
        clearInterval(errorIntervalId);
        errorIntervalId = null;
    }
    let indicators = bar.getElementsByClassName('bar-indicator');
    for (let indicator of indicators) {
        indicator.classList.remove('active-bar-indicator');
    }
}