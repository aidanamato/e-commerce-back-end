const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  Product.findAll({
    attributes: {
      exclude: ['category_id']
    },
    include: [
      {
        model: Category,
      },
      {
        model: Tag
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
router.get('/:id', ({params}, res) => {
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
      },
      {
        model: Tag
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
    .then((dbProductData) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (body.tagIds) {
        const productTagIdArr = body.tagIds.map(tag_id => {
          return {
            product_id: dbProductData.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr)
          .then(productTagIds => res.json(
            {
              newProduct: dbProductData, 
              tags: productTagIds
            })
          );
      }
      // if no product tags, just respond
      res.json(dbProductData);
    })
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
    .then(async dbProductData => {
      if (!dbProductData) {
        res.status(404).end();
        return;
      }
      // find all associated tags from ProductTag
      const productTags = await ProductTag.findAll({ where: { product_id: params.id } })
          .then(productTags => productTags);
      return {dbProductData, productTags};
    })
    .then(({dbProductData, productTags}) => {
      // if product tags are being updated
      if (body.tagIds) {
        // run updateTags static method
        return Product.updateTags(productTags, body, params, ProductTag)
          .then(dbTagsData => res.json({
            product_changes: dbProductData, 
            tag_changes: dbTagsData
          })
        );
      }
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
        res.status(404).json({message: 'No product found with this id'});
        return;
      }
      res.json({message: 'success'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
