import Loader from "../../../components/Loader";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { toast } from "../../../components/ui/use-toast";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useAddSaleToProductsMutation } from "../../../features/products/productsApiSlice";
import { useGetSalesQuery } from "../../../features/sales/salesApiSlice";

const ApplySale = ({ table }) => {
  const [
    applySale,
    { isSuccess: isApplySaleSuccess, isLoading, isApplySaleLoading },
  ] = useAddSaleToProductsMutation();
  const {
    data: sales,
    isSuccess: isSalesSuccess,
    isLoading: isSalesLoading,
  } = useGetSalesQuery();

  const handleApplySale = (data) => {
    const { saleId } = data;
    const saleName = sales.find((sale) => sale._id === saleId).saleName;
    const selectedProducts = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);
    const selectedProductIds = selectedProducts.map((product) => product._id);

    const checkProductsAlreadyOnSale = () => {
      const tempProductsAlreadyOnSale = {};
      selectedProducts.forEach((product) => {
        if (product.sale.saleName !== saleName) {
          if (!tempProductsAlreadyOnSale[product.sale.saleName]) {
            tempProductsAlreadyOnSale[product.sale.saleName] = [product._id];
          }
          tempProductsAlreadyOnSale[product.sale.saleName].push(product._id);
        }
      });
      return tempProductsAlreadyOnSale;
    };

    const productsAlreadyOnSale = checkProductsAlreadyOnSale();

    applySale({
      saleId: data.saleId,
      productIds: selectedProductIds,
      productsAlreadyOnSale,
    });
  };

  const form = useForm({
    defaultValues: { saleId: "" },
  });

  return (
    <>
      <DialogTitle>
        Apply sale to {table.getSelectedRowModel().flatRows.length} selected
        product
      </DialogTitle>
      <div className="flex flex-col gap-8">
        {isSalesSuccess ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleApplySale)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="saleId"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choose Sale</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {sales.map((sale) => (
                          <FormItem
                            key={sale._id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={sale._id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {sale.saleName}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
export default ApplySale;
