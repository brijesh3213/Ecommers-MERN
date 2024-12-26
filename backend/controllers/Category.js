const Category = require("../models/Category");

exports.getAll = async (req, res) => {
    try {
        const result = await Category.find({});
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching categories" });
    }
};

// Create a new category
exports.create = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = new Category({ name });
        const savedCategory = await category.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating category" });
    }
};

// Update an existing category by ID
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Find and update the category
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating category" });
    }
};

// Delete a category by ID
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the category
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting category" });
    }
};
