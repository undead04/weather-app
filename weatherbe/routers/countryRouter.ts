import express from 'express'
import countryController from '../controllers/countyController';
const router=express.Router();
router.get('/',countryController.list)
router.get('/random',countryController.listRandom)
router.get('/:id',countryController.get)
export default router