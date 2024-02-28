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

import { PRODUCT_SIZE_TYPES } from "../../constants/productSizes";

const ProductFormSizeType = ({ control, setValue }) => {
  return (
    <FormField
      control={control}
      name="productSizeType"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-lg font-semibold">Size Type</FormLabel>
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
                  {field.value ? field.value : "Select Size Type"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Size Type..." />
                <CommandEmpty className="px-8 py-4">
                  <p className="mb-2 text-center text-sm">
                    No size type found...
                  </p>
                </CommandEmpty>
                <CommandGroup>
                  {PRODUCT_SIZE_TYPES.map((p) => (
                    <CommandItem
                      value={p}
                      key={p}
                      onSelect={() => {
                        setValue("productSize", "", {
                          shouldValidate: false,
                        });
                        setValue("productSizeType", p, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          p === field.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {p}
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
export default ProductFormSizeType;
