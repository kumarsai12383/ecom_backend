const mongoose = require("mongoose");
const Product = require("../models/productDB");
const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
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
router.post("/" + process.env.CREATEPRODUCTROUTE + "/", createProduct);
// Update a product by ID
router.put("/" + process.env.ROUTECODE + "/:id", updateProduct);
// Delete a product by ID
router.delete("/" + process.env.ROUTECODE + "/:id", deleteProduct);
//insert many
router.post("/" + process.env.ROUTECODE + "/bulk", createProducts);

module.exports = router;