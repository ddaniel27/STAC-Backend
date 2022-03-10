const { createNewProduct } = require("../models/product")

async function createProduct(req, res) {
    const { name, price, description, image, category, stock } = req.body
    try {
        const newProduct = await createNewProduct({ name, price, description, image, category, stock })
        res.status(200).json(newProduct)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = { createProduct }