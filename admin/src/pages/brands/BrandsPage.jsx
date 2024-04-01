import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  useGetBrandsQuery,
  selectAllBrands,
} from "../../features/brands/brandsApiSlice";
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
  brandAddNewLink as addNewLink,
  brandColumns as columns,
  brandFilters as filter,
  brandDefaultSort as defaultSort,
} from "./brandsTableData";

const BrandsPage = () => {
  const { isSuccess } = useGetBrandsQuery();

  const data = useSelector(selectAllBrands);
  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>All Brands</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/">Go Back To Dashboard</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isSuccess ? (
          <DynamicTable
            data={data}
            filter={filter}
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
export default BrandsPage;
