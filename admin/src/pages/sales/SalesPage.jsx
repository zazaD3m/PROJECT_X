import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { Button } from "../../components/ui/button";
import {
  Container,
  ContainerContent,
  ContainerHeader,
  ContainerTitle,
} from "../../components/ui/container";
import { useGetSalesQuery } from "../../features/sales/salesApiSlice";
import Sale from "./components/Sale";

const SalesPage = () => {
  const { data: sales, isSuccess } = useGetSalesQuery();

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>All Sales</ContainerTitle>
        <Button asChild variant="outline" size="lg" className="ml-auto mr-4">
          <Link to="addsale">Add New Sale</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/">Go Back To Dashboard</Link>
        </Button>
      </ContainerHeader>
      <ContainerContent>
        {isSuccess ? (
          <ul className="space-y-4">
            {sales.map((sale, i) => (
              <li
                key={sale._id}
                className="flex items-center border transition-all hover:shadow "
              >
                <span className="px-7 text-xl">{i + 1}</span>
                <Sale sale={sale} />
              </li>
            ))}
          </ul>
        ) : (
          <Loader />
        )}
      </ContainerContent>
    </Container>
  );
};
export default SalesPage;
