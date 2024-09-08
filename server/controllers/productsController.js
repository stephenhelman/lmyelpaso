const Product = require("../model/Product");
const {
  Update,
  AdminUpdate,
  AddUpdate,
  RemoveUpdate,
} = require("../model/Update");
const { format } = require("date-fns");

//get list of products GET route '/'
const getAllProducts = async (req, res) => {
  const products = await Product.find().lean();
  if (!products || !products.length)
    return res.status(400).json({ message: "No products found." });
  const productsWithSchemaInfo = await Promise.all(
    products.map(async (product) => {
      const { updates } = product;
      const updatesWithSchemaInfo = await Promise.all(
        updates.map(async (update) => {
          let updateInfo;
          if (update._t === "Admin") {
            updateInfo = await AdminUpdate.findById(update).lean().exec();
          } else if (update._t === "Add") {
            updateInfo = await AddUpdate.findById(update).lean().exec();
          } else if (update._t === "Remove") {
            updateInfo = await RemoveUpdate.findById(update).lean().exec();
          } else {
            updateInfo = await Update.findById(update).lean().exec();
          }

          return (
            {
              ...updateInfo,
            } || null
          );
        })
      );
      return {
        ...product,
        updates: [...updatesWithSchemaInfo] || null,
      };
    })
  );
  res.json(productsWithSchemaInfo);
};

//create a new product POST route '/'
const createNewProduct = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.barcode ||
    !req?.body?.quantity ||
    req?.body?.updates
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const { name, barcode, quantity, updates } = req.body;
  // check for duplicate products in the db
  const duplicate = await Product.findOne({ barcode: barcode }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    const timestamp = format(new Date(), "MM/dd/yyyy HH:mm");
    const result = await Product.create({
      name: name,
      barcode: barcode,
      quantity: quantity,
      updates: updates,
      createdAt: timestamp,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

//update a product PUT route '/'
const updateProduct = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  const product = await Product.findOne({ _id: req.body.id }).exec();
  if (!product) {
    return res
      .status(400)
      .json({ message: `No product matches ID ${req.body.id}` });
  }
  const { name, barcode, quantity, updates } = req.body;
  if (req.body?.name) product.name = name;
  if (req.body?.barcode) product.barcode = barcode;
  if (req.body?.quantity) product.quantity = quantity;
  if (req.body?.updates) product.updates = updates;
  const result = await product.save();
  res.json(result);
};

//delete an existing product DELETE route '/'
const deleteProduct = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "product ID required." });
  const product = await Product.findOne({ _id: req.body.id }).exec();
  if (!product) {
    return res
      .status(204)
      .json({ message: `No product matches ID ${req.body.id}` });
  }
  const result = await Product.deleteOne({ _id: req.body.id });

  res.json(result);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
