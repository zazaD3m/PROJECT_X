/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { CommandItem } from "../../../components/ui/command";
import Loader from "../../../components/Loader";
import { Trash2 } from "lucide-react";
import { useDeleteSizeMutation } from "../../../features/sizes/sizesApiSlice";
import { useToast } from "../../../components/ui/use-toast";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";

const Size = ({ sizeName, sizeType }) => {
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [deleteSize, { isSuccess, isLoading, data: deletedSize }] =
    useDeleteSizeMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "success",
        title: `${deletedSize.sizeName} size, removed`,
      });
    }
  }, [isSuccess]);

  const handleSizeDelete = () => {
    deleteSize({ sizeName, sizeType });
  };

  return (
    <>
      <CommandItem className="justify-between">
        <span>{sizeName}</span>
        <Button
          className="aspect-square bg-transparent p-0 hover:scale-125 hover:bg-transparent"
          onClick={(e) => {
            e.preventDefault();
            setShowDeleteDialog(true);
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <Trash2 className="size-5 text-destructive" />
          )}
        </Button>
      </CommandItem>
      <DeleteConfirmationDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        deleteAction={handleSizeDelete}
      />
    </>
  );
};
export default Size;
