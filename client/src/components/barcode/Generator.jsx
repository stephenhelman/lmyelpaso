import { v4 as uuid } from "uuid";

const Generator = ({ setter }) => {
  const generateBarcode = () => {
    const words = /[^\d]/g;
    const id = uuid();
    const digitBarcode = id.replace(words, "").slice(0, 8);
    setter(digitBarcode);
  };
  return (
    <button type="button" onClick={generateBarcode}>
      Generate
    </button>
  );
};

export default Generator;
