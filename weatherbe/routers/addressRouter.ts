import express from 'express'
import addressService from '../services/addressService';
const router=express.Router();
router.get('/',addressService.get)
export default router