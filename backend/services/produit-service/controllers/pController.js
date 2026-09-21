const p = require("../models/Prouit.js");



exports.getAllProduits = async (req, res) => {
  try {
    const produits = await p.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduit = async (req, res) => {
  const { name, category } = req.body;
  try {
    const newProduit = new p({ name, category });
    await newProduit.save();
    res.status(201).json(newProduit);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};