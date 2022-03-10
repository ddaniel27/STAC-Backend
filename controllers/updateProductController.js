const { updateByID } = require("../models/product")

async function updateProduct(req, res) {
    const id = req.query.id
    const { name, price, description, image, category, stock } = req.body
    try {
        const updatedProduct = await updateByID(id, { name, price, description, image, category, stock })
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = { updateProduct }