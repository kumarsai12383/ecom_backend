const mongoose = require("mongoose");
const Product = require("../models/productDB");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort, brand} = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit);

    const skip = (page - 1) * limit;
    const filter = {};
    const sortOption = {};
    if (sort == "desc") {
      sortOption.price = -1;
    } else if(sort == "asc") {
      sortOption.price = 1;
    }
    if (category) {
      filter.category = {$in: category};
    }
    if (brand) {
      filter.brand = {$in: brand};
    }
    if (minPrice) {
      filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
    }
   
    const products = await Product.find(filter).sort(sortOption).skip(skip).limit(limit).select("name description price category brand image rating stock -_id");

    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.id }).select("name description price category brand image product_id rating stock -_id");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: req.params.id },
      req.body,
      { new: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      product_id: req.params.id,
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", data: deletedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create multiple products
const createProducts = async (req, res) => {
  try {
    const newProducts = await Product.insertMany(req.body);
    res
      .status(201)
      .json({ message: "Products created successfully", data: newProducts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProducts,

};
