import { convertMaToKpa, convertMaToOxygenPercent } from './converter.js';
import { pressureServerUrl, oxygenServerUrl } from './config.js';


async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
}


export async function getPressure() {
    // get pressure data from server in mA and convert it to kPa
    const data = await fetchData(pressureServerUrl);
    return convertMaToKpa(data['pressure']);
}


export async function getOxygen() {
    // get oxygen data from server in mA and convert it to percents
    const data = await fetchData(oxygenServerUrl);
    return convertMaToOxygenPercent(data['oxygen']);
}
