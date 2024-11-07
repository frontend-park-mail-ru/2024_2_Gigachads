import errorPageTemplate from './error.hbs';
/**
 * @class ErrorPage
 * @description - Класс для отображения страницы с ошибкой
 */
class ErrorPage { 
    /**
     * @async
     * @description - Отображение страницы с ошибкой
     * @param {string} error_code - Код ошибки
     * @param {string} error_description - Описание ошибки
     * @returns {Promise<void>} - Promise, который разрешается после отображения страницы с ошибкой
     */
    async render(error_code, error_description) {
        const errorPageHtml = errorPageTemplate({error_code: error_code, error_description: error_description});
        return errorPageHtml;
    }
}

export default new ErrorPage();