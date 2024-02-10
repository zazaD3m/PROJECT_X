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
import { selectAllColors } from "../../../../features/colors/colorsApiSlice";

const ProductFormColor = ({ control, setValue }) => {
  const productColors = useSelector(selectAllColors);

  return (
    <FormField
      control={control}
      name="productColor"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-lg font-semibold">Color</FormLabel>
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
                  {field.value && (
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{
                        backgroundColor: `#${productColors.find((c) => c.colorName === field.value).hexValue}`,
                      }}
                    ></div>
                  )}
                  <span className="ml-2 mr-auto">
                    {field.value ? field.value : "Select color"}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Color..." />
                <CommandEmpty className="px-8 py-4">
                  <p className="mb-2 text-center text-sm">No color found...</p>
                </CommandEmpty>
                <CommandGroup>
                  {productColors.map((color) => (
                    <CommandItem
                      value={color.colorName}
                      key={color.colorName}
                      onSelect={() => {
                        setValue("productColor", color.colorName, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          color.colorName === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {color.colorName}
                      <div
                        className="absolute right-4 h-5 w-5 rounded-full hover:right-3 hover:h-8 hover:w-8"
                        style={{ backgroundColor: `#${color.hexValue}` }}
                      ></div>
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
export default ProductFormColor;
