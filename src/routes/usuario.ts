import { db } from "../database-connect"
import { Hono } from 'hono'
import * as controller from "../controllers/usuario"

const usuarios = new Hono()

usuarios.get('/usuario', (c) => {
  const query = db.query(`SELECT * FROM usuarios`)
  const data = query.all()
  return c.json(data)
})

usuarios.post('/usuario', controller.create)

usuarios.get('/usuario/:id', async (c) => {
  const query = db.query(`SELECT * FROM usuarios WHERE id=:id`)
  const data = query.get({ ":id": c.req.param("id") })
  return c.json(data)
})

usuarios.delete('/usuario/:id', async (c) => {
  const query = db.query(`DELETE FROM usuarios WHERE id=:id LIMIT 1`)
  const data = query.run({ ":id": c.req.param("id") })
  if (data.changes > 0)
    return c.json({}, { status: 204 }) // todo
  return c.json("Not found", { status: 404 })
})

usuarios.put('/usuario/:id', async (c) => {
  const body = await c.req.json()
  const query = db.query(`UPDATE usuarios SET idade=:idade, nome=:nome, email=:email WHERE id=:id LIMIT 1`)
  const data = query.run({
    ":id": c.req.param("id"),
    ":nome": body.nome,
    ":idade": body.idade,
    ":email": body.email,
  })
  return c.json(data)
})

export { usuarios }