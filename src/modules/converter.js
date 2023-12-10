export function convertMaToKpa(ma) {
    // Преобразование: Pв(кПа) = (Pв(мА) - 4) / 6.4
    if (ma < 4 || ma > 20) {
        console.error('Ток за пределами диапазона 4-20 мА');
        return null;
    }
    return (ma - 4) / 6.4;
}


export function convertMaToOxygenPercent(ma) {
    // Преобразование: O2(%) = (O2(мА) - 4) / (20 - 4) * 100
    if (ma < 4 || ma > 20) {
        console.error('Ток за пределами диапазона 4-20 мА');
        return null;
    }
    return ((ma - 4) / (20 - 4)) * 10;
}