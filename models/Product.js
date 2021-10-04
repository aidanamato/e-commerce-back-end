// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {
  // logic to update product tags in PUT request
  static async updateTags(productTags, body, params, ProductTag) {
    // get list of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    // create filtered list of new tag_ids
    const newProductTags = body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: parseInt(params.id),
          tag_id,
        };
      });

    // if Product currently has 1 or more tags
    if (productTags.length > 0) {
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      const promise = await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags)
      ]);
      console.log(promise[1]);
      return {
        deleted: promise[0],
        created: promise[1]
      };
    }

    const promise = await ProductTag.bulkCreate(newProductTags)
    return {created: promise};
  }
}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
