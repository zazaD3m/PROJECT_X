import { useEffect } from "react";
import {
  selectProductIds,
  useGetProductsQuery,
} from "../../features/products/productsApiSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import Product from "./components/Product";

const ProductsPage = () => {
  const { data, isSuccess, isLoading, isError } = useGetProductsQuery();

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>All Products</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/dashboard">Go Back To Dashboard</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>{isLoading ? <Loader /> : null}</ContainerContent>
    </Container>
  );
};
export default ProductsPage;
