import {
  selectAllProducts,
  useGetProductsQuery,
} from "../../features/products/productsApiSlice";
import Loader from "../../components/Loader";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import { productColumns as columns } from "./product-table/productTableData";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import ProductTable from "./product-table/ProductTable";
import { useSelector } from "react-redux";
import { useGetBrandsQuery } from "../../features/brands/brandsApiSlice";
import { useGetSizesQuery } from "../../features/sizes/sizesApiSlice";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApiSlice";
import { useGetColorsQuery } from "../../features/colors/colorsApiSlice";
import { useGetSalesQuery } from "../../features/sales/salesApiSlice";

const ProductsPage = () => {
  const { isSuccess: isProductsSuccess } = useGetProductsQuery();
  const { isSuccess: isBrandsSuccess } = useGetBrandsQuery();
  const { isSuccess: isSizesSuccess } = useGetSizesQuery();
  const { isSuccess: isCategoriesSuccess } = useGetCategoriesQuery();
  const { isSuccess: isColorsSuccess } = useGetColorsQuery();
  const { isSuccess: isSalesSuccess } = useGetSalesQuery();

  const data = useSelector(selectAllProducts);

  return (
    <Container className="2xl:px-8">
      <ContainerHeader>
        <ContainerTitle>All Products</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/dashboard">Go Back To Dashboard</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isProductsSuccess &&
        isBrandsSuccess &&
        isSizesSuccess &&
        isColorsSuccess &&
        isSalesSuccess &&
        isCategoriesSuccess ? (
          <ProductTable data={data} columns={columns} />
        ) : (
          <Loader />
        )}
      </ContainerContent>
    </Container>
  );
};
export default ProductsPage;
