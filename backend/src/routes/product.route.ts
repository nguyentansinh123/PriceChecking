import express from "express"
import { getColesSingleProduct, getColesSpecialCatalog, getIGAhalfPrice, getIGASingleProduct, getWWsingleProduct } from "../controller/product.controller"

export const router = express.Router()


router.get('/coles/singleProduct', getColesSingleProduct)
router.get('/coles/specialCatalog', getColesSpecialCatalog)
router.get('/IGA/singleProduct', getIGASingleProduct)
router.get('/IGA/SpecialCatalog',getIGAhalfPrice)
router.get('/WW/singleProduct', getWWsingleProduct)
