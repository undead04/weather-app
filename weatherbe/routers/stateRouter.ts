import express from "express"
import stateController from "../controllers/stateController"
const router=express.Router()
router.get('/',stateController.list)
router.get('/:id',stateController.get)
export default router