const { Product, ProductSchema } = require('./models/product')
const { User, UserSchema } = require('./models/user')

function setupModels(sequelize) {
  Product.init(ProductSchema, Product.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
}

module.exports = setupModels