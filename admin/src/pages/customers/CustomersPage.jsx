import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import CustomerTable from "./components/CustomerTable";
import {
  selectAllUsers,
  useGetAllUsersQuery,
} from "../../features/user/userApiSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const CustomersPage = () => {
  const { isSuccess } = useGetAllUsersQuery("getAllUsers");

  const data = useSelector(selectAllUsers);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>Customers</ContainerTitle>
        <Button asChild variant="outline" size="lg">
          <Link to="/dashboard">Go Back</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isSuccess ? <CustomerTable data={data} /> : <Loader />}
      </ContainerContent>
    </Container>
  );
};
export default CustomersPage;
