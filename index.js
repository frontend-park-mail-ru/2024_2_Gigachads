import { Route } from "./src/components/router/router.js";
import { Router } from "./src/components/router/router.js";
import { default as Inbox} from "./src/pages/inbox/inbox.js";
import { default as Login } from "./src/pages/login/login.js";
import { default as Signup } from "./src/pages/signup/signup.js";


const routes = [
    new Route('/login', new Login()),
    new Route('/signup', new Signup()),
    new Route('/inbox', new Inbox())
];
export default new Router(routes);