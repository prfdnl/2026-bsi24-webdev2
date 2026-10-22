import { Hono } from 'hono'
import { setCookie, getCookie } from 'hono/cookie'
import { db } from "../database-connect"
const route = new Hono()
const loggedUsers: any = {}

//
// @todo: ORGANIZAR ESTE ARQUIVO
//

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
  const uuid = crypto.randomUUID()
  delete data.password_hash
  loggedUsers[uuid] = data
  setCookie(c, "ses", uuid)
  return c.json(isMath)
})

route.get("/user", (c) => {
  const sesuuid = getCookie(c, "ses")
  if (!sesuuid)
    return c.json({ msg: "cookie ses not defined" }, { status: 400 })
  const data = loggedUsers[sesuuid]
  if (!data)
    return c.json({ msg: "usuário não logado" }, { status: 400 })
  return c.json(data)
})

export { route }