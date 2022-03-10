const { findByPage } = require("../models/product")

async function getProducts(req, res) {
    const page = req.query.page
    const limit = 10
    try{
        const products = await findByPage({ page, limit })
        res.status(200).json({listLength:products.length,listOfProducts:products})
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}

module.exports = { getProducts }