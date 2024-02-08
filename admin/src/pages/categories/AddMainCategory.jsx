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
import AddMainCategoryForm from "./components/AddMainCategoryForm";

const AddMainCategory = () => {
  const { isSuccess, isLoading } = useGetCategoriesQuery();

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Add Main Category</ContainerTitle>
        <Button asChild variant="outline" size="lg" className="ml-auto mr-4">
          <Link to="/catalog/categories/addcategory/addsubcategory">
            Add Sub Category
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/categories">All Categories</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isLoading && <Loader />}
        {isSuccess && <AddMainCategoryForm />}
      </ContainerContent>
    </Container>
  );
};
export default AddMainCategory;
