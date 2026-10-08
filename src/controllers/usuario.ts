import type { Context } from "hono"
import { db } from "../database-connect"

export const create = async (c: Context) => {
  const body = await c.req.json()
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
}

export const listAll = (c: Context) => {
  const query = db.query(`SELECT * FROM usuarios`)
  const data = query.all()
  return c.json(data)
}

export const listOne = async (c: Context) => {
  const query = db.query(`SELECT * FROM usuarios WHERE id=:id`)
  const data = query.get({ ":id": c.req.param("id") })
  return c.json(data)
}

export const deleteOne = async (c: Context ) => {
  const query = db.query(`DELETE FROM usuarios WHERE id=:id LIMIT 1`)
  const data = query.run({ ":id": c.req.param("id") })
  if (data.changes > 0)
    return c.json({}, { status: 204 }) // todo
  return c.json("Not found", { status: 404 })
}

export const updateOne = async (c: Context) => {
  const body = await c.req.json()
  const query = db.query(`UPDATE usuarios SET idade=:idade, nome=:nome, email=:email WHERE id=:id LIMIT 1`)
  const data = query.run({
    ":id": c.req.param("id"),
    ":nome": body.nome,
    ":idade": body.idade,
    ":email": body.email,
  })
  return c.json(data)
}