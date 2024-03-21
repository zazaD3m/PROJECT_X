import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import Loader from "../../components/Loader";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import AddProductForm from "./components/product-form/AddProductForm";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApiSlice";
import { useGetBrandsQuery } from "../../features/brands/brandsApiSlice";
import { useGetColorsQuery } from "../../features/colors/colorsApiSlice";
import { useGetSizesQuery } from "../../features/sizes/sizesApiSlice";

const AddProduct = () => {
  const { isSuccess: isCategoriesSuccess } = useGetCategoriesQuery();
  const { isSuccess: isBrandsSuccess } = useGetBrandsQuery();
  const { isSuccess: isColorsSuccess } = useGetColorsQuery();
  const { isSuccess: isSizesSuccess } = useGetSizesQuery();

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Add Product</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/products">All Products</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isCategoriesSuccess &&
        isBrandsSuccess &&
        isColorsSuccess &&
        isSizesSuccess ? (
          <AddProductForm />
        ) : (
          <Loader />
        )}
      </ContainerContent>
    </Container>
  );
};
export default AddProduct;
