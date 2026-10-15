import { Hono } from 'hono'
import { db } from "../database-connect"
const route = new Hono()

const loggedUsers: any = {}

// LOGIN
route.post("/login", async (c) => {
  const body = await c.req.json()
  const query = db.query(`
    SELECT id, email, nome, password_hash FROM usuarios 
    WHERE email=:email
    LIMIT 1
  `)
  const data: any = query.get({ ":email": body.email })
  if (!data) 
    return c.json({ msg: "usuário não encontrado" }, { status: 404 })
  const isMath = await Bun.password.verify(body.password, data.password_hash)
  if (!isMath)
    return c.json({ msg: "senha inválida" }, { status: 401 })
  loggedUsers[data.id] = data
  return c.json(isMath)
})

// DESLOGAR

// AUTENTICAR

export { route }