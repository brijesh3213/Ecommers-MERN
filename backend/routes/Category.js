const express = require("express");
const categoryController = require("../controllers/Category");
const router = express.Router();

// Get all categories
router.get("/", categoryController.getAll);

// Create a new category
router.post("/", categoryController.create);

// Update a category by ID
router.put("/:id", categoryController.update);

// Delete a category by ID
router.delete("/:id", categoryController.delete);

module.exports = router;
