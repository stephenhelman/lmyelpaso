import { useParams } from "react-router-dom";
import ProductUpdate from "../updates/ProductUpdate";
import ProductPage from "./ProductPage";
import { useGetProductsQuery } from "./productsApiSlice";

const ProductPageLayout = () => {
  const { productId } = useParams();
  const { product } = useGetProductsQuery("productsList", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  });
  return (
    <div>
      <ProductPage product={product} />
      <ProductUpdate product={product} />
    </div>
  );
};

export default ProductPageLayout;
