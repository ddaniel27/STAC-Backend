const { deleteByID } = require("../models/product")

async function deleteProduct(req, res) {
    const id = req.query.id
    try {
        const deletedProduct = await deleteByID(id)
        res.status(200).json(deletedProduct)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = { deleteProduct }