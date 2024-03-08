import { DropdownMenuItem } from "../../components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ColumnHeader } from "../../components/data-table/ColumnHeader";
import { RowActions } from "../../components/data-table/RowActions";

export const brandFilters = [
  { value: "brandName", label: "Brand", className: "w-60" },
];
export const brandDefaultSort = [{ id: "brandName", asc: true }];
export const brandAddNewLink = "addbrand";

export const brandColumns = [
  {
    accessorKey: "brandName",
    accessorFn: (row) => row.brandName || "",
    header: ({ column }) => <ColumnHeader column={column} title="Brand" />,
    cell: ({ row }) => (
      <div className="px-2 text-base lowercase">
        {row.getValue("brandName")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const brandId = row.original._id;
      return (
        <RowActions>
          <DropdownMenuItem asChild>
            <Link to={`editbrand/${brandId}`}>Edit</Link>
          </DropdownMenuItem>
        </RowActions>
      );
    },
  },
];
