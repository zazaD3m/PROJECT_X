import { CheckIcon, ChevronsUpDown } from "lucide-react";

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
import { useSelector } from "react-redux";
import { selectAllSizes } from "../../../../features/sizes/sizesApiSlice";

const ProductFormSizeType = ({ control, setValue }) => {
  const sizes = useSelector(selectAllSizes);
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
                  {sizes.map((s) => (
                    <CommandItem
                      value={s.sizeType}
                      key={s.sizeType}
                      onSelect={() => {
                        setValue("productSize", "", {
                          shouldValidate: false,
                        });
                        setValue("productSizeType", s.sizeType, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          s.sizeType === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {s.sizeType}
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
