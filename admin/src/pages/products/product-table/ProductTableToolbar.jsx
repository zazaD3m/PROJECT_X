import { useSelector } from "react-redux";
import { FacetedFilter } from "../../../components/data-table/FacetedFilter";
import { selectAllBrands } from "../../../features/brands/brandsApiSlice";
import { Button } from "../../../components/ui/button";
import { Circle, X } from "lucide-react";
import { ViewOptions } from "../../../components/data-table/ViewOptions";
import { productColumnFilter as columnFilter } from "./productTableData";
import { selectAllSizes } from "../../../features/sizes/sizesApiSlice";
import { selectAllCategories } from "../../../features/categories/categoriesApiSlice";
import {
  convertStringToValueAndLabelObj,
  getUniqueValues,
} from "../components/utils";
import PriceRange from "./PriceRange";
import { selectAllColors } from "../../../features/colors/colorsApiSlice";
import { selectAllSales } from "../../../features/sales/salesApiSlice";
import ProductTableActions from "./ProductTableActions";

const ProductTableToolbar = ({ table }) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  const brands = useSelector(selectAllBrands);
  const brandOptions = brands.map((brand) =>
    convertStringToValueAndLabelObj(brand.brandName),
  );

  const sizes = useSelector(selectAllSizes);
  const sizeOptions = sizes
    .flatMap((size) => size.sizeNames)
    .map((size) => convertStringToValueAndLabelObj(size));

  const sales = useSelector(selectAllSales);
  const saleOptions = sales.map((sale) => ({
    value: sale.saleName,
    label: `${sale.saleName} - ${sale.saleAmount}%`,
  }));

  const genderOptions = [
    {
      label: "Man",
      value: "man",
    },
    {
      label: "Woman",
      value: "woman",
    },
    {
      label: "Boy",
      value: "boy",
    },
    {
      label: "Girl",
      value: "girl",
    },
  ];

  const statusOptions = [
    {
      label: "Forsale",
      value: "forsale",
    },
    {
      label: "Hidden",
      value: "hidden",
    },
    {
      label: "Sold",
      value: "sold",
    },
  ];

  const categories = useSelector(selectAllCategories);
  const mainCategoryOptions = getUniqueValues(
    categories,
    "mainCategoryName",
  ).map((cat) => convertStringToValueAndLabelObj(cat));
  const subCategoryOptions = getUniqueValues(categories, "subCategoryName").map(
    (cat) => convertStringToValueAndLabelObj(cat),
  );

  const colors = useSelector(selectAllColors);
  const colorOptions = colors.map((color) => ({
    ...convertStringToValueAndLabelObj(color.colorName),
    icon: (
      <Circle
        size={16}
        fill={`#${color.hexValue}`}
        color={`#${color.hexValue}`}
        className="mr-2"
      />
    ),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-2">
          <FacetedFilter
            column={table.getColumn("brand")}
            title="Brand"
            options={brandOptions}
            search={true}
          />
          <FacetedFilter
            column={table.getColumn("size")}
            title="Size"
            options={sizeOptions}
            search={true}
          />
          <FacetedFilter
            column={table.getColumn("mainCategory")}
            title="Main Cat"
            options={mainCategoryOptions}
            search={true}
          />
          <FacetedFilter
            column={table.getColumn("subCategory")}
            title="Sub Cat"
            options={subCategoryOptions}
            search={true}
          />
          <FacetedFilter
            column={table.getColumn("color")}
            title="Color"
            options={colorOptions}
            search={true}
          />
          <FacetedFilter
            column={table.getColumn("gender")}
            title="Gender"
            options={genderOptions}
          />
          <FacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statusOptions}
          />
          <FacetedFilter
            column={table.getColumn("sale")}
            title="Sale"
            options={saleOptions}
          />
          <PriceRange column={table.getColumn("price")} />
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
        <div className="flex gap-x-4">
          <ProductTableActions table={table} />
          <ViewOptions table={table} columnFilter={columnFilter} />
        </div>
      </div>
    </>
  );
};

export default ProductTableToolbar;
