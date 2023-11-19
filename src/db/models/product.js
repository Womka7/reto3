const { Model, DataTypes } = require('sequelize')

const PRODUCT_TABLE = 'PRODUCTS'

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING 
  },
  price: {
    allowNull: false,
    type: DataTypes.STRING
  },
  currency: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      isIn: [[ 'COP', 'USD' ]],
      len: 3
    },
    defaultValue: 'COP'
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
    validate: {
      len: [0, 200]
    }
  }
}

class Product extends Model
{
  static associate() {}

  static config(sequelize) 
  {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Products',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product}