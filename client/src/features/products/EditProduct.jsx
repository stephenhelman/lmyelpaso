import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "./productsApiSlice";
import { PulseLoader } from "react-spinners";
import EditProductForm from "./EditProductForm";

const EditProduct = () => {
  const { productId } = useParams();
  const { product } = useGetProductsQuery("productsList", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  });

  if (!product) return <PulseLoader color={"#000"} />;

  const content = <EditProductForm product={product} />;

  return content;
};

export default EditProduct;
