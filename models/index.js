// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products-Categories one to many
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Product-ProductTag-Tag many to many
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
