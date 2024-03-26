/* eslint-disable react-hooks/exhaustive-deps */
import { Button, LoadingButton } from "../../../components/ui/button";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { PRODUCT_STATUS } from "../constants/productDetails";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { useToast } from "../../../components/ui/use-toast";
import { useForm } from "react-hook-form";
import { DialogTitle } from "../../../components/ui/dialog";
import { useUpdateProductStatusMutation } from "../../../features/products/productsApiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const changeStatusSchema = yup.object().shape({
  productStatus: yup.string().required("Status is required"),
});

const ChangeStatus = ({ table, closeDialog }) => {
  const { toast } = useToast();
  const [
    updateProductStatus,
    {
      data: updateProductStatusResponse,
      isSuccess: isUpdateProductStatusSuccess,
      isLoading: isUpdateProductStatusLoading,
      isError: isUpdateProductStatusError,
    },
  ] = useUpdateProductStatusMutation();

  const form = useForm({
    defaultValues: { productStatus: "" },
    resolver: yupResolver(changeStatusSchema),
    mode: "onSubmit",
  });

  const handleUpdateProductStatus = (data) => {
    const { productStatus } = data;
    const selectedProductIds = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original._id);

    if (selectedProductIds.length === 0) {
      toast({
        variant: "destructive",
        title: "Please first select products to update status.",
      });
      return;
    }

    updateProductStatus({
      productStatus,
      productIds: selectedProductIds,
    });
  };

  useEffect(() => {
    if (isUpdateProductStatusSuccess) {
      toast({
        variant: "success",
        title: updateProductStatusResponse.message,
      });
    }
    if (isUpdateProductStatusError) {
      toast({
        variant: "destructive",
        title: `Server error, Please try again`,
      });
    }
  }, [isUpdateProductStatusSuccess, isUpdateProductStatusError]);

  return (
    <>
      <DialogTitle>
        Update status of {table.getSelectedRowModel().flatRows.length} selected
        product
      </DialogTitle>
      <div className="flex flex-col gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateProductStatus)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="productStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Choose Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {PRODUCT_STATUS.map((status) => (
                        <FormItem
                          key={status}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={status} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {status}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <LoadingButton
                type="submit"
                loading={isUpdateProductStatusLoading}
              >
                Confirm
              </LoadingButton>
              <Button
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  closeDialog();
                }}
              >
                Exit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
export default ChangeStatus;
