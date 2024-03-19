import { ColumnHeader } from "../../../components/data-table/ColumnHeader";
import { Checkbox } from "../../../components/ui/checkbox";

export const productColumnFilter = {
  brand: "brand",
};

export const productColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <ColumnHeader column={column} title="Brand" />,
    cell: ({ row }) => (
      <div className="px-2 text-base lowercase">{row.getValue("brand")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
