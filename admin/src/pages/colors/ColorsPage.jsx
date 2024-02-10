import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  useGetColorsQuery,
  selectAllColors,
} from "../../features/colors/colorsApiSlice";
import Loader from "../../components/Loader";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import { Button } from "../../components/ui/button";
import DynamicTable from "../../components/dynamic-table/DynamicTable";
import {
  colorAddNewLink as addNewLink,
  colorColumns as columns,
  colorFilters as filters,
  colorDefaultSort as defaultSort,
} from "./colorsTableData";

const ColorsPage = () => {
  const { isSuccess } = useGetColorsQuery("getColors");

  const data = useSelector(selectAllColors);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>All Colors</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/dashboard">Go Back To Dashboard</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isSuccess ? (
          <DynamicTable
            data={data}
            filters={filters}
            columns={columns}
            defaultSort={defaultSort}
            addNewLink={addNewLink}
          />
        ) : (
          <Loader />
        )}
      </ContainerContent>
    </Container>
  );
};
export default ColorsPage;
