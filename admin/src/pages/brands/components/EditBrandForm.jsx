/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from "react";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";

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

  const [
    updateBrand,
    {
      data: updatedBrandData,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      isLoading: isUpdateLoading,
      error: updateError,
    },
  ] = useUpdateBrandMutation();
  const [
    deleteBrand,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      isLoading: isDeleteLoading,
    },
  ] = useDeleteBrandMutation();

  // Brand update handler
  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        variant: "success",
        title: `Updated brand name to ${updatedBrandData.brandName}`,
      });
    }
    if (isUpdateError) {
      const errStatus = updateError.status;
      if (errStatus === 409) {
        toast({
          variant: "destructive",
          title: `Brand already exists`,
        });
        setError("brandName", {
          type: "custom",
          message: `Brand, already exists`,
        });
        setFocus("brandName");
        return;
      }
      toast({
        variant: "destructive",
        title: `Server error, Try again`,
      });
      setError("brandName", {
        type: "custom",
        message: `Server error, Try again`,
      });
      setFocus("brandName");
    }
  }, [isUpdateSuccess, isUpdateError]);

  // Brand delete handler
  useEffect(() => {
    if (isDeleteSuccess) {
      navigate("/catalog/brands");
    }
    if (isDeleteError) {
      toast({
        variant: "destructive",
        title: "Server error, Try again",
      });
    }
  }, [isDeleteSuccess, isDeleteError]);

  const form = useForm({
    defaultValues: {
      brandName: brand.brandName || "",
    },
    resolver: yupResolver(brandSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, control, formState, setFocus, setError } = form;

  const { isDirty, isValid } = formState;

  const handleBrandUpdate = async (data) => {
    const { brandName } = data;
    await updateBrand({
      brandId: brand._id,
      brandName,
    });
  };

  const handleBrandDelete = async () => {
    await deleteBrand({ brandId: brand._id });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleBrandUpdate)}
          className="mx-auto max-w-xs"
        >
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
          <CardFooter className="flex-col gap-y-4 px-16">
            {isUpdateLoading || isDeleteLoading ? (
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
