const express=require("express")
const brandController=require("../controllers/Brand")
const router=express.Router()

router.get("/",brandController.getAll)
router.post("/", brandController.createBrand);
// Route to edit an existing brand by its id
router.put("/:id", brandController.editBrand);

// Route to delete a brand by its id
router.delete("/:id", brandController.deleteBrand);
module.exports=router