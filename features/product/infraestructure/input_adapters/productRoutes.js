import express from "express";
import ProductController from "./productController.js"
import { checkRole } from "../../../../middleware/routes/checkRole.js"

const router = express.Router();
const productController = new ProductController()

router.post("/api/product/create", checkRole(["BASICUSER", "COMPLETEUSER"]), (req, res, next) => productController.createProduct(req, res, next))
router.get("/api/product/search", (req, res, next) => productController.getProductsTags(req, res, next))
router.get("/api/product/gigsbyfilter/:category?", (req, res, next) => productController.getProductsbyCategoryOrQuery(req, res, next))


export default router


