import { usuarios } from './usuario'
import { Hono } from 'hono'

const routes = new Hono()

routes.route("/", usuarios)

export { routes }
