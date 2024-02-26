/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import { Button } from "../../components/ui/button";
import Loader from "../../components/Loader";
import { useGetProductByIdQuery } from "../../features/products/productsApiSlice";
import EditProductForm from "./components/product-form/EditProductForm";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApiSlice";
import { useGetBrandsQuery } from "../../features/brands/brandsApiSlice";
import { useGetColorsQuery } from "../../features/colors/colorsApiSlice";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isSuccess: isProductSuccess,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductByIdQuery(productId);

  useEffect(() => {
    if (isProductError) {
      navigate("..");
    }
  }, [isProductError]);

  const { isSuccess: isCategoriesSuccess, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const { isSuccess: isBrandsSuccess, isLoading: isBrandsLoading } =
    useGetBrandsQuery();
  const { isSuccess: isColorsSuccess, isLoading: isColorsLoading } =
    useGetColorsQuery();

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          Edit Product{isProductSuccess ? `: ${product.title}` : null}
        </ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/products">All Products</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {(isCategoriesLoading ||
          isBrandsLoading ||
          isColorsLoading ||
          isProductLoading) && <Loader />}
        {isCategoriesSuccess &&
          isBrandsSuccess &&
          isColorsSuccess &&
          isProductSuccess && <EditProductForm product={product} />}
      </ContainerContent>
    </Container>
  );
};
export default EditProduct;
