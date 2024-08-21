import express from 'express'
import countryController from '../controllers/countyController';
const router=express.Router();
router.get('/',countryController.list)
router.get('/random',countryController.listRadom)
router.get('/:id',countryController.get)

export default router