import { Link, useParams } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import { useGetBrandByIdQuery } from "../../features/brands/brandsApiSlice";
import EditBrandForm from "./components/EditBrandForm";
import Loader from "../../components/Loader";

const EditBrand = () => {
  const { brandId } = useParams();

  const { data: brand, isSuccess, isLoading } = useGetBrandByIdQuery(brandId);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Edit Brand</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/brands">All Brands</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isLoading && <Loader />}
        {isSuccess && <EditBrandForm brand={brand} />}
      </ContainerContent>
    </Container>
  );
};
export default EditBrand;
