import { routes } from './routes'
import { Hono } from 'hono'

const app = new Hono()
app.route("/", routes)

Bun.serve({
  port: 3000,
  fetch: app.fetch,
})