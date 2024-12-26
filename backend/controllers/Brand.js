const Brand = require("../models/Brand");

// Controller to handle getting all brands
const getAll = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ message: "Error fetching brands", error: err });
  }
};

// Controller to handle creating a new brand
const createBrand = async (req, res) => {
  const { name } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).json({ message: "Brand name is required" });
  }

  try {
    // Create and save the new brand
    const newBrand = new Brand({
      name,
    });
    await newBrand.save();

    res.status(201).json({
      message: "Brand created successfully",
      brand: newBrand,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating brand", error: err });
  }
};
const editBrand = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      const brand = await Brand.findByIdAndUpdate(id, { name }, { new: true });
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.status(200).json(brand);
    } catch (err) {
      res.status(500).json({ message: "Error updating brand", error: err });
    }
  };
  
  // Delete brand
  const deleteBrand = async (req, res) => {
    try {
      const { id } = req.params;
      const brand = await Brand.findByIdAndDelete(id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.status(200).json({ message: "Brand deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting brand", error: err });
    }
  };
  
module.exports = {
  getAll,
  createBrand,
  editBrand,
  deleteBrand,
};
