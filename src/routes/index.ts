import { route } from './usuario'
import { Hono } from 'hono'

const routes = new Hono()

routes.route("/", route)

export { routes }
