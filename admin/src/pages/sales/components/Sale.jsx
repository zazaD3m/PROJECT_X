/* eslint-disable react-hooks/exhaustive-deps */
import { format } from "date-fns";
import { Button } from "../../../components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import { useEffect, useState } from "react";
import { useDeleteSaleMutation } from "../../../features/sales/salesApiSlice";
import { useToast } from "../../../components/ui/use-toast";

const Sale = ({ sale }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  const [deleteSale, { isSuccess, isLoading, data: deletedSale }] =
    useDeleteSaleMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "success",
        title: `${deletedSale.saleName} sale, removed`,
      });
    }
  }, [isSuccess]);

  const handleSaleDelete = async () => {
    deleteSale({ saleId: sale._id });
  };

  return (
    <div className="flex w-full gap-x-8">
      <div className="flex min-w-44 flex-col gap-y-2 border-x-4 px-4 py-2">
        <h2 className="text-center text-lg font-bold">Sale Name</h2>
        <p className="text-center">{sale.saleName}</p>
      </div>
      <div className="flex min-w-44 flex-col gap-y-2 border-x-4 px-4 py-2">
        <h2 className="text-center text-lg font-bold">Sale Amount</h2>
        <p className="text-center">{sale.saleAmount} %</p>
      </div>
      <div className="flex min-w-44 flex-col gap-y-2 border-x-4 px-4 py-2">
        <h2 className="text-center text-lg font-bold">Expiry</h2>
        <p className="text-center">
          {sale.saleName !== "no sale" ? (
            format(sale.expiry, "PPP")
          ) : (
            <span>&#8734;</span>
          )}
        </p>
      </div>
      <div className="flex flex-col gap-y-2 border-x-4 px-4 py-2">
        <h2 className="text-center text-lg font-bold">Discounted Products</h2>
        <p className="text-center">{sale.products.length}</p>
      </div>
      <div className="ml-auto flex items-center">
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            setShowDeleteDialog(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash2 className="text-destructive" />
          )}
        </Button>
      </div>
      <DeleteConfirmationDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        deleteAction={handleSaleDelete}
      />
    </div>
  );
};
export default Sale;
