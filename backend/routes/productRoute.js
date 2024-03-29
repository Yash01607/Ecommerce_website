import express from 'express';
import Product from '../models/productsModel.js';
import { isAuth, isAdmin } from '../util.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const name = req.query.name || '';
  const order = req.query.order || '';
  const category =
    req.query.category && req.query.category !== ' ' ? req.query.category : '';
  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0
      ? Number(req.query.max)
      : 9999999;
  const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;
  // console.log(req.query);

  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const categoryFilter = category ? { category } : {};
  const PriceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};
  const sortOrder =
    order === 'lowest'
      ? { price: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'toprated'
      ? { rating: -1 }
      : order === 'categories'
      ? { category: 1 }
      : { id: -1 };
  // console.log(rating);
  // console.log(PriceFilter);

  const products = await Product.find({
    ...nameFilter,
    ...categoryFilter,
    ...PriceFilter,
    ...ratingFilter,
  }).sort(sortOrder);
  res.send(products);
});

router.get('/:_id', async (req, res) => {
  const productId = req.params._id;
  const product = await Product.findById(productId);
  if (product) {
    res.send(product);
  } else {
    res.send('Product Dosent Exist');
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    numreviews: req.body.numreviews,
    rating: req.body.rating,
  });

  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ msg: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ msg: 'Error in creating Product' });
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    product.numreviews = req.body.numreviews;
    product.rating = req.body.rating;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ msg: 'Product Updated', data: updatedProduct });
    }
    return res.status(500).send({ msg: 'Error in Updating Product' });
  }
  return res.status(500).send({ msg: 'Error in Updating Product' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  // console.log("req");
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ msg: 'product Deleted' });
  } else {
    res.send('Error in Deleting Product');
  }
});

router.post('/:id/reviews', isAuth, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res.status(400).send({ msg: 'You already reviewd this product' });
    }
    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    product.reviews.push(review);
    product.numreviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res.status(201).send({
        msg: 'Review Created',
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    }
    return res.status(500).send({ msg: 'Error in Creating Review' });
  }
  return res.status(500).send({ msg: 'Error in Creating Review' });
});

export default router;
