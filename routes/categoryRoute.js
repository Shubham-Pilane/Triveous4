const express = require('express');
const categoryRoute = express.Router();
const {CategoryModel} = require('../models/categoryModel');
const {authenticateUser} = require('../middleware/authentication');

// 1. Route to list all categories
categoryRoute.get('/', async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Falied to get category details ' });
  }
});

// 2. Route to create a new category
categoryRoute.post('/addCategory', authenticateUser, async (req, res) => {
  const { name } = req.body
  try {
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = new CategoryModel({ name });
    await category.save();

    res.json({ message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Falied to create new category ' });
  }
});

// 3.Route to update category details
categoryRoute.put('/:categoryId', authenticateUser, async (req, res) => {
  const categoryId = req.params.categoryId;
  const { name } = req.body;

  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name;
    await category.save();

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Falied to update Category' });
  }
});

module.exports = {categoryRoute};
