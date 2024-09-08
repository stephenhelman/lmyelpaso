import Barcode from "./Barcode";
import { useRef } from "react";

const BarcodeGenerator = ({ barcode, productName }) => {
  const barcodeRef = useRef(null);
  const downloadBarcode = (productName) => {
    let canvas = barcodeRef.current;
    let url = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.download = `${productName}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className='barcodeContainer'>
      <Barcode
        barcode={barcode}
        ref={barcodeRef}
        downloadBarcode={downloadBarcode}
        text={productName}
      />
    </div>
  );
};

export default BarcodeGenerator;
