import type { HandlerInterface } from "hono/types"
import { db } from "../database-connect"

const create = async (c) => {
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
}