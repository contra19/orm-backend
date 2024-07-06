const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = Category.findAll({
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one category by its `id` value
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with matching id.' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new category 
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json({ message: 'Category created successfully.', category: dbCategoryData }))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (dbCategoryData[0] === 0) {
        res.status(404).json({ message: 'No category found with a matching id.' });
        return;
      }
      res.json({ message: 'Category updated successfully.', category: dbCategoryData });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (dbCategoryData === 0) {
        res.status(404).json({ message: 'No category found with this id.' });
        return;
      }
      res.json({ message: 'Category deleted successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
