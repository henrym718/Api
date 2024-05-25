class ProductFilterService {
    orderByField(queryParams) {
        /**Recomendado */ /** por counter si esta por defecto */
        /**Nuevos arrivos */ /** siempre de mayor a menor */
        const sortOrder = queryParams?.orderby || "counter"
        const sortField = -1
        const optionOrder = { [sortOrder]: sortField }
        return { optionOrder }
    }

    priceRange(queryParams) {
        const price = {};
        const qMin = queryParams?.min && parseInt(queryParams.min);
        const qMax = queryParams?.max && parseInt(queryParams.max);

        if (qMin !== undefined) price.$gte = qMin;
        if (qMax !== undefined) price.$lte = qMax;

        return Object.keys(price).length > 0 ? { price } : null;
    }


    location(queryParams) {
        const providedLocation = queryParams?.location;
        if (providedLocation) {
            const locationQuery = { $regex: `^${providedLocation}$`, $options: "i" };
            return { location: locationQuery };
        }
        return null
    }

    pagination(queryParams) {
        const perPage = parseInt(process.env.GIGS_SHOW_BY_PAGE)
        const currentPage = parseInt(queryParams.page) || 1
        const skipCount = parseInt((currentPage - 1) * perPage)
        return { perPage, skipCount }
    }

    formatterCategoryName(categoryName) {
        const formattedCategoryName = categoryName.replace(/-/g, " ")
        return { category: { $regex: `^${formattedCategoryName}$`, $options: "i" } }
    }
}

export default ProductFilterService