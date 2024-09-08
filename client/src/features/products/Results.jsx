import useScan from "../../hooks/useScan";
import { useGetProductsQuery } from "./productsApiSlice";
import { Navigate, useNavigate } from "react-router-dom";
import ResultsForm from "./ResultsForm";
import { PulseLoader } from "react-spinners";

const Results = () => {
  const { scanResult } = useScan();
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    /*    isSuccess,
    isError,
    error, */
  } = useGetProductsQuery();

  if (isLoading) return <PulseLoader color={"#000"} />;

  if (!products) return <PulseLoader color={"#000"} />;

  const { entities } = products;

  const entitiesArray = Object.values(entities);

  const product = entitiesArray.find((item) => item.barcode === scanResult);

  if (!product) return <Navigate to="/home/not-found" />;

  return <ResultsForm product={product} />;
};

export default Results;
