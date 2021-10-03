const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    attributes: {
      exclude: ['category_id']
    },
    include: [
      {
        model: Category,
      }
    ]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: params.id
    },
    attributes: {
      exclude: ['category_id']
    },
    include: [
      {
        model: Category
      }
    ]
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({message: 'No product found with this id'});
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', ({body}, res) => {
  /* body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      category_id: 6,
      
      // Optional
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(body)
    .then(dbProductData => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (body.tagIds) {
        const productTagIdArr = body.tagIds.map(tag_id => {
          return {
            product_id: dbProductData.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(dbProductData);
    })
    .then(productTagIds => res.status(200).json(productTagIds))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', ({params, body}, res) => {
  // update product data
  Product.update(body, {
    where: {
      id: params.id,
    },
  })
    .then(dbProductData => {
      // find all associated tags from ProductTag
      // return ProductTag.findAll({ where: { product_id: params.id } });
      return {
        productTags: [],
        dbProductData
      };
    })
    .then(({productTags, dbProductData}) => {
      // if product tags are being updated
      if (productTags.length > 0) {
        // run updateTags static method
        return {
          updatedProductTags: Product.updateTags(productTags, body, params),
          dbProductData
        };
      }
      return {dbProductData};
    })
    .then(({dbProductData, updatedProductTags}) => {
      // if product tags were updated, return ProductTags and Product data
      if (updatedProductTags) {
        res.json({
          updatedProductTags,
          dbProductData
        });
        return;
      }
      // if product tags were not updated just return Product data
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', ({params}, res) => {
  Product.destroy({
    where: {
      id: params.id
    }
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({message: 'No product found with this id'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
