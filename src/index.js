import { Route } from './components/router/router.js';
import { Router } from './components/router/router.js';
import  Inbox from './pages/inbox/inbox.js';
import  Login  from './pages/login/login.js';
import  Signup  from './pages/signup/signup.js';
import  CreateEmail  from './pages/create_email/create_email.js';
import  EmailPage  from './pages/email/email.js';
import  Settings  from './pages/settings/settings.js';
import  Sent  from './pages/sent/sent.js';

const routes = [
    new Route('/', new Login()),
    new Route('/login', new Login()),
    new Route('/signup', new Signup()),
    new Route('/inbox', new Inbox(), false , true),
    new Route('/create_email', new CreateEmail(), true, true),
    new Route('/email/:id', new EmailPage(), true, true),
    new Route('/settings', new Settings(), true, true),
    new Route('/sent', new Sent(), true, true),
];
export default new Router(routes);