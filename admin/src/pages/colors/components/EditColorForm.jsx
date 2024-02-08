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
import { useState } from "react";
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

  const [updateColor, { isLoading }] = useUpdateColorMutation();
  const [deleteColor, { isLoading: isDelLoading }] = useDeleteColorMutation();

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

  async function handleColorUpdate(data) {
    const { colorName, hexValue } = data;
    try {
      const updatedColor = await updateColor({
        colorName,
        hexValue,
        colorId: color._id,
      }).unwrap();
      toast({
        variant: "success",
        title: `color ${colorName} has been succesfully changed to ${updatedColor.colorName}`,
      });
    } catch (err) {
      if (err.status === 409) {
        toast({
          variant: "destructive",
          title: `${colorName}, already exists`,
        });
        setError("colorName", {
          type: "custom",
          message: `Color ${colorName}, already exists!`,
        });
      }
    }
  }

  async function handleColorDelete() {
    try {
      await deleteColor({ colorId: color._id }).unwrap();
      navigate("/catalog/colors");
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
            {isLoading || isDelLoading ? (
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
