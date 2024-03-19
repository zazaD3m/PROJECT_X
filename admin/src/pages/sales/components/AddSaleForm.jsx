/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";

import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar.jsx";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { CardContent, CardFooter } from "../../../components/ui/card";
import { useCreateSaleMutation } from "../../../features/sales/salesApiSlice";
import Loader from "../../../components/Loader";
import { useToast } from "../../../components/ui/use-toast";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";
import { CalendarIcon } from "lucide-react";

const saleSchema = yup.object({
  saleName: yup
    .string()
    .trim()
    .max(15, "Sale must be under 15 chars.")
    .required("Enter sale"),
  discount: yup.number().min(10).max(70).required("Enter discount"),
  expiry: yup.date().required("Enter expiry"),
});

const AddSaleForm = () => {
  const { toast } = useToast();

  const [
    createSale,
    { isLoading, isSuccess, isError, data: newSaleData, error },
  ] = useCreateSaleMutation();

  const form = useForm({
    defaultValues: {
      saleName: "",
      discount: 10,
      expiry: "",
    },
    resolver: yupResolver(saleSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isSuccess) {
      resetField("saleName");
      setFocus("saleName");
      resetField("discount");
      resetField("expiry");
      toast({
        variant: "success",
        title: `${newSaleData.saleName}, has been added to sales`,
      });
    }
    if (isError) {
      const errStatus = error.status;
      if (errStatus === 409) {
        toast({
          variant: "destructive",
          title: `Sale already exists`,
        });
        setError("saleName", {
          type: "custom",
          message: `Sale, already exists`,
        });
        setFocus("saleName");
        return;
      }
      toast({
        variant: "destructive",
        title: `Server error, Try again`,
      });
      setError("saleName", {
        type: "custom",
        message: `Server error, Try again`,
      });
      setFocus("saleName");
    }
  }, [isSuccess, isError]);

  const { handleSubmit, control, setError, formState, resetField, setFocus } =
    form;

  const { isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    const { saleName, discount, expiry } = data;
    await createSale({ saleName, discount, expiry });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-xs space-y-4"
      >
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="saleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Sale Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Sale" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Discount
                </FormLabel>
                <FormControl>
                  <Input placeholder="Discount" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiry"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg font-semibold">
                  Sale Expiry
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex-col gap-y-4">
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              disabled={!isDirty || !isValid}
              type="submit"
              className="mx-auto min-w-40"
            >
              Add Sale
            </Button>
          )}
        </CardFooter>
      </form>
    </Form>
  );
};
export default AddSaleForm;
