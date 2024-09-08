const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Update",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
