import { ColumnHeader } from "../../../components/data-table/ColumnHeader";
import { RowActions } from "../../../components/data-table/RowActions";

export const customerColumns = [
  {
    accessorKey: "firstName",
    header: ({ column }) => <ColumnHeader column={column} title="First name" />,
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <ColumnHeader column={column} title="Last name" />,
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="E-Mail" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Phone number" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => <ColumnHeader column={column} title="Address" />,
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("address")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
];
