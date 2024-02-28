import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { useSelector } from "react-redux";

import { Button } from "../../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../../components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { cn } from "../../../../lib/utils";
import { selectAllBrands } from "../../../../features/brands/brandsApiSlice";

const ProductFormBrand = ({ control, setValue }) => {
  const productBrands = useSelector(selectAllBrands);

  return (
    <FormField
      control={control}
      name="productBrand"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-lg font-semibold">Brand</FormLabel>
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
                  {field.value ? field.value : "Select brand"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Brand..." />
                <CommandEmpty className="px-8 py-4">
                  <p className="mb-2 text-center text-sm">No brand found...</p>
                </CommandEmpty>
                <CommandGroup>
                  {productBrands.map((brand) => (
                    <CommandItem
                      value={brand.brandName}
                      key={brand.brandName}
                      onSelect={() => {
                        setValue("productBrand", brand.brandName, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          brand.brandName === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {brand.brandName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default ProductFormBrand;
