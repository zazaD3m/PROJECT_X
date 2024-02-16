import { Link, useParams } from "react-router-dom";
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

const EditProduct = () => {
  const { productId } = useParams();

  const {
    data: product,
    isSuccess,
    isLoading,
  } = useGetProductByIdQuery(productId);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          Edit Product{isSuccess ? `: ${product.productName}` : null}
        </ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/products">All Products</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isLoading && <Loader />}
        {isSuccess && <EditProductForm product={product} />}
      </ContainerContent>
    </Container>
  );
};
export default EditProduct;
