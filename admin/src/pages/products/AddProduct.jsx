import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import AddProductForm from "./components/product-form/AddProductForm";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApiSlice";
import Loader from "../../components/Loader";
import { useGetBrandsQuery } from "../../features/brands/brandsApiSlice";
import { useGetColorsQuery } from "../../features/colors/colorsApiSlice";

const AddProduct = () => {
  const { isSuccess: isCategoriesSuccess, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const { isSuccess: isBrandsSuccess, isLoading: isBrandsLoading } =
    useGetBrandsQuery();
  const { isSuccess: isColorsSuccess, isLoading: isColorsLoading } =
    useGetColorsQuery();

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Add Product</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/products">All Products</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {(isCategoriesLoading || isBrandsLoading || isColorsLoading) && (
          <Loader />
        )}
        {isCategoriesSuccess && isBrandsSuccess && isColorsSuccess && (
          <AddProductForm />
        )}
      </ContainerContent>
    </Container>
  );
};
export default AddProduct;
