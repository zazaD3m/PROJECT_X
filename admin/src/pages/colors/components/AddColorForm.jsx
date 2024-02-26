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
import { useCreateColorMutation } from "../../../features/colors/colorsApiSlice";
import Loader from "../../../components/Loader";
import { useToast } from "../../../components/ui/use-toast";
import { useEffect, useState } from "react";

const colorSchema = yup.object({
  colorName: yup.string().required("Color name is required"),
  hexValue: yup.string().required("Color hex value is required").length(6),
});

const AddColorForm = () => {
  const { toast } = useToast();
  const [colorValue, setColorValue] = useState(null);

  const [
    createColor,
    { isLoading, isSuccess, isError, error, data: newColorData },
  ] = useCreateColorMutation();

  const form = useForm({
    defaultValues: {
      colorName: "",
      hexValue: "",
    },
    resolver: yupResolver(colorSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    formState,
    resetField,
    setFocus,
  } = form;

  const { isDirty, isValid } = formState;

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "success",
        title: `${newColorData.colorName}, has been added to colors collection`,
      });
    }
    if (isError) {
      const errStatus = error.status;
      if (errStatus === 409) {
        toast({
          variant: "destructive",
          title: `Color, already exists`,
        });
        setError("colorName", {
          type: "custom",
          message: `Color, already exists`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Server error, Try again",
        });
      }
    }
    resetField("colorName", { keepError: true });
    resetField("hexValue");
    setFocus("colorName");
  }, [isSuccess, isError]);

  const handleCreateColor = async (data) => {
    const { colorName, hexValue } = data;
    await createColor({ colorName, hexValue });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleCreateColor)}
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
            {isLoading ? (
              <Loader />
            ) : (
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                className="w-full"
              >
                Save color
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
      <div className="flex w-full justify-center gap-x-8">
        <Button
          type="button"
          disabled={!isValid || !isDirty}
          onClick={() => {
            setColorValue(getValues("hexValue"));
          }}
        >
          Check Color
        </Button>
        <Button
          type="button"
          disabled={!isValid || !isDirty}
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
    </>
  );
};
export default AddColorForm;
