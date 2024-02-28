import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../../../features/categories/categoriesApiSlice";

const GENDERS = ["man", "woman", "boy", "girl"];

const ProductFormGender = ({ control, setValue, watch }) => {
  const productMainCategory = watch("productMainCategory");
  const productSubCategory = watch("productSubCategory");
  const productCategories = useSelector(selectAllCategories);

  return (
    <FormField
      control={control}
      name="productGender"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <p className="text-lg font-semibold">Gender</p>
          <FormControl>
            <RadioGroup
              onValueChange={(event) => {
                if (productMainCategory) {
                  const keepMainCategory = productCategories.some(
                    (category) =>
                      category.genderName === event &&
                      category.mainCategoryName === productMainCategory,
                  );
                  if (!keepMainCategory) {
                    setValue("productMainCategory", "", {
                      shouldValidate: false,
                    });
                    setValue("productSubCategory", "", {
                      shouldValidate: false,
                    });
                  } else {
                    if (productSubCategory) {
                      const keepSubCategory = productCategories.some(
                        (category) =>
                          category.genderName === event &&
                          category.mainCategoryName === productMainCategory &&
                          category.subCategoryName === productSubCategory,
                      );
                      if (!keepSubCategory) {
                        setValue("productSubCategory", "", {
                          shouldValidate: false,
                        });
                      }
                    }
                  }
                }
                field.onChange(event);
              }}
              defaultValue={field.value}
              className="grid grid-cols-2 space-y-1"
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
  );
};
export default ProductFormGender;
