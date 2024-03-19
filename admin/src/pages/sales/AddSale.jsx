import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import AddSaleForm from "./components/AddSaleForm";

const AddSale = () => {
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Add Sale</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/promotion/sales">All Sales</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        <AddSaleForm />
      </ContainerContent>
    </Container>
  );
};
export default AddSale;
