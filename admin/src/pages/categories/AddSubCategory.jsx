import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApiSlice";
import Loader from "../../components/Loader";
import AddSubCategoryForm from "./components/AddSubCategoryForm";

const AddSubCategory = () => {
  const { isSuccess, isLoading } = useGetCategoriesQuery();
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Add Sub Category</ContainerTitle>
        <Button asChild variant="outline" size="lg" className="ml-auto mr-4">
          <Link to="/catalog/categories/addcategory/addmaincategory">
            Add Main Category
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/categories">All Categories</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isLoading && <Loader />}
        {isSuccess && <AddSubCategoryForm />}
      </ContainerContent>
    </Container>
  );
};
export default AddSubCategory;
