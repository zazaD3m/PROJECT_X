import { Circle } from "lucide-react";
import { RowActions } from "../../components/data-table/RowActions";

import { ColumnHeader } from "../../components/data-table/ColumnHeader";
import { DropdownMenuItem } from "../../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export const colorFilters = [
  { value: "colorName", label: "Color", className: "w-60" },
];
export const colorDefaultSort = [{ id: "colorName", asc: true }];
export const colorAddNewLink = "addcolor";

export const colorColumns = [
  {
    accessorKey: "colorName",
    accessorFn: (row) => row.colorName || "",
    header: ({ column }) => <ColumnHeader column={column} title={"Color"} />,
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4 lowercase">
        <Circle
          size={20}
          fill={`#${row.original.hexValue}`}
          color={`#${row.original.hexValue}`}
        />
        <span className="w-32 text-base lowercase">
          {row.getValue("colorName")}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const colorId = row.original._id;
      return (
        <RowActions>
          <DropdownMenuItem asChild>
            <Link to={`editcolor/${colorId}`}>Edit</Link>
          </DropdownMenuItem>
        </RowActions>
      );
    },
  },
];
