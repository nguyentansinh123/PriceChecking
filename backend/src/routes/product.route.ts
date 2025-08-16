import express from "express"
import { getColesSingleProduct } from "../controller/product.controller"

export const router = express.Router()


router.get('/coles/singleProduct', getColesSingleProduct)

