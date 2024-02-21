import { useEffect, useState } from "react";

import Dropzone from "../../../../components/ui/dropZone";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";

import {
  useDeleteImageMutation,
  useUploadImageMutation,
} from "../../../../features/images/imagesApiSlice";

const ProductFormImage = ({
  name,
  control,
  setValue,
  setError,
  getValue,
  clearErrors,
  isCreateSuccess,
  watch,
}) => {
  const [imgPreview, setImgPreview] = useState("");

  const [
    uploadImage,
    {
      isSuccess: isUploadSuccess,
      isLoading: isUploadLoading,
      isError: isUploadError,
      data: newImageData,
    },
  ] = useUploadImageMutation();

  const [
    deleteImage,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
    },
  ] = useDeleteImageMutation();

  useEffect(() => {
    if (isUploadLoading) {
      setImgPreview("loading");
    }
    if (isUploadSuccess) {
      setImgPreview("");
      clearErrors(name);
      setValue(name, newImageData, { shouldDirty: true, shouldTouch: true });
      setImgPreview(getValue(name).href);
    }
    if (isUploadError) {
      setImgPreview("");
      setValue(name, null);
      setError(name, {
        message: "Try Again",
        type: "typeError",
      });
    }
  }, [isUploadLoading, isUploadSuccess, isUploadError]);

  useEffect(() => {
    if (isDeleteLoading) {
      setImgPreview("loading");
    }
    if (isDeleteSuccess) {
      setImgPreview("");
      clearErrors(name);
      setValue(name, null, { shouldDirty: true });
    }
    if (isDeleteError) {
      setImgPreview(getValue(name).href);
      setError(name, {
        message: "Try Again",
        type: "typeError",
      });
    }
  }, [isDeleteSuccess, isDeleteLoading, isDeleteError]);

  // useEffect(() => {
  //   if (isCreateSuccess) {
  //     URL.revokeObjectURL(imgPreview);
  //     setImgPreview("");
  //   }
  // }, [isCreateSuccess]);

  const handleOnDrop = async (acceptedFiles) => {
    if (!acceptedFiles || (acceptedFiles && acceptedFiles.length <= 0)) {
      setValue(name, null);
      setError(name, {
        message: "File is required",
        type: "typeError",
      });
      setImgPreview("");
      return;
    }

    const file = acceptedFiles[0];
    const allowedTypes = ["image/jpeg"];
    const allowedSize = 2500000; // 2.5 mb
    const isValidType = allowedTypes.find(
      (allowedType) => allowedType === file.type,
    );
    const isValidSize = file.size <= allowedSize;

    if (!isValidType || !isValidSize) {
      setValue(name, null);
      setError(name, {
        message: isValidType
          ? `Size should be less than ${allowedSize / 1000000} mb`
          : `Image should be ${allowedTypes[0]} format`,
        type: "typeError",
      });
      setImgPreview("");
      return;
    }

    const newImageFormData = new FormData();
    newImageFormData.append("productImage", file);

    await uploadImage(newImageFormData);
  };

  const handleRemove = async () => {
    await deleteImage(getValue(name).public_id);
  };
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
                dropMessage="Click Here"
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
