const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  const products = Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product by its `id` value
router.get('/:id', (req, res) => {
  // be sure to include its associated Category and Tag data
  const product = Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with matching id.' });
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
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, create pairings to bulk create in the ProductTag model
      if (req.body.tagIds && req.body.tagIds.length > 0) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr)
          .then(() => {
            res.status(200).json({ message: 'New product created successfully.', productData: product });
          });
      }
      // if no product tags, just respond
      res.status(200).json({ message: 'New product created successfully with no product tags.', productData: product });
    })
    //.then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.error('Error creating product:', err);
      if (err.errors && err.errors.length > 0) {
        // If there are validation errors from Sequelize
        const validationErrors = err.errors.map(error => ({
          field: error.path,
          message: error.message
        }));
        res.status(400).json({
          message: 'Product creation failed due to validation errors.',
          errors: validationErrors
        });
      } else {
        // Other unexpected errors
        res.status(400).json({
          message: 'Product partially created. Tags may not have been added.',
          error: err.message
        });
      }
    });
});


// update product data by its `id` value
router.put('/:id', (req, res) => {
  const productId = req.params.id;

  // update the product
  Product.update(req.body, {
    where: {
      id: productId,
    },
  })
    .then(([updatedRows]) => {
      // Check if any rows were updated
      if (updatedRows === 0) {
        return res.status(404).json({ message: 'No product found with matching id.' });
      }

      // If tagIds is not provided, skip updating tags
      if (!req.body.tagIds) {
        return res.json({ message: 'Product updated successfully without changing tags.', productId });
      }

      // If tagIds is provided and is an empty array, remove all tags
      if (req.body.tagIds.length === 0) {
        return ProductTag.destroy({
          where: { product_id: productId }
        })
          .then(() => {
            res.json({ message: 'Product updated successfully and all tags removed.', productId });
          });
      }

      // If tagIds are provided, handle ProductTag associations
      if (req.body.tagIds && req.body.tagIds.length > 0) {
        return ProductTag.findAll({
          where: { product_id: productId }
        })
          .then(productTags => {
            // Create filtered list of new tag_ids
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
              .filter(tag_id => !productTagIds.includes(tag_id))
              .map(tag_id => ({
                product_id: productId,
                tag_id
              }));

            // Figure out which tags to remove
            const productTagsToRemove = productTags
              .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
              .map(({ id }) => id);

            // Run all actions (bulkCreate new tags, destroy old tags)
            return Promise.all([
              ProductTag.destroy({ where: { id: productTagsToRemove } }),
              ProductTag.bulkCreate(newProductTags),
            ])
              .then(() => {
                // Respond with success message and updated product data
                res.json({ message: 'Product updated successfully.', productId });
              });
          });
      } else {
        // Respond with success message and updated product data (no tags updated)
        res.json({ message: 'Product partially updated successfully. Tags were not updated', productId });
      }
    })
    .catch((err) => {
      console.error('Error updating product:', err);
      res.status(400).json(err);
    });
});

// delete one product by its `id` value
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      if (dbProductData === 0) {
        res.status(404).json({ message: 'No product found with a matching id.' });
        return;
      }
      res.json({ message: 'Product deleted successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
