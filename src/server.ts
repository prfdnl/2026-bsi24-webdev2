import index from "../public/index.html"
import home from "../public/home.html"

import { routes } from './routes'
import { Hono } from 'hono'

const app = new Hono()
app.route("/", routes)

const srv = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/home": home
  },
  fetch: app.fetch,
})

console.log(`Server is running on ${srv.url}`)