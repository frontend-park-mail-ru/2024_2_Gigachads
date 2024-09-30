import  ErrorPage  from "../../pages/error/error.js";
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
            const {target} = event;
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
        const matchedRoute = this.routes.find(route => route.path === url); 
        if (matchedRoute) {
            const view = await matchedRoute.component.render();
            if (view != 'error') {
                root.innerHTML = view;
                matchedRoute.component.attachEventListeners();
            }
        } else {
            this.errorNavigate("Ошибка 404", "Страница не найдена");
        }
    }
}


export class Route {
    constructor(path, component) {
        this.path = path;
        this.component = component;
    }   
}