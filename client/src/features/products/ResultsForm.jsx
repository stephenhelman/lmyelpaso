import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "./productsApiSlice";
import {
  useDeleteUpdateMutation,
  useAddNewAddUpdateMutation,
  useAddNewRemoveUpdateMutation,
} from "../updates/updatesSlice";
import { updateMessage, createUpdate } from "../../helper/productHelpers";

const ResultsForm = ({ product }) => {
  const [number, setNumber] = useState(0);
  const [newQuantity, setNewQuantity] = useState(product.quantity);
  const { name, quantity, id, updates } = product;
  const navigate = useNavigate();
  const { isAdmin, username, userId } = useAuth();

  const [
    deleteProduct,
    {
      isSuccess: isDeleteProductSuccess,
      isError: isDeleteProductError,
      error: deleteProductError,
    },
  ] = useDeleteProductMutation();
  const [
    updateProduct,
    {
      isSuccess: isUpdateProductSuccess,
      isError: isUpdateProductError,
      error: updateProductError,
    },
  ] = useUpdateProductMutation();
  const [
    deleteUpdate,
    {
      isSuccess: isDeleteUpdateSuccess,
      isError: isDeleteUpdateError,
      error: deleteUpdateError,
    },
  ] = useDeleteUpdateMutation();
  const [
    addNewAddUpdate,
    {
      isSuccess: isAddUpdateSuccess,
      isError: isAddUpdateError,
      error: addUpdateError,
    },
  ] = useAddNewAddUpdateMutation();
  const [
    addNewRemoveUpdate,
    {
      isSuccess: isRemoveUpdateSuccess,
      isError: isRemoveUpdateError,
      error: removeUpdateError,
    },
  ] = useAddNewAddUpdateMutation();

  const handleIncrement = () => {
    setNumber(Number(number) + 1);
  };

  const handleDecrement = () => {
    if (Number(number) <= 0) {
      return setNumber(0);
    }
    setNumber(Number(number) - 1);
  };

  const handleAddQuantity = async (e) => {
    e.preventDefault();
    //create the update in the database
    const message = updateMessage("addQuantity", username, number);
    const update = createUpdate(id, userId, message);
    const newQuantity = Number(quantity) + Number(number);
    const addUpdate = {
      ...update,
      prevQuantity: Number(quantity),
      newQuantity: newQuantity,
      difference: Number(number),
    };
    const result = await addNewAddUpdate(addUpdate);
    console.log("Add Update Created");
    //if there is an error creating the update, alert with the error
    if (isAddUpdateError) {
      return alert(JSON.stringify(addUpdateError));
    }

    const updateId = result?.data?._id;
    await updateProduct({
      id,
      quantity: newQuantity,
      updates: [...updates, updateId],
    });
    console.log("Product Updated");
    return navigate("/home/products");
  };

  const handleRemoveQuantity = async (e) => {
    e.preventDefault();
    //create the update in the database
    const message = updateMessage("removeQuantity", username, number);
    const update = createUpdate(id, userId, message);
    const newQuantity = Number(quantity) - Number(number);
    const removeUpdate = {
      ...update,
      prevQuantity: Number(quantity),
      newQuantity: newQuantity,
      difference: Number(number),
    };
    console.log("Remove Update Created");
    const result = await addNewRemoveUpdate(removeUpdate);

    //if there is an error creating the update, alert with the error
    if (isRemoveUpdateError) {
      return alert(JSON.stringify(removeUpdateError));
    }

    const updateId = result?.data?._id;
    await updateProduct({
      id,
      quantity: newQuantity,
      updates: [...updates, updateId],
    });
    console.log("Product Updated");
    return navigate("/home/products");
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

  const handleEditProduct = () => {
    navigate(`/home/products/${id}`);
  };

  return (
    <div>
      <div>
        <div>
          <p>QTY after</p>
          <p>{Number(quantity) - Number(number)}</p>
          <button type="button" onClick={handleRemoveQuantity}>
            Remove
          </button>
        </div>
      </div>

      <div>
        <div>
          <h1>Product: {name}</h1>
          <h2>Quantity: {quantity}</h2>
        </div>

        <div>
          <input type="number" readOnly={true} min="0" value={number} />
          <div>
            <button type="button" onClick={handleDecrement}>
              -
            </button>
            <button type="button" onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>

        <div>
          {isAdmin ? (
            <div>
              <button type="button" onClick={handleEditProduct}>
                Edit
              </button>
              <button type="button" onClick={handleDeleteProduct}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <div>
          <p>QTY after</p>
          <p>{Number(quantity) + Number(number)}</p>
          <button type="button" onClick={handleAddQuantity}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsForm;
