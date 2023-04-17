import {Router} from "express"
import {savePlato, getPlato, getPlatos, getPlatosCount, eliminarPlato, editarPlato, login} from "../controllers/platos"





const router = Router()

router.get("/platos", getPlatos)

router.get("/platos/count", getPlatosCount)

router.get("/platos/:id", getPlato)

router.post("/platos", savePlato)

router.delete("/platos/:id", eliminarPlato)

router.put("/platos/:id", editarPlato)

router.post("/platos/login", login)

export default router