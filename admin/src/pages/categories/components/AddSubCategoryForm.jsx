import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import Loader from "../../../components/Loader";
import { useToast } from "../../../components/ui/use-toast";
import { useSelector } from "react-redux";
import {
  selectAllCategories,
  useCreateCategoryMutation,
} from "../../../features/categories/categoriesApiSlice";

const GENDERS = ["man", "woman", "boy", "girl"];

const subCategorySchema = yup.object({
  subCategoryName: yup.string().required("Sub category name is required"),
  mainCategoryName: yup.string().required("Main category name is required"),
});

const AddSubCategoryForm = () => {
  const { toast } = useToast();
  const categories = useSelector(selectAllCategories);

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const form = useForm({
    defaultValues: {
      mainCategoryName: "",
      subCategoryName: "",
    },
    resolver: yupResolver(subCategorySchema),
    mode: "onSubmit",
  });

  const { handleSubmit, control, setError, formState, setFocus } = form;
  const { isDirty, isValid } = formState;

  async function handleCreateSubCategory(data) {
    const tempGenderName = data.mainCategoryName.split("^")[0];
    const tempMainCategoryName = data.mainCategoryName.split("^")[1];

    const alreadyExists = categories.some(
      (item) =>
        !item.isMainCategory &&
        item.mainCategoryName === tempMainCategoryName &&
        item.genderName === tempGenderName &&
        item.subCategoryName === data.subCategoryName,
    );
    if (alreadyExists) {
      setError("subCategoryName", {
        message: "This sub category already exists",
      });
      return;
    }
    const newSubCategory = {
      isMainCategory: false,
      subCategoryName: data.subCategoryName,
      mainCategoryName: tempMainCategoryName,
      genderName: tempGenderName,
    };
    try {
      const res = await createCategory(newSubCategory).unwrap();
      setFocus("subCategoryName");
      toast({
        variant: "success",
        title: `${res.subCategoryName} ${res.genderName} ${res.mainCategoryName}, has been added to sub category`,
      });
    } catch (err) {
      if (err.status === 409) {
        setError("subCategoryName", {
          message: "This sub category already exists",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateSubCategory)}
        className="flex flex-col items-center gap-y-8"
      >
        <CardContent className="flex gap-x-16">
          <FormField
            control={control}
            name="subCategoryName"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel className="text-lg font-semibold">
                  Sub category
                </FormLabel>
                <FormControl>
                  <Input placeholder="Sub category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mainCategoryName"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <h2 className="cursor-default text-lg font-semibold">
                  Main category
                </h2>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-x-4"
                  >
                    {GENDERS.map((g) => (
                      <Card key={g} className="flex flex-col gap-y-3 p-4 pt-2">
                        <h2 className="self-center text-base font-medium">
                          {g}
                        </h2>
                        {categories.map((c) => {
                          return (
                            c.genderName === g &&
                            c.isMainCategory && (
                              <FormItem
                                key={`${g}^${c.mainCategoryName}`}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={`${g}^${c.mainCategoryName}`}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {c.mainCategoryName}
                                </FormLabel>
                              </FormItem>
                            )
                          );
                        })}
                      </Card>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="w-full">
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              className="mx-auto min-w-40"
              disabled={!isDirty || !isValid}
              type="submit"
            >
              Save sub category
            </Button>
          )}
        </CardFooter>
      </form>
    </Form>
  );
};
export default AddSubCategoryForm;
