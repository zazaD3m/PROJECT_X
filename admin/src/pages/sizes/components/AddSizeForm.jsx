/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from "yup";
import { useToast } from "../../../components/ui/use-toast";
import { useCreateSizeMutation } from "../../../features/sizes/sizesApiSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import { Button } from "../../../components/ui/button";
import { CheckIcon, Plus } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "../../../components/ui/command";
import { cn } from "../../../lib/utils";
import { Input } from "../../../components/ui/input";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import Sizes from "./Sizes";

const addSizeSchema = yup.object().shape({
  sizeType: yup.string().required("Sizetype is required"),
  sizeName: yup.string().required("Sizename is required"),
});

const AddSizeForm = ({ sizes }) => {
  const { toast } = useToast();
  const [newSizeType, setNewSizeType] = useState("");
  const [newSizeTypeInput, setNewSizeTypeInput] = useState("");

  const form = useForm({
    defaultValues: {
      sizeType: "",
      sizeName: "",
    },
    resolver: yupResolver(addSizeSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, control, setValue, resetField, watch, setError } = form;

  const [createSize, { isSuccess, isLoading, isError, error }] =
    useCreateSizeMutation();

  useEffect(() => {
    if (isSuccess) {
      setNewSizeType("");
      setNewSizeTypeInput("");
      resetField("sizeName");
    }
    if (isError) {
      if (error && error.status === 409) {
        toast({
          variant: "destructive",
          title: `Size already exists`,
        });
        setError("sizeName", {
          type: "custom",
          message: `Size, already exists`,
        });
        return;
      }
      toast({
        variant: "destructive",
        title: `Server error, Try again`,
      });
      setError("sizeName", {
        type: "custom",
        message: `Server error, Try again`,
      });
    }
  }, [isSuccess, isError]);

  const selectedSizeType = watch("sizeType");

  const handleAddSize = async (data) => {
    await createSize({ ...data });
  };

  const sizesShouldRender = () => {
    let shouldRender = false;
    if (selectedSizeType) {
      shouldRender = sizes.some((s) => s.sizeType === selectedSizeType);
    }
    return shouldRender;
  };

  return (
    <div className="flex">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleAddSize)}
          className="w-2/3 space-y-8"
        >
          <div className="flex justify-center gap-x-24">
            <div className="w-1/3">
              <FormField
                control={control}
                name="sizeType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-lg font-semibold">
                      Size Type
                    </FormLabel>
                    <Command className="justify-between rounded-lg border shadow-md">
                      <CommandGroup>
                        {sizes.map((size) => (
                          <CommandItem
                            value={size.sizeType}
                            key={size.sizeType}
                            onSelect={() => {
                              setValue("sizeType", size.sizeType, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }}
                            className={
                              size.sizeType === field.value && "bg-accent"
                            }
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                size.sizeType === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {size.sizeType}
                          </CommandItem>
                        ))}
                        {newSizeType ? (
                          <CommandItem
                            value={newSizeType}
                            onSelect={() => {
                              setValue("sizeType", newSizeType, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }}
                            className={
                              newSizeType === field.value && "bg-accent"
                            }
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                newSizeType === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {newSizeType}
                          </CommandItem>
                        ) : null}
                      </CommandGroup>
                    </Command>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {newSizeType ? null : (
                <>
                  <div className="flex gap-x-2 border p-2">
                    <Input
                      type="text"
                      value={newSizeTypeInput}
                      onChange={(e) => {
                        e.preventDefault();
                        setNewSizeTypeInput(e.target.value);
                      }}
                    />
                    <Button
                      variant="ghost"
                      className="px-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setNewSizeType(newSizeTypeInput);
                        setValue("sizeType", newSizeTypeInput, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </>
              )}
            </div>
            <FormField
              control={control}
              name={"sizeName"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Size Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Size Name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center pt-8">
            {isLoading ? (
              <Loader />
            ) : (
              <Button type="submit" className="mx-auto min-w-40">
                Add Size
              </Button>
            )}
          </div>
        </form>
      </Form>
      <div className="w-1/3 space-y-2 border-l pl-4">
        <h2 className="text-center text-lg font-semibold">Sizes</h2>
        {sizesShouldRender() ? (
          <section className="w-full px-4">
            <Sizes selectedSizeType={selectedSizeType} sizes={sizes} />
          </section>
        ) : null}
      </div>
    </div>
  );
};
export default AddSizeForm;
