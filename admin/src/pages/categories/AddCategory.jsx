import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";

const AddCategory = () => {
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Add Category</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/categories">All Categories</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        <div className="flex flex-col items-center gap-y-12 p-20">
          <Button asChild className="w-48">
            <Link to="addmaincategory">Add main category</Link>
          </Button>
          <Button asChild className="w-48">
            <Link to="addsubcategory">Add sub category</Link>
          </Button>
        </div>
      </ContainerContent>
    </Container>
  );
};
export default AddCategory;
