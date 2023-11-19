
const { Pool } = require('pg');
const config = require('../config/db_config');

const pool = new Pool(config);

const { models } = require('../db/sequelize')

class ProductService {

  constructor()
  {
      // this.client = getConnection()
  }

  async getProducts()
  {
    // const client = await pool.connect();
    // const result = await client.query('SELECT * FROM "PRODUCTS"');
    // client.release();

    const products = await models.Products.findAll();
    // if(!result )
    // {
    //   throw new Error("There are not products")
    // }

    return products
  }

  async saveNewProduct(name, price, currency, description)
  {
    // const client = await pool.connect();
    // await client.query('INSERT INTO "PRODUCTS" (NAME, PRICE, CURRENCY, DESCRIPTION) VALUES($1, $2, $3, $4)', [name, price, currency, description]);
    // client.release();

    const productCreated = await models.Products.create({
      name: name,
      price: price,
      currency: currency,
      description: description
    })

    console.log(productCreated)

  }

  async updateProduct(productId, name, price, currency, description)
  {
    // const client = await pool.connect();
    // const result = await client.query('UPDATE "PRODUCTS" SET name = $1, price = $2, currency = $3, description = $4 WHERE id = $5', [name, price, currency, description, productId]);
    // client.release();

    // if (result.rowCount === 1) {
    //   return result.rowCount
    // } else if (result.rowCount === 0) {
    //   throw new Error(`Product with id:${productId} was not found`)
    // } else {
    //   throw new Error('Internal server error')
    // }

    const product = await models.Products.findByPk(productId)

    if (!product)
    {
      throw new Error("Product not found")
    }

    await product.update({
      name: name,
      price: price,
      currency: currency,
      description: description
    })

  }

  // update insert 
  async upsertProduct(productId, name, price, currency, description)
  {
    // const client = await pool.connect();
    // const result = await client.query('UPDATE "PRODUCTS" SET name = $1, price = $2, currency = $3, description = $4 WHERE id = $5', [name, price, currency, description, productId]);
    // client.release();

    // if (result.rowCount === 1) {
    //   return result.rowCount
    // } else if (result.rowCount === 0) {
    //   await this.saveNewProduct(name, price, currency, description)
    //   return result.rowCount
    // } else {
    //   throw new Error('Internal server error')
    // }

    const product = await models.Products.findByPk(productId)

    if (!product)
    {
      this.saveNewProduct(name, price, currency, description)
    }

    await product.update({
      name: name,
      price: price,
      currency: currency,
      description: description
    })
  }

  async deleteProduct(productId)
  {
    // const client = await pool.connect();
    // const result = await client.query('DELETE FROM "PRODUCTS" WHERE id = $1', [productId]);
    // client.release();
    // return result.rowCount

    const prodctToDelete = await models.Products.findByPk(productId)
    prodctToDelete.destroy()
    
  }
}

module.exports = ProductService