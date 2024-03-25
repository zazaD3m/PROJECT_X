import { Pencil } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import ApplySale from "./ApplySale";
import { useState } from "react";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import RemoveSale from "./RemoveSale";

const ProductTableActions = ({ table }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState("");

  const closeDialog = () => {
    setOpenDialog(false);
    setAction("");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto flex h-8">
            <Pencil className="mr-2 h-4 w-4" />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              setOpenDialog(true);
              setAction("applySale");
            }}
          >
            Apply Sale
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpenDialog(true);
              setAction("removeSale");
            }}
          >
            Remove Sale
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Open
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          onClose={() => closeDialog()}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            closeDialog();
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault();
            closeDialog();
          }}
          onInteractOutside={(e) => {
            e.preventDefault();
            closeDialog();
          }}
        >
          {action === "applySale" ? (
            <ApplySale table={table} closeDialog={closeDialog} />
          ) : action === "removeSale" ? (
            <RemoveSale table={table} closeDialog={closeDialog} />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ProductTableActions;
