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
import { CardContent, CardFooter } from "../../../components/ui/card";
import Loader from "../../../components/Loader";
import { useToast } from "../../../components/ui/use-toast";
import { useSelector } from "react-redux";
import {
  selectAllCategories,
  useCreateCategoryMutation,
} from "../../../features/categories/categoriesApiSlice";

const GENDERS = ["man", "woman", "boy", "girl"];

const mainCategorySchema = yup.object({
  mainCategoryName: yup.string().required("Main category name is required"),
  genderName: yup.mixed().oneOf(GENDERS).required("Gender is required"),
});

const AddMainCategoryForm = () => {
  const { toast } = useToast();
  const categories = useSelector(selectAllCategories);

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const form = useForm({
    defaultValues: {
      mainCategoryName: "",
    },
    resolver: yupResolver(mainCategorySchema),
    mode: "onSubmit",
  });

  const { handleSubmit, control, setError, formState, setFocus } = form;
  const { isDirty, isValid } = formState;

  async function handleCreateMainCategory(data) {
    const alreadyExists = categories.some(
      (item) =>
        item.isMainCategory &&
        item.mainCategoryName === data.mainCategoryName &&
        item.genderName === data.genderName,
    );

    if (alreadyExists) {
      setError("mainCategoryName", {
        message: "This main category already exists",
      });
      return;
    }

    const newMainCategory = {
      isMainCategory: true,
      ...data,
    };

    try {
      const res = await createCategory(newMainCategory).unwrap();
      setFocus("mainCategoryName");
      toast({
        variant: "success",
        title: `${res.genderName} ${res.mainCategoryName}, has been added to main category`,
      });
    } catch (err) {
      if (err.status === 409) {
        setError("mainCategoryName", {
          message: "This main category already exists",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateMainCategory)}
        className="flex flex-col items-center gap-y-8"
      >
        <CardContent className="flex gap-x-16">
          <FormField
            control={control}
            name="mainCategoryName"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel className="text-lg font-semibold">
                  Main category
                </FormLabel>
                <FormControl>
                  <Input placeholder="Main category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genderName"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <h2 className="cursor-default text-lg font-semibold">Gender</h2>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {GENDERS.map((g) => (
                      <FormItem
                        key={g}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={g} />
                        </FormControl>
                        <FormLabel className="font-normal">{g}</FormLabel>
                      </FormItem>
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
              Save category
            </Button>
          )}
        </CardFooter>
      </form>
    </Form>
  );
};
export default AddMainCategoryForm;
