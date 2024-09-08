import { useContext } from "react";
import ScannerContext from "../features/context/ScannerProvider";

// allows us to use auth context in other parts of the app using a custom hook
const useScan = () => {
  return useContext(ScannerContext);
};

export default useScan;
