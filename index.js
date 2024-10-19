import { Route } from './src/components/router/router.js';
import { Router } from './src/components/router/router.js';
import  Inbox from './src/pages/inbox/inbox.js';
import  Login  from './src/pages/login/login.js';
import  Signup  from './src/pages/signup/signup.js';

const routes = [
    new Route('/', new Login()),
    new Route('/login', new Login()),
    new Route('/signup', new Signup()),
    new Route('/inbox', new Inbox())
];
export default new Router(routes);