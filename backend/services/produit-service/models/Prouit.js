const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

  }
);

module.exports = mongoose.model("Produit", produitSchema);