import CreateProductUseCase from "../../application/create/createProductUseCase.js"
import GetProductsTagsUseCase from "../../application/get/getProductsTagsUseCase.js"
import GetProductsByCategoryUseCase from "../../application/get/getProductsByCategoryUseCase.js"
import GetProductsByQueriesUseCase from './../../application/get/getProductsByQueriesUseCase..js';
import httpError from "http-errors"


class ProductController {
    constructor() {
        this.createProductUseCase = new CreateProductUseCase();
        this.getProductsTagsUseCase = new GetProductsTagsUseCase();
        this.getProductsByCategoryUseCase = new GetProductsByCategoryUseCase();
        this.getProductsByQueriesUseCase = new GetProductsByQueriesUseCase();

        this.createProduct = this.createProduct.bind(this);
        this.getProductsTags = this.getProductsTags.bind(this);
        this.getProductsbyCategoryOrQuery = this.getProductsbyCategoryOrQuery.bind(this);
    }

    async createProduct(req, res, next) {
        try {
            const data = { ...req.body, user: req.user }
            const response = await this.createProductUseCase.execute(data)
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    }

    async getProductsTags(req, res, next) {
        try {
            const { input } = req.query
            const response = await this.getProductsTagsUseCase.execute(input)
            console.log(response)
            res.status(200).json(response)
        } catch (err) {
            next(err);
        }
    }

    async getProductsbyCategoryOrQuery(req, res, next) {
        try {
            let response
            /**aqui verifico si viene con params o con query search */
            if (req?.params.category) {
                response = await this.getProductsByCategoryUseCase.execute(req.params.category, req?.query)
            }

            if (req?.query.search) {
                response = await this.getProductsByQueriesUseCase.execute(req.query)
            }
            if (!(req?.params.category && req?.query.search)) {
                httpError.BadRequest("Error en solicitud")
            }
            const { gigs, ngigs, nPages } = result;
            res.status(200).json({ gigs, ngigs, nPages });
        } catch (err) {
            next(err);
        }
    }


}

export default ProductController 