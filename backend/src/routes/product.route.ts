import express from "express"
import { 
  getColesSingleProduct, 
  getColesSpecialCatalog,
  getColesHalfPrice, 
  getIGAhalfPrice, 
  getIGASingleProduct, 
  getWWhalfPrice, 
  getWWsingleProduct,
  searchProducts
} from "../controller/product.controller"

export const router = express.Router()


router.get('/coles/singleProduct', getColesSingleProduct)
router.get('/coles/specialCatalog', getColesSpecialCatalog)
router.get('/coles/halfPrice', getColesHalfPrice) 
router.get('/IGA/singleProduct', getIGASingleProduct)
router.get('/IGA/SpecialCatalog', getIGAhalfPrice)
router.get('/WW/singleProduct', getWWsingleProduct)
router.get('/WW/halfPrice', getWWhalfPrice)
router.get('/search', searchProducts)
