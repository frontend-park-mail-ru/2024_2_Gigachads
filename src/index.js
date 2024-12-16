import './assets/styles/index.scss';
import { Route, Router } from './components/router/router.js';
import Main from './pages/main/main.js';
import Login from './pages/login/login.js';
import Signup from './pages/signup/signup.js';
import CreateEmail from './pages/create_email/create_email.js';
import EmailPage from './pages/email/email.js';
import Settings from './pages/settings/settings.js';
import ActionPage from './pages/action/action.js';
import Statistics from './pages/statistics/statistics.js';

const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('service-worker.js');
            console.log('Сервис-воркер зарегистрирован:', registration);
        } catch (error) {
            console.error('Ошибка регистрации сервис-воркера:', error);
        }
    } else {
        console.warn('Сервис-воркеры не поддерживаются этим браузером.');
    }
};

window.addEventListener('load', registerServiceWorker);

const routes = [
    () => new Route('/', new Login()),
    () => new Route('/login', new Login()),
    () => new Route('/signup', new Signup()),
    () => new Route('/main', new Main(), false, true),
    () => new Route('/create_email', new CreateEmail(), true, true),
    () => new Route('/email/:id', new EmailPage(), true, true),
    () => new Route('/settings', new Settings(), true, true),
    () => new Route('/action/:actionName', new ActionPage(), false, true),
    () => new Route('/statistics', new Statistics(), false, true),
];

export default new Router(routes.map(route => route()));

