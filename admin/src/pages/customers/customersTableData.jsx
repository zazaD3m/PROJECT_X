import { ColumnHeader } from "../../components/data-table/ColumnHeader";
import { RowActions } from "../../components/data-table/RowActions";
import { Button } from "../../components/ui/button";
import { DropdownMenuItem } from "../../components/ui/dropdown-menu";

export const customerFilters = [
  { value: "firstName", label: "First Name", className: "w-52" },
  { value: "lastName", label: "Last Name", className: "w-52" },
  { value: "email", label: "E-Mail", className: "w-52" },
  { value: "address", label: "Address", className: "w-52" },
  { value: "phoneNumber", label: "Phone Number", className: "w-52" },
];

export const customerDefaultSort = [{ id: "firstName", asc: true }];

export const customerColumnFilter = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "E-Mail",
  address: "Address",
  phoneNumber: "Phone Number",
};

export const customerColumns = [
  {
    accessorKey: "firstName",
    accessorFn: (row) => row.firstName || "",
    header: ({ column }) => <ColumnHeader column={column} title="First name" />,
    cell: ({ row }) => (
      <span className="px-2">{row.getValue("firstName")}</span>
    ),
  },
  {
    accessorKey: "lastName",
    accessorFn: (row) => row.lastName || "",
    header: ({ column }) => <ColumnHeader column={column} title="Last name" />,
    cell: ({ row }) => <span className="px-2">{row.getValue("lastName")}</span>,
  },
  {
    accessorKey: "email",
    accessorFn: (row) => row.email || "",
    header: ({ column }) => <ColumnHeader column={column} title="E-Mail" />,
    cell: ({ row }) => <span className="px-2">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "address",
    accessorFn: (row) => row.address || "",
    header: ({ column }) => <ColumnHeader column={column} title="Address" />,
    cell: ({ row }) => <span className="px-2">{row.getValue("address")}</span>,
  },
  {
    accessorKey: "phoneNumber",
    accessorFn: (row) => row.phoneNumber || "",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => (
      <span className="px-2">{row.getValue("phoneNumber")}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const org = row.original;
      return (
        <RowActions>
          <DropdownMenuItem asChild>
            <Button
              onClick={(e) => {
                e.preventDefault();
                console.log(org);
              }}
            >
              ccc
            </Button>
          </DropdownMenuItem>
        </RowActions>
      );
    },
  },
];
