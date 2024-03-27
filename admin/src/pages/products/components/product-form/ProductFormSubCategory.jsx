import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { useSelector } from "react-redux";

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
  CommandList,
} from "../../../../components/ui/command";
import { Button } from "../../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { cn } from "../../../../lib/utils";

import { selectAllCategories } from "../../../../features/categories/categoriesApiSlice";

const ProductFormSubCategory = ({ control, setValue, watch }) => {
  const productGender = watch("productGender");
  const productMainCategory = watch("productMainCategory");
  const productCategories = useSelector(selectAllCategories);

  return (
    <FormField
      control={control}
      name="productSubCategory"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-lg font-semibold">Sub Category</FormLabel>
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
                  {field.value ? field.value : "Select sub category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              {productGender && productMainCategory ? (
                <Command>
                  <CommandInput placeholder="Search Sub Category..." />
                  <CommandList>
                    <CommandEmpty className="px-8 py-4">
                      <p className="mb-2 text-center text-sm">
                        No sub category found...
                      </p>
                    </CommandEmpty>
                    <CommandGroup>
                      {productCategories.map((category) => {
                        if (category.isMainCategory) return null;
                        if (category.genderName !== productGender) return null;
                        if (category.mainCategoryName !== productMainCategory)
                          return null;
                        return (
                          <CommandItem
                            value={category.subCategoryName}
                            key={category.subCategoryName}
                            onSelect={() => {
                              setValue(
                                "productSubCategory",
                                category.subCategoryName,
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
                                category.subCategoryName === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category.subCategoryName}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              ) : (
                <p className="cursor-default px-4 py-4 text-center font-semibold text-destructive">
                  Choose Gender and Main Category
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
export default ProductFormSubCategory;
