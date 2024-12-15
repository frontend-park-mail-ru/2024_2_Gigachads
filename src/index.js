import './assets/styles/index.scss';
import { Route } from './components/router/router.js';
import { Router } from './components/router/router.js';
import  Main from './pages/main/main.js';
import  Login  from './pages/login/login.js';
import  Signup  from './pages/signup/signup.js';
import  CreateEmail  from './pages/create_email/create_email.js';
import  EmailPage  from './pages/email/email.js';
import  Settings  from './pages/settings/settings.js';
import  ActionPage  from './pages/action/action.js';
import  Statistics  from './pages/statistics/statistics.js';
const routes = [
    new Route('/', new Login()),
    new Route('/login', new Login()),
    new Route('/signup', new Signup()),
    new Route('/main', new Main(), false , true),
    new Route('/create_email', new CreateEmail(), true, true),
    new Route('/email/:id', new EmailPage(), true, true),
    new Route('/settings', new Settings(), true, true),
    new Route('/action/:actionName', new ActionPage(), false, true),
    new Route('/statistics', new Statistics(), false, true),
];
export default new Router(routes);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker зарегистрирован с областью:', registration.scope);
            })
            .catch(error => {
                console.error('Регистрация Service Worker не удалась:', error);
            });
    });
}