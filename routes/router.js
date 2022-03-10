const { getProducts } = require("../controllers/getProductsController")
const { getOrders } = require("../controllers/getMetricsController")
const { postOrder } = require("../controllers/postOrderController")
const { createProduct } = require("../controllers/createProductController")
const { updateProduct } = require("../controllers/updateProductController")
const { deleteProduct } = require("../controllers/deleteProductController")

module.exports = (router) => {
    router.route('/api/products')
        .get(getProducts)
        .post(postOrder)

    router.route('/api/crud')
        .get(getProducts)
        .post(createProduct)
        .put(updateProduct)
        .delete(deleteProduct)
    
    router.route('/api/metrics')
        .get(getOrders)
}