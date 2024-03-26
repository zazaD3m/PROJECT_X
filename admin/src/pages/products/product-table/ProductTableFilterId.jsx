import { DebouncedInput } from "../../../components/ui/input";

const ProductTableFilterId = ({ column }) => {
  return (
    <DebouncedInput
      debounce={1000}
      id="productTableFilterId"
      value={column?.getFilterValue() ?? ""}
      onChange={(value) => {
        column?.setFilterValue(String(value));
      }}
      placeholder="Product ID"
      className="h-8 max-w-60"
    />
  );
};
export default ProductTableFilterId;
