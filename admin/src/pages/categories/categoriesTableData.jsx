import { User2 } from "lucide-react";
import { ColumnHeader } from "../../components/data-table/ColumnHeader";

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
    accessorFn: (row) => row.mainCategoryName || "",

    header: ({ column }) => (
      <ColumnHeader column={column} title="Main Category" />
    ),
    cell: ({ row }) => (
      <div className="px-2 text-base lowercase">
        {row.getValue("mainCategoryName")}
      </div>
    ),
  },
  {
    accessorKey: "subCategoryName",
    accessorFn: (row) => row.subCategoryName || "",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Sub Category" />
    ),
    cell: ({ row }) => (
      <div className="px-2 text-base lowercase">
        {row.getValue("subCategoryName")}
      </div>
    ),
  },
  {
    accessorKey: "genderName",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Gender Name" />
    ),
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
    header: ({ column }) => <ColumnHeader column={column} title="Type" />,
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
