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

const ProductsPage = () => {
  const { isSuccess: isProductsSuccess } = useGetProductsQuery();
  const { isSuccess: isBrandsSuccess } = useGetBrandsQuery();

  const data = useSelector(selectAllProducts);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>All Products</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/dashboard">Go Back To Dashboard</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isProductsSuccess && isBrandsSuccess ? (
          <ProductTable data={data} columns={columns} />
        ) : (
          <Loader />
        )}
      </ContainerContent>
    </Container>
  );
};
export default ProductsPage;
