const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../index')

chai.use(chaiHttp)

suite('CRUD Admin', ()=>{
    test('Create a new product', (done)=>{
        const product = {
            name: 'Product 1',
            price: 100,
            description: 'Product 1 description',
            category: 'Category 1',
            image: 'https://via.placeholder.com/150',
            stock: 10
        }
        chai
            .request(server)
            .post('/api/crud')
            .send(product)
            .end((err, res)=>{
                if(err) { assert.fail(err) }
                const data = res.body
                assert.equal(data.name, product.name)
                assert.equal(data.price, product.price)
                assert.equal(data.description, product.description)
                assert.equal(data.category, product.category)
                assert.equal(data.image, product.image)
                assert.equal(data.stock, product.stock)
                done()
            })
    })
    test('Get all products', (done)=>{
        chai
            .request(server)
            .get('/api/crud')
            .query({ page: 1 })
            .end((err, res)=>{
                if(err) { assert.fail(err) }
                const data = res.body
                assert.isArray(data.listOfProducts)
                done()
            })
    })

    test('Update a product', (done)=>{

        const product = {
            name: 'Product 2',
            price: 100,
            description: 'Product 2 description',
            category: 'Category test',
            image: 'https://via.placeholder.com/150',
            stock: 20
        }

        chai
            .request(server)
            .post('/api/crud')
            .send(product)
            .end((err, res)=>{
                if(err) { assert.fail(err) }
                const data = res.body
                const id = data._id
                const update = {
                    name: `Product ${Date.now()}`,
                    price: 150,
                    category: 'Category test2',
                }
                chai
                    .request(server)
                    .put('/api/crud/')
                    .query({ id })
                    .send(update)
                    .end((err, res)=>{
                        if(err) { assert.fail(err) }
                        const data = res.body
                        assert.equal(data.name, update.name)
                        assert.equal(data.price, update.price)
                        assert.equal(data.category, update.category)
                        done()
                    })
            })  
    })
    test('Delete a product', (done)=>{
        const product = {
            name: 'Product 2 delete',
            price: 100,
            description: 'Product 2 delete description',
            category: 'Category test',
            image: 'https://via.placeholder.com/150',
            stock: 20
        }

        chai
            .request(server)
            .post('/api/crud')
            .send(product)
            .end((err, res)=>{
                if(err) { assert.fail(err) }
                const data = res.body
                const id = data._id
                chai
                    .request(server)
                    .delete('/api/crud/')
                    .query({ id })
                    .end((err, res)=>{
                        if(err) { assert.fail(err) }
                        const data = res.body
                        assert.equal(data.name, product.name)
                        done()
                    })
            })
    })
})

suite('Sell Products', ()=>{
    test('Show all products', (done)=>{
        chai
            .request(server)
            .get('/api/products')
            .query({ page: 1 })
            .end((err, res)=>{
                if(err) { assert.fail(err) }
                const data = res.body
                assert.isArray(data.listOfProducts)
                assert.isAtMost(data.listLength, 10, 'The list length is greater than 10')
                done()
            })
    })
    test('Create a new order', (done)=>{
        chai
            .request(server)
            .get('/api/products')
            .query({ page: 1 })
            .end((err, res)=>{
                if(err) { assert.fail(err) }
                const data = res.body
                const product1 = data.listOfProducts[0]
                const product2 = data.listOfProducts[1]
                const order = {
                    products: [
                        {
                            id_product: product1._id,
                            quantity: 1
                        },
                        {
                            id_product: product2._id,
                            quantity: 2
                        }
                    ],
                    address: 'Address 1',
                    city: 'City 1',
                    country: 'Country 1',
                    seller: 'Seller 1'
                }
                chai
                    .request(server)
                    .post('/api/products')
                    .send(order)
                    .end((err, res)=>{
                        if(err) { assert.fail(err) }
                        const data = res.body
                        assert.equal(data.address, order.address)
                        assert.equal(data.city, order.city)
                        assert.equal(data.country, order.country)
                        assert.equal(data.seller, order.seller)
                        done()
                    })
            })
    })
    test('Update order', (done)=>{
        chai
            .request(server)
            .get('/api/products')
            .query({ page: 1 })
            .end((err, res)=>{
                if(err) { assert.fail(err) }
                const data = res.body
                const product1 = data.listOfProducts[0]
                const product2 = data.listOfProducts[1]
                const order = {
                    products: [
                        {
                            id_product: product1._id,
                            quantity: 1
                        },
                        {
                            id_product: product2._id,
                            quantity: 2
                        }
                    ],
                    address: 'Address 1',
                    city: 'City 1',
                    country: 'Country 1',
                    seller: 'Seller 1'
                }
                chai
                    .request(server)
                    .post('/api/products')
                    .send(order)
                    .end((err, res)=>{
                        if(err) { assert.fail(err) }
                        const data = res.body
                        const id = data._id
                        chai
                            .request(server)
                            .put('/api/products/')
                            .query({ id })
                            .end((err, res)=>{
                                if(err) { assert.fail(err) }
                                const data = res.body
                                assert.equal(data.statusOrder, 'shipped')
                                done()
                            })
                    })
            })
    })
})