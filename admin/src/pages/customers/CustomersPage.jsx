import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import {
  customerColumns as columns,
  customerFilters as filter,
  customerDefaultSort as defaultSort,
  customerColumnFilter as columnFilter,
} from "./customersTableData";
import {
  selectAllUsers,
  useGetAllUsersQuery,
} from "../../features/user/userApiSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import DynamicTable from "../../components/dynamic-table/DynamicTable";

const CustomersPage = () => {
  const { isSuccess } = useGetAllUsersQuery("getAllUsers");

  const data = useSelector(selectAllUsers);

  return (
    <Container className="2xl:px-56">
      <ContainerHeader>
        <ContainerTitle>Customers</ContainerTitle>
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
            columnFilter={columnFilter}
          />
        ) : (
          <Loader />
        )}
      </ContainerContent>
    </Container>
  );
};
export default CustomersPage;
