import { route, route as usuario } from './usuario'
import { route as auth } from './auth'
import { Hono } from 'hono'
const routes = new Hono()
routes.route("/", usuario)
routes.route("/auth", auth)
export { routes }