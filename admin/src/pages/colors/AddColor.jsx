import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import AddColorForm from "./components/AddColorForm";

const AddColor = () => {
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Add Color</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/colors">All Colors</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        <AddColorForm />
      </ContainerContent>
    </Container>
  );
};
export default AddColor;
