import { ArrowUpDown, Circle, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export const colorFilters = ["colorName"];
export const colorDefaultSort = [{ id: "colorName", asc: true }];
export const colorAddNewLink = "addcolor";

export const colorColumns = [
  {
    accessorKey: "colorName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-9"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Color
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`editcolor/${colorId}`}>Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
