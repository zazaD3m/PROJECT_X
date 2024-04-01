import { useSelector } from "react-redux";
import {
  selectProductIds,
  useGetProductsQuery,
} from "../../features/products/productsApiSlice";
import ProdItems from "./ProdItems";

const Prods = () => {
  const { isSuccess } = useGetProductsQuery();

  const productIds = useSelector(selectProductIds);

  return (
    <div className="flex w-[300px] flex-col gap-y-8 border p-8">
      <h1>PRODUCTS</h1>
      {isSuccess &&
        productIds.slice(0, 10).map((p) => <ProdItems key={p} id={p} />)}
    </div>
  );
};
export default Prods;
