import { ColumnHeader } from "../../../components/data-table/ColumnHeader";
import { Checkbox } from "../../../components/ui/checkbox";
import { toNumber } from "../components/utils";

export const productColumnFilter = {
  brand: "brand",
  size: "size",
  mainCategory: "main cat",
  subCategory: "sub cat",
  price: "price",
  gender: "Gender",
  sale: "Sale",
  color: "Color",
  status: "Status",
};

export const productColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
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
      <div className=" text-base lowercase">{row.getValue("brand")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "size",
    accessorFn: (row) => toNumber(row.size) || "",
    header: ({ column }) => <ColumnHeader column={column} title="Size" />,
    cell: ({ row }) => <div className=" text-base">{row.getValue("size")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "sale",
    accessorFn: (row) => row.sale.saleName || "",
    header: ({ column }) => <ColumnHeader column={column} title="Sale" />,
    cell: ({ row }) => <div className=" text-base">{row.getValue("sale")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <ColumnHeader column={column} title="Gender" />,
    cell: ({ row }) => (
      <div className=" text-base lowercase">{row.getValue("gender")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => <ColumnHeader column={column} title="Color" />,
    cell: ({ row }) => (
      <div className="text-base lowercase">{row.getValue("color")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "mainCategory",
    header: ({ column }) => <ColumnHeader column={column} title="Main Cat" />,
    cell: ({ row }) => (
      <div className=" text-base">{row.getValue("mainCategory")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "subCategory",
    header: ({ column }) => <ColumnHeader column={column} title="Sub Cat" />,
    cell: ({ row }) => (
      <div className=" text-base">{row.getValue("subCategory")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <div className=" text-base">{row.getValue("status")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <ColumnHeader column={column} title="Price" />,
    cell: ({ row }) => (
      <div className=" text-base">{row.getValue("price")}</div>
    ),
    footer: (props) => props.column.id,
  },
];
