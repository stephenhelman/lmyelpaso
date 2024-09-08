import JsBarcode from "jsbarcode";
import { useEffect, forwardRef } from "react";

const Barcode = forwardRef(function Barcode(
  { barcode, downloadBarcode, text },
  ref
) {
  useEffect(() => {
    JsBarcode(".barcode").init();
  }, [barcode]);
  return (
    <canvas
      id='barcodeIMG'
      className='barcode'
      data-format='auto'
      data-value={!barcode ? 1 : barcode}
      data-text={text}
      ref={ref}
      onClick={() => downloadBarcode(text)}></canvas>
  );
});

export default Barcode;
