import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import Loader from "../../components/Loader";
import AddSizeForm from "./components/AddSizeForm";
import { useGetSizesQuery } from "../../features/sizes/sizesApiSlice";

const SizesPage = () => {
  const { data: sizes, isSuccess } = useGetSizesQuery();

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Sizes</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/dashboard">Go Back To Dashboard</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent className="min-h-[75vh]">
        {isSuccess ? <AddSizeForm sizes={sizes} /> : <Loader />}
      </ContainerContent>
    </Container>
  );
};
export default SizesPage;
