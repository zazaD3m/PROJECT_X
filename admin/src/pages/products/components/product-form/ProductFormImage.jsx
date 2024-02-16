import { useEffect, useState } from "react";

import Dropzone from "../../../../components/ui/dropZone";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";

const ProductFormImage = ({
  name,
  control,
  setValue,
  setError,
  clearErrors,
  watch,
}) => {
  const inputImg = watch(name);
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    if (!inputImg) {
      URL.revokeObjectURL(imgPreview);
      setImgPreview("");
    }
  }, [inputImg]);

  function handleOnDrop(acceptedFiles) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      const allowedTypes = ["image/jpeg"];
      const fileType = allowedTypes.find(
        (allowedType) => allowedType === file.type,
      );

      if (!fileType) {
        setValue(name, null);
        setError(name, {
          message: "File type is not valid",
          type: "typeError",
        });
        setImgPreview("");
      } else {
        const displayUrl = URL.createObjectURL(file);
        setValue(name, file, { shouldDirty: true, shouldTouch: true });
        clearErrors(name);
        setImgPreview(displayUrl);
      }
    } else {
      setValue(name, null);
      setError(name, {
        message: "File is required",
        type: "typeError",
      });
      setImgPreview("");
    }
  }
  function handleRemove() {
    setValue(name, null);
    setError(name, {
      message: "File is required",
      type: "typeError",
    });
    setImgPreview("");
  }
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="h-full w-full">
            <FormControl>
              <Dropzone
                {...field}
                dropMessage="Drop file or click here"
                handleOnDrop={handleOnDrop}
                handleRemove={handleRemove}
                imgPreview={imgPreview}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* {watch("productImage") && (
        <div className="relative flex items-center justify-center gap-3 p-4">
          <FileCheck2Icon className="h-4 w-4" />
          <p className="text-sm font-medium">{watch("productImage")?.name}</p>
        </div>
      )} */}
    </>
  );
};

export default ProductFormImage;
