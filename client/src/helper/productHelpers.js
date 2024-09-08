import { v4 } from "uuid";

export const createUpdate = (product, user, message) => {
  const update = {
    product: product,
    user: user,
    message: message,
  };

  return update;
};

export const updateMessage = (type, user, quantity) => {
  let message;
  switch (type) {
    case "initial":
      message = `Admin ${user} created product. Initial quantity: ${quantity}`;
      break;
    case "admin":
      message = `Admin ${user} updated product`;
      break;
    case "addQuantity":
      message = `${user} added quantity: ${quantity}`;
      break;
    case "removeQuantity":
      message = `${user} removed quantity: ${quantity}`;
      break;
    default:
      message = `${user} made an unclassified update`;
  }
  return message;
};

export const generateBarcode = () => {
  const words = /[^\d]/g;
  const id = v4();
  const digitBarcode = id.replace(words, "").slice(0, 10);
  return digitBarcode;
};

export const capitalize = (string) => {
  const wordString = string.toString();
  const words = wordString.split();
  const capitalWordsArray = words.map((word) => {
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
  });
  return capitalWordsArray.join(" ");
};
