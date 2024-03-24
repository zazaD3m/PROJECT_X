import { PlusCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DebouncedInput } from "../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Separator } from "../../../components/ui/separator";
import { Badge } from "../../../components/ui/badge";

const PriceRange = ({ column }) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 size-4" />
          Price
          {columnFilterValue?.length && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {columnFilterValue?.[0] ? columnFilterValue[0] : 0}
              </Badge>
              <Separator className="mx-1  w-3 bg-primary" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {columnFilterValue?.[1] ? columnFilterValue[1] : "Max"}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 p-4" align="start">
        <div className="flex items-center gap-x-4">
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="productTableMinPrice">Min</label>
            <DebouncedInput
              debounce={1000}
              type="number"
              id="productTableMinPrice"
              min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
              max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
              value={columnFilterValue?.[0] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old) => [value, old?.[1]])
              }
              placeholder={`Min ${
                column.getFacetedMinMaxValues()?.[0]
                  ? `(${column.getFacetedMinMaxValues()?.[0]})`
                  : ""
              }`}
            />
          </div>
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="productTableMaxPrice">Max</label>
            <DebouncedInput
              debounce={1000}
              type="number"
              id="productTableMaxPrice"
              min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
              max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
              value={columnFilterValue?.[1] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old) => [old?.[0], value])
              }
              placeholder={`Max ${
                column.getFacetedMinMaxValues()?.[1]
                  ? `(${column.getFacetedMinMaxValues()?.[1]})`
                  : ""
              }`}
            />
          </div>
        </div>
        {columnFilterValue?.length ? (
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              column?.setFilterValue(undefined);
            }}
          >
            Clear filter
          </Button>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};
export default PriceRange;
