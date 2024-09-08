import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

const ScannerContext = createContext({});

export const ScannerProvider = ({ children }) => {
  const [scanResult, setScanResult] = useState({});

  return (
    <ScannerContext.Provider value={{ scanResult, setScanResult }}>
      <Outlet>{children}</Outlet>
    </ScannerContext.Provider>
  );
};

export default ScannerContext;
