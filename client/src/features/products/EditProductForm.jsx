import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import BarcodeGenerator from "../../components/barcode/BarcodeGenerator";
import Generator from "../../components/barcode/Generator";
import { useNavigate } from "react-router-dom";
import {
  updateMessage,
  createUpdate,
  capitalize,
} from "../../helper/productHelpers";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./productsApiSlice";
import {
  useAddNewAdminUpdateMutation,
  useDeleteUpdateMutation,
} from "../updates/updatesSlice";

const EditProductForm = ({ product }) => {
  const { name, barcode, quantity, updates, id } = product;
  const navigate = useNavigate();

  const [updateProduct, { isLoading, isSuccess, isError, error }] =
    useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [addNewAdminUpdate] = useAddNewAdminUpdateMutation();
  const [deleteUpdate] = useDeleteUpdateMutation();

  const { userId, username } = useAuth();

  const [editName, setEditName] = useState(name);
  const [editQuantity, setEditQuantity] = useState(quantity);
  const [editBarcode, setEditBarcode] = useState(barcode);

  useEffect(() => {
    if (isSuccess) {
      setEditName("");
      setEditQuantity("");
      setEditBarcode("");
    }
  }, [isSuccess]);

  const handleNameChange = (e) => setEditName(e.target.value);
  const handleQuantityChange = (e) => setEditQuantity(e.target.value);
  const handleBarcodeChange = (e) => setEditBarcode(e.target.value);

  const canSave =
    [editName, editQuantity, editBarcode].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //format product name
    const properName = capitalize(editName);

    //save product, while receiving new product
    if (canSave) {
      //creating the update
      const message = updateMessage("admin", username);
      const update = createUpdate(id, userId, message);
      const newUpdate = await addNewAdminUpdate({
        ...update,
        name: properName,
        quantity: editQuantity,
        barcode: editBarcode,
      });
      console.log("Update Created");

      //attaching the update to the product
      const updateId = newUpdate?.data?._id;
      await updateProduct({
        id,
        name: properName,
        quantity: Number(editQuantity),
        barcode: editBarcode,
        updates: [...updates, updateId],
      });
      console.log("Update Attached");
      return navigate("/home/products");
    }

    return alert("Please check all fields before continuing");
  };

  const handleDeleteProduct = async () => {
    const result = confirm(`Are you sure you want to delete ${name}?`);
    if (!result) return;
    if (updates.length) {
      await deleteUpdate({ id: id });
    }
    await deleteProduct({ id: id });
    return navigate("/home/products");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={editName}
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
          value={editQuantity}
          onChange={handleQuantityChange}
          required
        />
      </div>
      <div>
        <label htmlFor="barcode">Barcode:</label>
        <input
          type="text"
          id="barcode"
          value={editBarcode}
          onChange={handleBarcodeChange}
          required
        />
      </div>
      <div>
        <BarcodeGenerator barcode={editBarcode} productName={editName} />
        <Generator setter={setEditBarcode} />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={handleDeleteProduct}>
        Delete
      </button>
    </form>
  );
};

export default EditProductForm;
