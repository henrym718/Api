import ProductRepository from "../repository/productRepository.js"

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository()
    }

    async createProduct(product) {
        return await this.productRepository.createProduct(product)
    }

    async countDocuments(search) {
        return await this.productRepository.countDocuments(search)
    }

    async getProductsByTags(search) {
        return await this.productRepository.getProductsByTags(search)
    }

    async getProductsWithFilter(filter, optionOrder, skipCount, perPage) {
        return await this.productRepository.getProductsWithFilter(filter, optionOrder, skipCount, perPage)
    }
}

export default ProductService