import express from "express"
import weatherController from './../controllers/weatherController';
const router=express.Router()
router.get('/',weatherController.get)
router.get('/random',weatherController.listRadom)
export default router