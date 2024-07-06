const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', (req, res) => {
  // Be sure to include its associated Product data
  const tags = Tag.findAll({
    include: {
      model: Product
    }
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get one tag by its `id` value
router.get('/:id', (req, res) => {
  // Be sure to include its associated Product data
  const tag = Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with matching id.' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTagData => {
      res.json({
        message: 'New tag created successfully.',
        data: dbTagData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'An error occurred while creating the tag.',
        error: err
      });
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (dbTagData == 0) {
        res.status(404).json({ message: 'No tag found with matching id.' });
        return;
      }
      res.json({
        message: 'Tag updated successfully.',
        data: dbTagData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (dbTagData === 0) {
        res.status(404).json({ message: 'No tag found with a matching id.' });
        return;
      }
      res.json({ message: 'Tag deleted successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
