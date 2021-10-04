const router = require('express').Router();
const { Tag, Product, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: {
          exclude: ['category_id']
        },
        include: [
          {
            model: Category
          }
        ]
      }
    ]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', ({params}, res) => {
  Tag.findOne({
    where: {
      id: params.id
    },
    include: [
      {
        model: Product,
        attributes: {
          exclude: ['category_id']
        },
        include: [
          {
            model: Category
          }
        ]
      }
    ]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({message: 'No tag found with this id'});
        return;
      }
      res.json(dbTagData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', ({body}, res) => {
  /* body format
    {
      tag_name: "sports"
    }
  */
  Tag.create(body)
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', ({body, params}, res) => {
  Tag.update(body, {
    where: {
      id: params.id
    }
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', ({params}, res) => {
  Tag.destroy({
    where: {
      id: params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({message: 'No tag found with this id'});
        return;
      }
      res.json(dbTagData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;