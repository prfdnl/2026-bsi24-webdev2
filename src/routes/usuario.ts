import { Hono } from 'hono'
import * as controller from "../controllers/usuario"
const route = new Hono()
route.get('/usuario', controller.listAll)
route.post('/usuario', controller.create)
route.get('/usuario/:id', controller.listOne)
route.delete('/usuario/:id', controller.deleteOne)
route.put('/usuario/:id', controller.updateOne)
export { route }