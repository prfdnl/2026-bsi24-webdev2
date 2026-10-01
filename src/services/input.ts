import { type } from "arktype"

export function funcaoValidate(body: Record<any, any>, id: string) {
  const User = type({
    id: "string.numeric.parse",
    nome: "string",
    idade: "string.numeric.parse",
    email: "string"
  })

  const out = User({ ...body, id })

  if (out instanceof type.errors) {
    throw out.summary
  }

}