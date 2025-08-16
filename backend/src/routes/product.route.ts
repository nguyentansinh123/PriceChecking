import express from "express"
import { getColesSingleProduct, getColesSpecialCatalog, getIGAhalfPrice, getIGASingleProduct } from "../controller/product.controller"

export const router = express.Router()


router.get('/coles/singleProduct', getColesSingleProduct)
router.get('/coles/specialCatalog', getColesSpecialCatalog)
router.get('/IGA/singleProduct', getIGASingleProduct)
router.get('/IGA/SpecialCatalog',getIGAhalfPrice)
