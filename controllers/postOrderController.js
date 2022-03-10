const { createNewOrder } = require("../models/order")
const { updateStock } = require("../models/product")

async function postOrder(req, res) {
    const { products, address, city, country, seller } = req.body
    try{
        const newOrder = await createNewOrder({ products, address, city, country, seller })
        const productsToUpdate = products.map(product => updateStock(product.id_product, product.quantity))
        await Promise.all(productsToUpdate)

        res.status(200).json(newOrder)
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}

module.exports = { postOrder }