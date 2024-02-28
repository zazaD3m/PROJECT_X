/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import ProductFormBrand from "./ProductFormBrand";
import ProductFormColor from "./ProductFormColor";
import ProductFormGender from "./ProductFormGender";
import ProductFormImage from "./ProductFormImage";
import ProductFormMainCategory from "./ProductFormMainCategory";
import ProductFormSubCategory from "./ProductFormSubCategory";
import ProductFormText from "./ProductFormText";
import ProductFormSize from "./ProductFormSize";
import ProductFormSizeType from "./ProductFormSizeType";

import DeleteConfirmationDialog from "../../../../components/DeleteConfirmationDialog";
import Loader from "../../../../components/Loader";
import { Button } from "../../../../components/ui/button";
import { Form } from "../../../../components/ui/form";
import { useToast } from "../../../../components/ui/use-toast";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../../features/products/productsApiSlice";
import { getDefaultSizeType } from "../../constants/productSizes";

const editProductSchema = yup.object().shape({
  productTitle: yup.string().required("Product title is required"),
  productDescription: yup.string().required("Product description is required"),
  productSize: yup.string().required("Product size is required"),
  productSizeType: yup.string().optional(),
  productPrice: yup
    .number()
    .required("Product price is required")
    .positive("Product price must be greater than 0"),
  productMainCategory: yup
    .string()
    .required("Product main category is required"),
  productSubCategory: yup.string().required("Product sub category is required"),
  productGender: yup.string().required("Product gender is required"),
  productBrand: yup.string().required("Product brand is required"),
  productColor: yup.string().required("Product color is required"),
  productImage1: yup.mixed().nullable().required("Product image is required"),
  productImage2: yup.mixed().nullable().required("Product image is required"),
  productImage3: yup.mixed().nullable().optional(),
  productImage4: yup.mixed().nullable().optional(),
});

const EditProductForm = ({ product }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [
    updateProduct,
    {
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      data: updatedProductData,
    },
  ] = useUpdateProductMutation();

  const [
    deleteProduct,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
    },
  ] = useDeleteProductMutation();

  const form = useForm({
    defaultValues: {
      productTitle: product.title,
      productDescription: product.description,
      productPrice: product.price,
      productSize: product.size,
      productSizeType: getDefaultSizeType(product.size),
      productMainCategory: product.mainCategory,
      productSubCategory: product.subCategory,
      productGender: product.gender,
      productBrand: product.brand,
      productColor: product.color,
      productImage1: product.images[1] || null,
      productImage2: product.images[2] || null,
      productImage3: product.images[3] || null,
      productImage4: product.images[4] || null,
    },
    resolver: yupResolver(editProductSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
    clearErrors,
    getValues,
  } = form;

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        variant: "success",
        title: `${updatedProductData.title}, has been updated`,
      });
    }
    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: `Server Error, Try again`,
      });
    }
  }, [isUpdateSuccess, isUpdateError]);

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate("..");
    }
    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: `Server Error, Try again`,
      });
    }
  }, [isDeleteSuccess, isDeleteError]);

  const handleAddProduct = async (data) => {
    const updatedProduct = {};
    const slug = `${data.productBrand}-${data.productSubCategory}-${data.productColor}-for-${data.productGender}`;

    updatedProduct.color = data.productColor;
    updatedProduct.brand = data.productBrand;
    updatedProduct.description = data.productDescription;
    updatedProduct.size = data.productSize;
    updatedProduct.gender = data.productGender;
    updatedProduct.mainCategory = data.productMainCategory;
    updatedProduct.subCategory = data.productSubCategory;
    updatedProduct.price = data.productPrice;
    updatedProduct.title = data.productTitle;
    updatedProduct.slug = slug;
    updatedProduct.images = {};
    updatedProduct.images[1] = { ...data.productImage1, alt: slug };
    updatedProduct.images[2] = { ...data.productImage2, alt: slug };
    if (data.productImage3) {
      updatedProduct.images[3] = { ...data.productImage3, alt: slug };
    }
    if (data.productImage4) {
      updatedProduct.images[4] = { ...data.productImage4, alt: slug };
    }

    await updateProduct({ productData: updatedProduct, productId });
  };

  const handleDeleteProduct = async () => {
    await deleteProduct({ productId });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-8">
          <div className="grid grid-cols-12 gap-x-16 gap-y-8">
            <div className="col-span-3 row-span-2 space-y-6">
              <ProductFormText
                control={control}
                name="productTitle"
                placeholder="Title"
              />
              <ProductFormText
                control={control}
                name="productDescription"
                placeholder="Description"
              />
              <ProductFormText
                control={control}
                name="productPrice"
                placeholder="Price"
                inputType="number"
              />
            </div>
            <div className="col-span-3">
              <ProductFormGender
                control={control}
                setValue={setValue}
                watch={watch}
              />
            </div>
            <div className="col-span-3 ">
              <ProductFormMainCategory
                control={control}
                setValue={setValue}
                watch={watch}
              />
            </div>
            <div className="col-span-3">
              <ProductFormSubCategory
                control={control}
                setValue={setValue}
                watch={watch}
              />
            </div>
            <div className="col-span-3">
              <ProductFormSizeType control={control} setValue={setValue} />
            </div>
            <div className="col-span-3">
              <ProductFormSize
                control={control}
                setValue={setValue}
                watch={watch}
              />
            </div>
            <div className="col-span-3">
              <ProductFormBrand control={control} setValue={setValue} />
            </div>
            <div className="col-span-3 col-start-10">
              <ProductFormColor control={control} setValue={setValue} />
            </div>
            <div className="col-span-9 row-start-3 space-y-3">
              <h2 className="cursor-default text-lg font-semibold">Images</h2>
              <div className="flex gap-x-8">
                <div className="h-40 w-40">
                  <ProductFormImage
                    name="productImage1"
                    control={control}
                    setValue={setValue}
                    setError={setError}
                    getValue={getValues}
                    clearErrors={clearErrors}
                    page={"edit"}
                  />
                </div>
                <div className="h-40 w-40">
                  <ProductFormImage
                    name="productImage2"
                    control={control}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                    getValue={getValues}
                    page={"edit"}
                  />
                </div>
                <div className="h-40 w-40">
                  <ProductFormImage
                    name="productImage3"
                    control={control}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                    getValue={getValues}
                    page={"edit"}
                  />
                </div>
                <div className="h-40 w-40">
                  <ProductFormImage
                    name="productImage4"
                    control={control}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                    getValue={getValues}
                    page={"edit"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 pt-8">
            {isUpdateLoading || isDeleteLoading ? (
              <div className="col-start-4">
                <Loader />
              </div>
            ) : (
              <>
                <Button type="submit" className="col-start-4 min-w-40">
                  Update Product
                </Button>
                <Button
                  variant="destructive"
                  className="col-start-7 min-w-40"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDeleteDialog(true);
                  }}
                >
                  Delete Product
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
      <DeleteConfirmationDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        deleteAction={handleDeleteProduct}
      />
    </>
  );
};
export default EditProductForm;
