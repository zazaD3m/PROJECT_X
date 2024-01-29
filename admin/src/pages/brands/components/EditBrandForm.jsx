import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { CardContent, CardFooter } from "../../../components/ui/card";
import {
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} from "../../../features/brands/brandsApiSlice";
import Loader from "../../../components/Loader";
import { useState } from "react";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import { Navigate, useNavigate } from "react-router-dom";

const brandSchema = yup.object({
  brandName: yup
    .string()
    .trim()
    .max(15, "Brand must be under 15 chars.")
    .required("Enter brand"),
});

const EditBrandForm = ({ brand = "" }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [updateBrand, { isError, isLoading, error }] = useUpdateBrandMutation();
  const [deleteBrand, { isLoading: isDelLoading }] = useDeleteBrandMutation();

  const form = useForm({
    defaultValues: {
      brandName: brand.brandName,
    },
    resolver: yupResolver(brandSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, control, formState } = form;

  const { isDirty, isValid } = formState;

  async function handleBrandUpdate(data) {
    const { brandName } = data;
    await updateBrand({ brandId: brand._id, brandName });
  }

  async function handleBrandDelete() {
    try {
      await deleteBrand({ brandId: brand._id });
      navigate("/catalog/brands");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleBrandUpdate)}>
          <CardContent>
            <FormField
              control={control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-y-4">
            {isError && (
              <div className="text-destructive">{error.data.message}</div>
            )}
            {isLoading || isDelLoading ? (
              <Loader />
            ) : (
              <>
                <Button
                  disabled={!isValid || !isDirty}
                  type="submit"
                  className="w-full"
                >
                  Edit
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDeleteDialog(true);
                  }}
                  className="w-full"
                  variant="destructive"
                >
                  Delete
                </Button>
              </>
            )}
          </CardFooter>
        </form>
      </Form>
      <DeleteConfirmationDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        deleteAction={handleBrandDelete}
      />
    </>
  );
};

export default EditBrandForm;
