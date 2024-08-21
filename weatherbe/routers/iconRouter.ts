import express, { Router } from 'express'
import iconContrller from './../controllers/iconController';
const router=express.Router()
router.get("/",iconContrller.list)
export default router