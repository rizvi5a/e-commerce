const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  console.log('here')
  // find all categories
  // be sure to include its associated Products
  try {
    
    const categoryData = await Category.findAll({
      include : [{all: true, nested:true}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include : [{all: true, nested:true}]

    //  include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
 }

});

router.post('/',  async (req, res) => {
  // create a new category
try {
const categoryNew = await Category.create({
  category_name:req.body.category_name
});
res.status(200).json(categoryNew);
} catch (err) {
res.status(400).json(err);

//res.send('hello world hello')
} 
});

router.put('/:id',  (req, res) => {
  // update a category by its `id` value
  res.send('hello-xxxxx')

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
