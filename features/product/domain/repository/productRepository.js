import ProductMoongoseRepository from "../../infraestructure/output_adapters/productMoongoseRepository.js"

class ProductRepository {
    constructor() {
        this.productMoongoseRepository = new ProductMoongoseRepository()
    }

    async createProduct(product) {
        return await this.productMoongoseRepository.createProduct(product)
    }

    async countDocuments(search) {
        return await this.productMoongoseRepository.countDocuments(search)
    }

    async getProductsByTags(field) {
        return await this.productMoongoseRepository.getProductsByTags(field)
    }

    async getProductsWithFilter(filter, optionOrder, skipCount, perPage) {
        return await this.productMoongoseRepository.getProductsWithFilter(filter, optionOrder, skipCount, perPage)
    }


}

export default ProductRepository