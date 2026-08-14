const mongoose = require("mongoose");
const Product = require("../models/productDB");
const router = require("express").Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProducts,
  
} = require("../controllers/productControllers");

// Get all products
router.get("/", getAllProducts);
// Get a product by ID
router.get("/:id", getProductById);
// Get products by filter

// Create a new product
router.post("/d_05072005/", createProduct);
// Update a product by ID
router.put("/d_05072005/:id", updateProduct);
// Delete a product by ID
router.delete("/d_05072005/:id", deleteProduct);
//insert many
router.post("/bulk", createProducts);

module.exports = router;