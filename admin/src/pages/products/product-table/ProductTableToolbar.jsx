import { useSelector } from "react-redux";
import { FacetedFilter } from "../../../components/data-table/FacetedFilter";
import { selectAllBrands } from "../../../features/brands/brandsApiSlice";
import { Button } from "../../../components/ui/button";
import { X } from "lucide-react";
import { ViewOptions } from "../../../components/data-table/ViewOptions";
import { productColumnFilter as columnFilter } from "./productTableData";

const ProductTableToolbar = ({ table }) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  const brands = useSelector(selectAllBrands);
  const brandOptions = brands.map((brand) => {
    return {
      value: brand.brandName,
      label: brand.brandName,
    };
  });
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-2">
        <FacetedFilter
          column={table.getColumn("brand")}
          title="Brand"
          options={brandOptions}
          search={true}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <ViewOptions table={table} columnFilter={columnFilter} />
    </div>
  );
};
export default ProductTableToolbar;
