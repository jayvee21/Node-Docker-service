const express = require('express');
const productController = require('./../controllers/productsController');
const router = express.Router();
const protect = require('./../middlewares/authMiddleware')
router
    .route("/")
    .get(productController.getAllProducts)
    .post(protect, productController.createProduct);


router
    .route("/:id")
    .get(productController.getOneProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteRecord);


module.exports = router;