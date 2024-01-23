import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import AddBrandForm from "./components/AddBrandForm";

const AddBrand = () => {
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Add Brand</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/brands">All Brands</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        <AddBrandForm />
      </ContainerContent>
    </Container>
  );
};
export default AddBrand;
