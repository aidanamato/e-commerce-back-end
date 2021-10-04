const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: {
          exclude: ['category_id']
        }
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one category
router.get('/:id', ({params}, res) => {
  Category.findOne({
    where: {
      id: params.id
    },
    include: [
      {
        model: Product,
        attributes: {
          exclude: ['category_id']
        }
      }
    ]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({message: 'No category found with this id'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post a new category
router.post('/', ({body}, res) => {
  Category.create({
    category_name: body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => res.status(400).json(err));
});

// update a category
router.put('/:id', ({params, body}, res) => {
  Category.update(
    {
      category_name: body.category_name
    },
    {
      where: {
        id: params.id
      }
    }
  )
    .then(dbCategoryData => {
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete a category
router.delete('/:id', ({params}, res) => {
  Category.destroy({
    where: {
      id: params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({message: 'No category found with this id'});
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