import { CheckIcon, ChevronsUpDown } from "lucide-react";

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
import { useSelector } from "react-redux";
import { selectAllSizes } from "../../../../features/sizes/sizesApiSlice";

const ProductFormSize = ({ control, setValue, watch }) => {
  const productSizeType = watch("productSizeType");
  const sizes = useSelector(selectAllSizes);

  return (
    <FormField
      control={control}
      name="productSize"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-lg font-semibold">Size</FormLabel>
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
                  {field.value ? field.value : "Select Size"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Size..." />
                <CommandEmpty className="px-8 py-4">
                  <p className="mb-2 text-center text-sm">No Size Found</p>
                </CommandEmpty>
                <CommandGroup>
                  {productSizeType ? (
                    sizes
                      .filter((s) => s.sizeType === productSizeType)[0]
                      .sizeNames.map((productSize) => (
                        <CommandItem
                          value={productSize}
                          key={productSize}
                          onSelect={() => {
                            setValue("productSize", productSize, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              productSize === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {productSize}
                        </CommandItem>
                      ))
                  ) : (
                    <p className="cursor-default py-4 text-center font-semibold text-destructive">
                      Choose Size Type
                    </p>
                  )}
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
export default ProductFormSize;
