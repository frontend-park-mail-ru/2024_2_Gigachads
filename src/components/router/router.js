const root = document.getElementById('root');


export class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        const Navigator = document.getElementsByTagName('navigator');
        Navigator[0].addEventListener('click', (event) => {
            const {target} = event;
            if (target instanceof HTMLAnchorElement) {
                event.preventDefault();
                this.loadRoute(target.getAttribute('href'))
            }
            
        })
        // window.addEventListener('popstate', () => {
        //     this.loadRoute(window.location.pathname);
        // });
        this.loadRoute(window.location.pathname);
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute(url);
    }

    async loadRoute(url) {
        const matchedRoute = this.routes.find(route => route.path === url); 
        if (matchedRoute) {
            const view = await matchedRoute.component.render();
            root.innerHTML = view;
        } else {
            root.innerHTML = '<h1>404 Not Found</h1>';
        }
    }
}

// Route.js
export class Route {
    constructor(path, component) {
        this.path = path;
        this.component = component;
    }
}