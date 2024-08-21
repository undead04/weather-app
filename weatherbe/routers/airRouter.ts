import express, { Router } from 'express'
import airController from './../controllers/airController';
const router=express.Router()
router.get("/",airController.get)
export default router