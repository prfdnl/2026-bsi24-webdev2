import { db } from "../database-connect"
import { Hono } from 'hono'

const usuarios = new Hono()

usuarios.get('/usuario', (c) => {
  const query = db.query(`SELECT * FROM usuarios`)
  const data = query.all()
  return c.json(data)
})

usuarios.post('/usuario', async (c) => {
  try {
    const body = await c.req.json()
    if (!body.nome)
      return c.json("faltou nome", { status: 400 })
    if (!body.idade || isNaN(body.idade))
      return c.json("idade precisa ser um número inteiro", { status: 400 })
    if (!body.email || !body.email.includes("@"))
      return c.json("precisa incluir email válido", { status: 400 })
    const query = db.query(`
          INSERT INTO usuarios (nome, idade, email) 
          VALUES ($nome, $idade, $email) 
        `)
    const resp = query.run({
      $nome: body.nome,
      $idade: body.idade,
      $email: body.email,
    })
    return c.json(resp)
  } catch (e: any) {
    if (e instanceof SyntaxError)
      return c.json("json mal formatado", { status: 400 })
    return c.json({
      message: "Internal Server Error",
      detail: e.message
    }, { status: 500 })
  }
})

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