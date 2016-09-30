/* jslint esversion: 6, -W097, browser: true, strict: implied, -W034 */
/* global jQuery: true, $: true, console: true, _ */

export function errorByStatusCode(statusCode) {
    try {
        statusCode = parseInt(statusCode, 10);
    } catch (e) {}

    var message;
    switch (statusCode) {
        case 400:
            message = _('Неверный запрос');
            break;
        case 403:
            message = _('Отказано в доступе');
            break;
        case 404:
            message = _('Не найдено');
            break;
        case 405:
            message = _('Метод не поддерживается');
            break;
        case 413:
            message = _('Размер запроса превышает максимальный допустимый');
            break;
        case 429:
            message = _('Слишком много запросов');
            break;
        case 500:
            message = _('Внутренняя ошибка сервера');
            break;
        case 502:
            message = _('Неверный шлюз');
            break;
        case 503:
            message = _('Сервис недоступен');
            break;
        case 504:
            message = _('Шлюз не отвечает');
            break;
    }
    return message;
}
