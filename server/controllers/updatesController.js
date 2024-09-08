const {
  Update,
  AdminUpdate,
  AddUpdate,
  RemoveUpdate,
} = require("../model/Update");
const { format } = require("date-fns");
const User = require("../model/User");
const Product = require("../model/Product");

//get list of updates GET route '/'
const getAllUpdates = async (req, res) => {
  const updates = await Update.find().lean();
  if (!updates?.length)
    return res.status(400).json({ message: "No updates found." });
  const updatesWithSchemaInfo = await Promise.all(
    updates.map(async (update) => {
      const user = await User.findById(update.user).lean().exec();
      const product = await Product.findById(update.product).lean().exec();
      return {
        ...update,
        user: user?.username,
        product: product?.name,
      };
    })
  );
  res.json(updatesWithSchemaInfo);
};

//create a new update POST route '/'
const createNewUpdate = async (req, res) => {
  if (!req?.body?.product || !req?.body?.user || !req?.body?.message) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const { product, user, message } = req.body;
  // check for duplicate updates in the db
  try {
    const timestamp = format(new Date(), "MM/dd/yyyy HH:mm");
    const result = await Update.create({
      product: product,
      user: user,
      message: message,
      createdAt: timestamp,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

//@desc Delete updates associated with product
//@route DELETE /updates
//@access private
const deleteUpdates = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "product ID required." });
  const updates = await Update.find({ user: req.body.id }).exec();
  if (!updates) {
    return res
      .status(204)
      .json({ message: `No updates matches ID ${req.body.id}` });
  }
  const result = await Update.deleteMany({ product: req.body.id });

  res.json(result);
};

//@desc create admin update
//@route
//@access
const createAdminUpdate = async (req, res) => {
  if (
    !req?.body?.product ||
    !req?.body?.user ||
    !req?.body?.message ||
    !req.body.name ||
    !req?.body?.quantity ||
    !req?.body?.barcode
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const { product, user, message, name, quantity, barcode } = req.body;
  // check for duplicate updates in the db
  try {
    const timestamp = format(new Date(), "MM/dd/yyyy HH:mm");
    const result = await AdminUpdate.create({
      product: product,
      user: user,
      message: message,
      name: name,
      quantity: quantity,
      barcode: barcode,
      createdAt: timestamp,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

//@desc create add update
//@route
//@access
const createAddUpdate = async (req, res) => {
  if (
    !req?.body?.product ||
    !req?.body?.user ||
    !req?.body?.message ||
    !req.body.prevQuantity ||
    !req?.body?.newQuantity ||
    !req?.body?.difference
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const { product, user, message, prevQuantity, newQuantity, difference } =
    req.body;
  // check for duplicate updates in the db
  try {
    const timestamp = format(new Date(), "MM/dd/yyyy HH:mm");
    const result = await AddUpdate.create({
      product: product,
      user: user,
      message: message,
      prevQuantity: prevQuantity,
      newQuantity: newQuantity,
      difference: difference,
      createdAt: timestamp,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

//@desc create remove update
//@route
//@access
const createRemoveUpdate = async (req, res) => {
  if (
    !req?.body?.product ||
    !req?.body?.user ||
    !req?.body?.message ||
    !req.body.prevQuantity ||
    !req?.body?.newQuantity ||
    !req?.body?.difference
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const { product, user, message, prevQuantity, newQuantity, difference } =
    req.body;
  // check for duplicate updates in the db
  try {
    const timestamp = format(new Date(), "MM/dd/yyyy HH:mm");
    const result = await RemoveUpdate.create({
      product: product,
      user: user,
      message: message,
      prevQuantity: prevQuantity,
      newQuantity: newQuantity,
      difference: difference,
      createdAt: timestamp,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUpdates,
  createNewUpdate,
  deleteUpdates,
  createAdminUpdate,
  createAddUpdate,
  createRemoveUpdate,
};
