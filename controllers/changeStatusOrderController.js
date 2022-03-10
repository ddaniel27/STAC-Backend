const { changeStatus } = require("../models/order")

async function changeOrderStatus(req, res) {
    const { id } = req.query
    try {
        const data = await changeStatus({ id })
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = { changeOrderStatus }