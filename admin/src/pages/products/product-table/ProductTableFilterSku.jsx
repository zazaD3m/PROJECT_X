import { DebouncedInput } from "../../../components/ui/input";

const ProductTableFilterSku = ({ column }) => {
  return (
    <DebouncedInput
      debounce={1000}
      id="productTableFilterSku"
      value={column?.getFilterValue() ?? ""}
      onChange={(value) => {
        column?.setFilterValue(String(value));
      }}
      placeholder="Product SKU"
      className="h-8 max-w-60"
    />
  );
};
export default ProductTableFilterSku;
