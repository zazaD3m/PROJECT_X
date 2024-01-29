import { Link, useParams } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import EditColorForm from "./components/EditColorForm";
import { useGetColorByIdQuery } from "../../features/colors/colorsApiSlice";
import Loader from "../../components/Loader";

const EditColor = () => {
  const { colorId } = useParams();

  const { data: color, isSuccess, isLoading } = useGetColorByIdQuery(colorId);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          Edit Color{isSuccess ? `: ${color.colorName}` : null}
        </ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/catalog/colors">All Colors</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isLoading && <Loader />}
        {isSuccess && <EditColorForm color={color} />}
      </ContainerContent>
    </Container>
  );
};
export default EditColor;
