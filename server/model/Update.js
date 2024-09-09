//Update Schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const options = { discriminatorKey: String };

const updateSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  options,
});

const Update = mongoose.model("Update", updateSchema);
const AdminUpdate = Update.discriminator(
  "Admin",
  new mongoose.Schema(
    {
      name: String,
      quantity: Number,
      barcode: String,
    },
    options
  )
);
const AddUpdate = Update.discriminator("Add", {
  prevQuantity: Number,
  newQuantity: Number,
  difference: Number,
});
const RemoveUpdate = Update.discriminator("Remove", {
  prevQuantity: Number,
  newQuantity: Number,
  difference: Number,
});

export { Update, AdminUpdate, AddUpdate, RemoveUpdate };
