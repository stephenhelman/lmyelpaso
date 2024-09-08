import BarcodeGenerator from "../../components/barcode/BarcodeGenerator";
const ProductPage = ({ product }) => {
  return (
    <div>
      <p>Product: {product.name}</p>
      <p>Current Quantity: {product.quantity}</p>
      <div>
        <p>Barcode: {product.barcode}</p>
        <BarcodeGenerator
          barcode={product.barcode}
          productName={product.name}
        />
      </div>
    </div>
  );
};

export default ProductPage;
