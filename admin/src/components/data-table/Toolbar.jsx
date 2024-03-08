import { Plus, X } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { ViewOptions } from "./ViewOptions";
import { FacetedFilter } from "./FacetedFilter";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export function Toolbar({
  table,
  filter = [],
  facetedFilter = [],
  columnFilter,
  addNewLink,
}) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-2">
        {filter.length < 1
          ? null
          : filter.map((f, i) => (
              <Input
                key={i}
                placeholder={f.label}
                value={table.getColumn(f.value)?.getFilterValue() ?? ""}
                onChange={(event) => {
                  return table
                    .getColumn(f.value)
                    ?.setFilterValue(event.target.value);
                }}
                className={cn("h-8 w-44", f?.className)}
              />
            ))}
        {facetedFilter.length < 1
          ? null
          : facetedFilter.map((ff, i) => {
              return (
                table.getColumn(ff.column) && (
                  <FacetedFilter
                    key={i}
                    column={table.getColumn(ff.column)}
                    title={ff.title}
                    options={ff.options}
                  />
                )
              );
            })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-x-1">
        {!addNewLink ? null : (
          <Button asChild size="sm" variant="outline" className="h-8">
            <Link to={addNewLink}>
              <Plus className="h-4 w-4" />
              Add New
            </Link>
          </Button>
        )}
        {!columnFilter ? null : (
          <ViewOptions table={table} columnFilter={columnFilter} />
        )}
      </div>
    </div>
  );
}
