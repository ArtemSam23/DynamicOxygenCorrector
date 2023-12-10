// Загружаем начальные настройки
const initialSettings = {
    timeEvaluation: 1,
    maxPulsation: 5,
    correctionPeriod: 1,
    correctionMagnitude: 0.5,
    oxygenInensitivity: 3,
    maxSignalCorrection: 10
};

function CloseMySelf() {
    window.opener.postMessage(initialSettings, '*');
}


// Функция для заполнения формы начальными настройками
function fillFormWithSettings() {
    document.getElementById('timeEvaluation').value = initialSettings.timeEvaluation;
    document.getElementById('maxPulsation').value = initialSettings.maxPulsation;
    document.getElementById('correctionPeriod').value = initialSettings.correctionPeriod;
    document.getElementById('correctionMagnitude').value = initialSettings.correctionMagnitude;
    document.getElementById('oxygenInensitivity').value = initialSettings.oxygenInensitivity;
    document.getElementById('maxSignalCorrection').value = initialSettings.maxSignalCorrection;
}

// Функция для обновления настроек при отправке формы
function updateSettings(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем новые значения из формы
    const updatedSettings = {
        timeEvaluation: parseFloat(document.getElementById('timeEvaluation').value),
        maxPulsation: parseFloat(document.getElementById('maxPulsation').value),
        correctionPeriod: parseFloat(document.getElementById('correctionPeriod').value),
        correctionMagnitude: parseFloat(document.getElementById('correctionMagnitude').value),
        oxygenInensitivity: parseFloat(document.getElementById('oxygenInensitivity').value),
        maxSignalCorrection: parseFloat(document.getElementById('maxSignalCorrection').value)
    };

    // Проводим валидацию значений
    // Здесь вы можете добавить дополнительную валидацию, если необходимо

    // Обновляем начальные настройки
    Object.assign(initialSettings, updatedSettings);

    // Выводим сообщение об успешном обновлении (можете изменить на свой вкус)
    alert('Настройки успешно обновлены!');

    // Выводим обновленные настройки в консоль
    console.log('Обновленные настройки:', initialSettings);

    CloseMySelf(initialSettings);
}

// Заполняем форму начальными настройками при загрузке страницы
fillFormWithSettings();

// Назначаем обработчик события на отправку формы
document.getElementById('settingsForm').addEventListener('submit', updateSettings);
