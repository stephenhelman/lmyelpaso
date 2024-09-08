import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeGenerator from "../../components/barcode/BarcodeGenerator";
import Generator from "../../components/barcode/Generator";
import useAuth from "../../hooks/useAuth";
import {
  updateMessage,
  createUpdate,
  capitalize,
} from "../../helper/productHelpers";
import {
  useAddNewProductMutation,
  useUpdateProductMutation,
} from "./productsApiSlice";
import { useAddNewUpdateMutation } from "../updates/updatesSlice";

const NewProduct = () => {
  const [addNewProduct, { isLoading, isSuccess, isError, error }] =
    useAddNewProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addNewUpdate] = useAddNewUpdateMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setNewName("");
      setNewQuantity("");
      setNewBarcode("");
    }
  }, [isSuccess]);

  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newBarcode, setNewBarcode] = useState("1");

  const { userId, username } = useAuth();

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleQuantityChange = (e) => setNewQuantity(e.target.value);
  const handleBarcodeChange = (e) => setNewBarcode(e.target.value);

  const canSave =
    [newName, newQuantity, newBarcode].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //format product name
    const properName = capitalize(newName);

    //save product, while receiving new product
    if (canSave) {
      const newProduct = await addNewProduct({
        name: properName,
        quantity: Number(newQuantity),
        barcode: newBarcode,
      });
      console.log("Product Created");

      const id = newProduct?.data?._id;
      const updates = newProduct?.data?.updates;
      //creating the update
      const message = updateMessage("initial", username, newQuantity);
      const update = createUpdate(id, userId, message);
      const newUpdate = await addNewUpdate({ ...update });
      console.log("Update Created");

      //attaching the update to the product
      const updateId = newUpdate?.data?._id;
      const result = await updateProduct({
        id,
        updates: [...updates, updateId],
      });
      console.log("Update Attached");

      return navigate("/home/products");
    }

    return alert("Please check all fields before continuing");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={newName}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="0"
          value={newQuantity}
          onChange={handleQuantityChange}
          required
        />
      </div>
      <div>
        <label htmlFor="barcode">Barcode:</label>
        <input
          type="text"
          id="barcode"
          value={newBarcode}
          onChange={handleBarcodeChange}
          required
        />
      </div>
      <div>
        <BarcodeGenerator barcode={newBarcode} productName={newName} />
        <Generator setter={setNewBarcode} />
      </div>
      <button>Save</button>
    </form>
  );
};

export default NewProduct;
