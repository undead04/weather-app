import express from "express"
import forecastWeatherController from "../controllers/forecaseWeatherController";
const router=express.Router()
router.get('/',forecastWeatherController.get)
export default router