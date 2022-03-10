const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    products:[{
        id_product: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    seller: String,
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    orderAt: { type: String, required: true },
    statusOrder: { type: String, required: true },
})

const Order = mongoose.model("Order", orderSchema)

function createNewOrder({ products, address, city, country, seller }) {
    return new Promise((resolve, reject) => {
        const orderAt = new Date().toISOString()
        const statusOrder = "pending"
        const newOrder = new Order({
            products,
            seller,
            address,
            city,
            country,
            orderAt,
            statusOrder
        })
        newOrder.save((err,data)=>{
            if(err) { reject(err) }
            else { resolve(data) }
        })
    })
}

function findByID({ id }) {
    return new Promise((resolve, reject) => {
        Order.findById(id, (err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        })
    })
}

function findByPage({ page, limit }) {
    return new Promise((resolve, reject) => {
        Order.find({}).skip((page - 1) * limit).limit(limit).exec((err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        })
    })
}

function changeStatus({ id }) {
    return new Promise((resolve, reject) => {
        const hashMap = {
            "pending": "shipped",
            "shipped": "delivered",
            "delivered": "delivered"
        }
        Order.findById(id).select("statusOrder").exec((err, data) => {
            if (err) { reject(err) }
            else {
                const currentStatus = data.statusOrder
                if(!(currentStatus in hashMap)) { reject(new Error("Invalid status")) }
                Order.findByIdAndUpdate(id, { statusOrder: hashMap[currentStatus] }, {new: true}, (err, data) => {
                    if (err || !data) { reject(new Error('Could not update')) }
                    else { resolve(data) }
                })
            }
        })
    })
}

module.exports = { createNewOrder, findByID, findByPage, changeStatus }