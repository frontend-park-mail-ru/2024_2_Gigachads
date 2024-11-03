import ErrorPage from '../../pages/error/error.js';
import { getUser } from '../../auth/auth.js';
import Inbox from '../../pages/inbox/inbox.js';
const root = document.getElementById('root');
/**
 * @class Router
 * @description - Класс для управления маршрутизацией
 */
export class Router {
    /**
     * @param {Array<Route>} routes - Массив маршрутов
     * @returns {void}
     * @description - Конструктор класса Router
     */
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    /**
     * @returns {void}
     * @description - Инициализация маршрутов
     */
    init() {
        root.addEventListener('click', (event) => {
            const { target } = event;
            if (target instanceof HTMLAnchorElement) {
                event.preventDefault();
                this.navigateTo(target.getAttribute('href'));
            }
        });

        window.addEventListener('popstate', () => {
            this.loadRoute(window.location.pathname);
        });

        this.loadRoute(window.location.pathname);
    }

    /**
     * @param {string} url - URL для навигации
     * @returns {void}
     * @description - Навигация по URL
     */
    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute(url);
    }

    async errorNavigate(error_code, error_description) {
        const view = await ErrorPage.render(error_code, error_description);
        root.innerHTML = view;
    }

    /**
     * @param {string} url - URL для навигации
     * @returns {void}
     * @description - Загрузка маршрута
     */
    async loadRoute(url) {
        url = url.split('?')[0];
        for (const route of this.routes) {
            const params = route.match(url);
            if (params) {
                if (route.protected && !this.isAuthenticated()) {
                    this.navigateTo('/login');
                    return;
                }
                if (route.withContent) {
                    let contentDiv = document.getElementById('content');
                    let view;
                    if (!contentDiv) {
                        const inbox = new Inbox();
                        view = await inbox.render(params);
                        root.innerHTML = view;
                        inbox.attachEventListeners();
                        contentDiv = document.getElementById('content');
                    }
                    view = await route.component.render(params);
                    contentDiv.innerHTML = view;
                    route.component.attachEventListeners();
         
                } else {
                    const view = await route.component.render(params);
                    root.innerHTML = view;
                    route.component.attachEventListeners();
                }
                return;
            }
        }

        // Если ни один маршрут не подошёл, показать 404 ошибку
        this.errorNavigate('Ошибка 404', 'Страница не найдена');
    }
    /**
     * @returns {boolean} - Возвращает true, если пользователь аутентифицирован
     * @description - Проверка аутентификации пользователя
     */
    isAuthenticated() {
        const user = getUser();
        return !!user;
    }
    setIsPageWithContent(value) {
        this.isPageWithContent = value;
    }
}

export class Route {
    /**
     * @param {string} path - Путь маршрута (может содержать параметры, например, /inbox/:id)
     * @param {Object} component - Компонент для рендеринга
     * @param {boolean} isProtected - Защищённый маршрут
     */
    constructor(path, component, withContent = false, isProtected = false) {
        this.path = path;
        this.component = component;
        this.protected = isProtected;
        this.withContent = withContent;

        // Разделяем путь на части для сопоставления
        this.parts = this.path.split('/').filter(part => part !== '');
    }

    /**
     * Проверяет, соответствует ли данный маршрут указанному URL и извлекает параметры
     * @param {string} url - Текущий URL
     * @returns {object|null} - Объект с параметрами или null, если не соответствует
     */
    match(url) {
        const urlParts = url.split('/').filter(part => part !== '');
        if (urlParts.length !== this.parts.length) {
            return null;
        }

        const params = {};

        for (let i = 0; i < this.parts.length; i++) {
            const routePart = this.parts[i];
            const urlPart = urlParts[i];

            if (routePart.startsWith(':')) {
                const paramName = routePart.slice(1);
                params[paramName] = urlPart;
            } else if (routePart !== urlPart) {
                return null;
            }
        }

        return params;
    }
}