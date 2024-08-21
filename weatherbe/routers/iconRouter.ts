import express, { Router } from 'express'
import iconContrller from './../controllers/iconController';
const router=express.Router()
router.get("/:nameIcon",iconContrller.get)
export default router