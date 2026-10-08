import { type } from 'arktype'
import { routes } from './routes'
import { Hono } from 'hono'

const app = new Hono()
app.route("/", routes)

// const User = type({
//   nome: "string",
//   idade: "number",
//   email: "string.email"
// })

// function ffInputType(schema: any) {
 
//   return async function (c: any, next: any) {
//     const body = await c.req.json()
//     const out = schema(body)
//     if (out instanceof type.errors)
//       return c.json(out.summary, { status: 400 })
//     return next()
//   }
// }


// app.post("/test",
//   ffInputType(User),
//   (c) => c.json("DEU BOA!")
// )

Bun.serve({
  port: 3000,
  fetch: app.fetch,
})