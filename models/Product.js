// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // product_name column
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // price column
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        isValidDecimal(value) {
          const stringValue = String(value); // Convert to string for validation

          // Split the string into integer and decimal parts
          const [integerPart, decimalPart] = stringValue.split('.');

          // Validate precision (total number of digits)
          if (integerPart.length > 10) {
            throw new Error('Price cannot exceed a maximum of 10 digitd (including 2 decimal digits).');
          }

          // Validate scale (number of digits after the decimal point)
          if (decimalPart && decimalPart.length > 2) {
            throw new Error('Price cannot have more than 2 decimal places.');
          }
        }
      },
  },
    // stock column
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    // category_id column
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
