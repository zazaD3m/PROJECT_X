import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../../components/ui/command";
import { Button } from "../../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { cn } from "../../../../lib/utils";

import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../../../features/categories/categoriesApiSlice";

const ProductFormMainCategory = ({ control, setValue, watch }) => {
  const productGender = watch("productGender");
  const productCategories = useSelector(selectAllCategories);

  return (
    <FormField
      control={control}
      name="productMainCategory"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-lg font-semibold">Main Category</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? field.value : "Select main category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              {productGender ? (
                <Command>
                  <CommandInput placeholder="Search Main Category..." />
                  <CommandEmpty className="px-8 py-4">
                    <p className="mb-2 text-center text-sm">
                      No main category found...
                    </p>
                  </CommandEmpty>
                  <CommandGroup>
                    {productCategories.map((category) => {
                      if (!category.isMainCategory) return null;
                      if (category.genderName !== productGender) return null;
                      return (
                        <CommandItem
                          value={category.mainCategoryName}
                          key={category.mainCategoryName}
                          onSelect={() => {
                            setValue("productSubCategory", "", {
                              shouldValidate: false,
                            });
                            setValue(
                              "productMainCategory",
                              category.mainCategoryName,
                              {
                                shouldValidate: true,
                                shouldDirty: true,
                              },
                            );
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              category.mainCategoryName === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {category.mainCategoryName}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              ) : (
                <p className="cursor-default py-4 text-center font-semibold text-destructive">
                  Choose Gender
                </p>
              )}
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default ProductFormMainCategory;
