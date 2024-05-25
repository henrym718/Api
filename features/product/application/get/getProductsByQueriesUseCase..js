import ProductService from './../../domain/services/productService.js';
import ProductFilterService from './../../domain/services/productFilterService.js';


class GetProductsByQueriesUseCase {
    constructor() {
        this.productService = new ProductService()
        this.productFilterService = new ProductFilterService()
    }

    async execute(queries) {
        console.log(queries)

        return 1

    }

}

export default GetProductsByQueriesUseCase