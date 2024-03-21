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
import { useGetSizesQuery } from "../../features/sizes/sizesApiSlice";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isSuccess: isProductSuccess,
    isError: isProductError,
  } = useGetProductByIdQuery(productId);

  useEffect(() => {
    if (isProductError) {
      navigate("..");
    }
  }, [isProductError]);

  const { isSuccess: isCategoriesSuccess } = useGetCategoriesQuery();
  const { isSuccess: isBrandsSuccess } = useGetBrandsQuery();
  const { isSuccess: isColorsSuccess } = useGetColorsQuery();
  const { isSuccess: isSizesSuccess } = useGetSizesQuery();
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
        {isCategoriesSuccess &&
        isBrandsSuccess &&
        isColorsSuccess &&
        isProductSuccess &&
        isSizesSuccess ? (
          <EditProductForm product={product} />
        ) : (
          <Loader />
        )}
      </ContainerContent>
    </Container>
  );
};
export default EditProduct;
