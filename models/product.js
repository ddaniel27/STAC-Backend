const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
})

const Product = mongoose.model("Product", productSchema)

function createNewProduct({ name, price, description, image, category, stock }) {
    return new Promise((resolve, reject) => {
        const newProduct = new Product({
            name,
            price,
            description,
            image,
            category,
            stock
        })
        newProduct.save((err,data)=>{
            if(err) { reject(err) }
            else { resolve(data) }
        })
    })
}

function findByPage({ page, limit }) {
    return new Promise((resolve, reject) => {
        Product.find({}).skip((page - 1) * limit).limit(limit).exec((err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        })
    })
}

function updateByID(id, { name, price, description, image, category, stock }){
    return new Promise((resolve, reject) => {
        if(!id) { reject(new Error("ID is required")) }
        
        const queryObj = { $set:{}}
        
        typeof name === "string" && name.length > 0 ? queryObj.$set.name = name : null
        typeof Number(price) === "number" ? queryObj.$set.price = price : null
        typeof description === "string" && description.length > 0 ? queryObj.$set.description = description : null
        typeof image === "string" && image.length > 0 ? queryObj.$set.image = image : null
        typeof category === "string" && category.length > 0 ? queryObj.$set.category = category : null
        typeof Number(stock) === "number" ? queryObj.$set.stock = stock : null

        Product.findByIdAndUpdate(id, queryObj, { new: true }, (err, data) => {
            if (err || !data) { reject(new Error("could not update")) }
            else { resolve(data) }
        })
    })
}

function updateStock(id, amount){
    return new Promise((resolve, reject) => {
        if(!id) { reject(new Error("ID is required")) }
        if(!amount) { reject(new Error("amount is required")) }
        Product.findByIdAndUpdate(id, { $inc: { stock: -amount } }, { new: true }, (err, data) => {
            if (err || !data) { reject(new Error("could not update")) }
            else { resolve(data) }
        })
    })
}

function deleteByID(id){
    return new Promise((resolve, reject) => {
        if(!id) { reject(new Error("ID is required")) }
        Product.findByIdAndDelete(id, (err, data) => {
            if (err || !data) { reject(new Error("could not delete")) }
            else { resolve(data) }
        })
    })
}


module.exports = { createNewProduct, findByPage, updateByID, deleteByID, updateStock }
