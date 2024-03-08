import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import {
  selectAllCategories,
  useGetCategoriesQuery,
} from "../../features/categories/categoriesApiSlice";
import Loader from "../../components/Loader";
import DynamicTable from "../../components/dynamic-table/DynamicTable";
import { useSelector } from "react-redux";
import {
  categoryAddNewLink as addNewLink,
  categoryColumns as columns,
  categoryFilters as filter,
  categoryFacetedFilter as facetedFilter,
  categoryDefaultSort as defaultSort,
  categoryColumnFilter as columnFilter,
} from "./categoriesTableData";

const CategoriesPage = () => {
  const { isSuccess } = useGetCategoriesQuery();

  const data = useSelector(selectAllCategories);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>All Categories</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/dashboard">Go Back To Dashboard</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isSuccess ? (
          <DynamicTable
            data={data}
            filter={filter}
            columns={columns}
            defaultSort={defaultSort}
            facetedFilter={facetedFilter}
            addNewLink={addNewLink}
            columnFilter={columnFilter}
          />
        ) : (
          <Loader />
        )}
      </ContainerContent>
    </Container>
  );
};
export default CategoriesPage;
