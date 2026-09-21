const express = require("express");

const { createProduit, getAllProduits } = require("../controllers/pController.js");
const adminOnly = require("../middleware/Pm.js");
const router = express.Router();

// Register
router.post("/create", adminOnly, createProduit);

// Get all produits
router.get("/get-all", getAllProduits);

module.exports = router;
