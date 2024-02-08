import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../../components/ui/button";
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
import { useCreateBrandMutation } from "../../../features/brands/brandsApiSlice";
import Loader from "../../../components/Loader";
import { useToast } from "../../../components/ui/use-toast";

const brandSchema = yup.object({
  brandName: yup
    .string()
    .trim()
    .max(15, "Brand must be under 15 chars.")
    .required("Enter brand"),
});

const AddBrandForm = () => {
  const { toast } = useToast();

  const [createBrand, { isLoading }] = useCreateBrandMutation();

  const form = useForm({
    defaultValues: {
      brandName: "",
    },
    resolver: yupResolver(brandSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, control, setError, formState, resetField, setFocus } =
    form;

  const { isDirty, isValid } = formState;

  async function onSubmit(data) {
    const { brandName } = data;
    try {
      await createBrand({ brandName }).unwrap();
      resetField("brandName");
      setFocus("brandName");
      toast({
        variant: "success",
        title: `${brandName}, has been added to brands collection`,
      });
    } catch (err) {
      if (err.status === 409) {
        setError("brandName", {
          type: "custom",
          message: "Brand already exists!",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-xs space-y-4"
      >
        <CardContent>
          <FormField
            control={control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Brand" {...field} />
                </FormControl>
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
              Add Brand
            </Button>
          )}
        </CardFooter>
      </form>
    </Form>
  );
};
export default AddBrandForm;
