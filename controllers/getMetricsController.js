const { findByPage } = require("../models/order")

async function getOrders(req, res) {
    const {page, limit} = req.query
    try {
        const orders = await findByPage(page, limit)
        res.status(200).json({listLength: orders.length, listOfOrders: orders})
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = { getOrders }