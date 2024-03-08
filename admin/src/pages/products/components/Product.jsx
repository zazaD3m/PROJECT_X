import { useSelector } from "react-redux";
import { selectProductById } from "../../../features/products/productsApiSlice";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../../components/ui/container";

const Product = ({ productId }) => {
  // const product = useSelector((state) => selectProductById(state, productId));
  return (
    <div>
      <Container>
        <ContainerHeader>
          <ContainerTitle>{product.title}</ContainerTitle>
        </ContainerHeader>
        <ContainerContent className="flex gap-x-8">
          {Object.keys(product.images).map((imgIndex) => (
            <img
              key={imgIndex}
              src={product.images[imgIndex].href}
              alt={product.images[imgIndex].alt}
              className="h-40 w-40"
            />
          ))}
        </ContainerContent>
      </Container>
    </div>
  );
};
export default Product;
