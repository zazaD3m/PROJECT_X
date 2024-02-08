import { ArrowUpDown, User2 } from "lucide-react";
import { Button } from "../../components/ui/button";
export const categoryFilters = [
  { value: "mainCategoryName", label: "Main category", className: "w-52" },
  { value: "subCategoryName", label: "Sub category", className: "w-52" },
];
export const categoryColumnFilter = {
  mainCategoryName: "Main category",
  subCategoryName: "Sub category",
  genderName: "Gender",
  isMainCategory: "Type",
};
export const categoryAddNewLink = "addcategory";
export const categoryDefaultSort = [{ id: "mainCategoryName", asc: true }];
export const categoryFacetedFilter = [
  {
    column: "genderName",
    title: "Gender",
    options: [
      {
        label: "Man",
        value: "man",
        icon: User2,
      },
      {
        label: "Woman",
        value: "woman",
        icon: User2,
      },
      {
        label: "Boy",
        value: "boy",
        icon: User2,
      },
      {
        label: "Girl",
        value: "girl",
        icon: User2,
      },
    ],
  },
  {
    column: "isMainCategory",
    title: "Type",
    options: [
      {
        label: "Main",
        value: true,
      },
      {
        label: "Sub",
        value: false,
      },
    ],
  },
];

export const categoryColumns = [
  {
    accessorKey: "mainCategoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Main category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-2 text-base lowercase">
        {row.getValue("mainCategoryName")}
      </div>
    ),
  },
  {
    accessorKey: "subCategoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sub category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-2 text-base lowercase">
        {row.getValue("subCategoryName")}
      </div>
    ),
  },
  {
    accessorKey: "genderName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-2 text-base lowercase">
        {row.getValue("genderName")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isMainCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-2 text-base lowercase">
        {row.getValue("isMainCategory") ? "Main" : "Sub"}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
