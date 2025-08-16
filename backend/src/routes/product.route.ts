import express from "express"
import { getColesSingleProduct, getColesSpecialCatalog } from "../controller/product.controller"

export const router = express.Router()


router.get('/coles/singleProduct', getColesSingleProduct)
router.get('/coles/specialCatalog', getColesSpecialCatalog)

