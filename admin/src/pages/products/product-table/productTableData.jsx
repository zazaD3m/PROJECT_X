import { ColumnHeader } from "../../../components/data-table/ColumnHeader";
import { Checkbox } from "../../../components/ui/checkbox";
import { RowActions } from "../../../components/data-table/RowActions";
import { toNumber } from "../components/utils";
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

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
  _id: "ID",
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
    accessorKey: "_id",
    accessorFn: (row) => row._id || "",
    header: ({ column }) => <ColumnHeader column={column} title="ID" />,
    cell: ({ row }) => (
      <div className=" text-xs lowercase">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "brand",
    accessorFn: (row) => row.brand || "",
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
    accessorFn: (row) => row.gender || "",
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
    accessorFn: (row) => row.color || "",
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
    accessorFn: (row) => row.mainCategory || "",
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
    accessorFn: (row) => row.subCategory || "",
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
    accessorFn: (row) => row.status || "",
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
    cell: ({ row }) => <div className="text-base">{row.getValue("price")}</div>,
    footer: (props) => props.column.id,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <RowActions>
          <DropdownMenuItem asChild>
            <Link to={`editproduct/${product._id}`}>Edit Product</Link>
          </DropdownMenuItem>
        </RowActions>
      );
    },
  },
];
