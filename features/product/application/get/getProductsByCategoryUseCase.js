import ProductFilterService from "../../domain/services/productFilterService.js"
import ProductService from "../../domain/services/productService.js"

class GetProductsByCategoryUseCase {
    constructor() {
        this.productService = new ProductService()
        this.productFilterService = new ProductFilterService()
    }

    async execute(categoryName, queryFilter) {
        /** paginacion */
        const { perPage, skipCount } = this.productFilterService.pagination(queryFilter)
        const { optionOrder } = this.productFilterService.orderByField(queryFilter)

        /** filtrado */
        const category = this.productFilterService.formatterCategoryName(categoryName)
        const location = this.productFilterService.location(queryFilter)
        const price = this.productFilterService.priceRange(queryFilter)
        const search = { ...category, ...location, ...price }
        /**Saber numero de paginas de la query */
        const ngigs = await this.productService.countDocuments(search)
        const nPages = Math.ceil(ngigs / perPage)

        /**llamada a la bd */
        const gigs = ngigs ? await this.productService.getProductsWithFilter(search, optionOrder, skipCount, perPage, category) : []

        /**retornar los resultados */
        return { gigs, ngigs, nPages }
    }
}

export default GetProductsByCategoryUseCase