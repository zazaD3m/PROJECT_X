/* eslint-disable react-hooks/exhaustive-deps */
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
import { useParams } from "react-router-dom";

const ProductFormImage = ({
  name,
  control,
  setValue,
  setError,
  getValue,
  clearErrors,
  isCreateProductSuccess,
  page = "",
}) => {
  const [imgPreview, setImgPreview] = useState("");
  const { productId } = useParams();

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
    if (isCreateProductSuccess) {
      setImgPreview("");
    }
  }, [isCreateProductSuccess]);

  useEffect(() => {
    if (page !== "edit") {
      return;
    }
    setImgPreview(getValue(name)?.href ? getValue(name).href : "");
  }, []);

  // add index to image object when uploading image

  useEffect(() => {
    if (isUploadLoading) {
      setImgPreview("loading");
    }
    if (isUploadSuccess) {
      setImgPreview("");
      clearErrors(name);
      setValue(name, newImageData, { shouldDirty: true, shouldTouch: true });
      setImgPreview(getValue(name)?.href ? getValue(name).href : "");
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
      setImgPreview(getValue(name)?.href ? getValue(name).href : "");
      setError(name, {
        message: "Try Again",
        type: "typeError",
      });
    }
  }, [isDeleteSuccess, isDeleteLoading, isDeleteError]);

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
    const public_id = getValue(name).public_id;
    const reqObj = {
      public_id: public_id,
    };
    if (productId) {
      reqObj.productId = productId;
      const imageIndex = name[name.length - 1];
      reqObj.imageIndex = imageIndex;
    }
    await deleteImage(reqObj);
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
    </>
  );
};

export default ProductFormImage;
