/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../../components/ui/button";
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
  useDeleteColorMutation,
  useUpdateColorMutation,
} from "../../../features/colors/colorsApiSlice";
import Loader from "../../../components/Loader";
import { useToast } from "../../../components/ui/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";

const colorSchema = yup.object({
  colorName: yup.string().required("Color name is required"),
  hexValue: yup.string().required("Color hex value is required").length(6),
});

const AddColorForm = ({ color }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [colorValue, setColorValue] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [
    updateColor,
    {
      data: updatedColorData,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      isLoading: isUpdateLoading,
      error: updateError,
    },
  ] = useUpdateColorMutation();
  const [
    deleteColor,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
    },
  ] = useDeleteColorMutation();

  const form = useForm({
    defaultValues: {
      colorName: color.colorName || "",
      hexValue: color.hexValue || "",
    },
    resolver: yupResolver(colorSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, control, getValues, setError, formState } = form;

  const { isDirty, isValid } = formState;

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate("/catalog/colors");
    }
    if (isDeleteError) {
      toast({
        variant: "destructive",
        title: "Server error, Try again",
      });
    }
  }, [isDeleteSuccess, isDeleteError]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        variant: "success",
        title: `Changed color to ${updatedColorData.colorName}`,
      });
    }
    if (isUpdateError) {
      const errStatus = updateError.status;
      if (errStatus === 409) {
        toast({
          variant: "destructive",
          title: `Color already exists`,
        });
        setError("colorName", {
          type: "custom",
          message: `Color, already exists`,
        });
        return;
      }
      toast({
        variant: "destructive",
        title: `Server error, Try again`,
      });
      setError("colorName", {
        type: "custom",
        message: `Server error, Try again`,
      });
    }
  }, [isUpdateSuccess, isUpdateError]);

  const handleColorUpdate = async (data) => {
    const { colorName, hexValue } = data;
    await updateColor({
      colorName,
      hexValue,
      colorId: color._id,
    });
  };

  const handleColorDelete = async () => {
    await deleteColor({ colorId: color._id });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleColorUpdate)}
          className="mx-auto max-w-lg"
        >
          <CardContent>
            <FormField
              control={control}
              name="colorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Color name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="hexValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Hex value
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="FF0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-y-4">
            {isUpdateLoading || isDeleteLoading ? (
              <Loader />
            ) : (
              <>
                <Button
                  disabled={!isDirty || !isValid}
                  type="submit"
                  className="w-full"
                >
                  Edit color
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
      <div className="flex w-full justify-center gap-x-8">
        <Button
          type="button"
          onClick={() => {
            setColorValue(getValues("hexValue"));
          }}
        >
          Check Color
        </Button>
        <Button
          type="button"
          onClick={() => {
            setColorValue(null);
          }}
        >
          Hide Color
        </Button>
      </div>
      {colorValue && (
        <div className="flex justify-center">
          <div className="relative mt-10 flex h-80 w-80 flex-col items-center justify-center rounded-lg bg-primary">
            <h2 className="absolute top-4 text-xl text-primary-foreground">
              Your Color
            </h2>
            <div
              className="h-36 w-36 rounded-full"
              style={{ backgroundColor: `#${colorValue}` }}
            ></div>
          </div>
        </div>
      )}
      <DeleteConfirmationDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        deleteAction={handleColorDelete}
      />
    </>
  );
};
export default AddColorForm;
