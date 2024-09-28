
/**
 * @class ErrorPage
 * @description - Класс для отображения страницы с ошибкой
 */
class ErrorPage {
    /**
     * @constructor
     * @description - Конструктор класса ErrorPage, инициализирует загрузку шаблонов
     */
    constructor() {
        this.templatesLoaded = this.loadTemplates();
    }
    /**
     * @async
     * @description - Загрузка шаблонов
     * @returns {Promise<void>} - Promise, который разрешается после загрузки всех шаблонов
     */
    async loadTemplates() {
        const [errorResponse] = await Promise.all([
            fetch('/src/pages/error/error.hbs')
        ]);
        this.errorPageString = await errorResponse.text();
    }
    /**
     * @async
     * @description - Отображение страницы с ошибкой
     * @param {string} error_code - Код ошибки
     * @param {string} error_description - Описание ошибки
     * @returns {Promise<void>} - Promise, который разрешается после отображения страницы с ошибкой
     */
    async render(error_code, error_description) {
        await this.templatesLoaded;
        const errorPageTemplate = Handlebars.compile(this.errorPageString);
        const errorPageHtml = errorPageTemplate({error_code: error_code, error_description: error_description});
        return errorPageHtml;
    }
}

export default new ErrorPage();