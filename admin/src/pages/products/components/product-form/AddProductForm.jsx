/* eslint-disable react-hooks/exhaustive-deps */
import ProductFormText from "./ProductFormText";
import ProductFormMainCategory from "./ProductFormMainCategory";
import ProductFormSubCategory from "./ProductFormSubCategory";
import ProductFormGender from "./ProductFormGender";
import ProductFormBrand from "./ProductFormBrand";
import ProductFormColor from "./ProductFormColor";
import ProductFormImage from "./ProductFormImage";

import { DevTool } from "@hookform/devtools";

import { Button } from "../../../../components/ui/button";
import { Form } from "../../../../components/ui/form";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateProductMutation } from "../../../../features/products/productsApiSlice";
import { useEffect } from "react";
import { useToast } from "../../../../components/ui/use-toast";
import Loader from "../../../../components/Loader";

const addProductSchema = yup.object().shape({
  productTitle: yup.string().required("Product title is required"),
  productDescription: yup.string().required("Product description is required"),
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
  productImage1: yup.mixed().nullable().required("File is required"),
  productImage2: yup.mixed().nullable().required("File is required"),
  productImage3: yup.mixed().nullable().optional(),
  productImage4: yup.mixed().nullable().optional(),
});

const AddProductForm = () => {
  const { toast } = useToast();

  const [
    createProduct,
    { isSuccess, isLoading, isError, data: newProductData },
  ] = useCreateProductMutation();

  const form = useForm({
    defaultValues: {
      productTitle: "",
      productDescription: "",
      productPrice: "",
      productMainCategory: "",
      productSubCategory: "",
      productGender: "",
      productBrand: "",
      productColor: "",
      productImage1: null,
      productImage2: null,
      productImage3: null,
      productImage4: null,
    },
    resolver: yupResolver(addProductSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    resetField,
    setError,
    setValue,
    getValues,
    watch,
    clearErrors,
    reset,
  } = form;

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "success",
        title: `${newProductData.title}, has been added to products`,
      });
      resetField("productTitle");
      resetField("productDescription");
      resetField("productPrice");
      resetField("productImage1");
      resetField("productImage2");
      resetField("productImage3");
      resetField("productImage4");
    }
    if (isError) {
      toast({
        variant: "destructive",
        title: `Server Error, Try again`,
      });
    }
  }, [isSuccess, isError]);

  async function handleAddProduct(data) {
    const newProductFormData = new FormData();
    const slug = `${data.productBrand}-${data.productSubCategory}-${data.productColor}-for-${data.productGender}`;

    newProductFormData.append("color", data.productColor);
    newProductFormData.append("brand", data.productBrand);
    newProductFormData.append("description", data.productDescription);
    newProductFormData.append("gender", data.productGender);
    newProductFormData.append("mainCategory", data.productMainCategory);
    newProductFormData.append("subCategory", data.productSubCategory);
    newProductFormData.append("price", data.productPrice);
    newProductFormData.append("title", data.productTitle);
    newProductFormData.append("slug", slug);
    newProductFormData.append("image1", data.productImage1);
    newProductFormData.append("image2", data.productImage2);
    if (data.productImage3) {
      newProductFormData.append("image3", data.productImage3);
    }
    if (data.productImage4) {
      newProductFormData.append("image4", data.productImage4);
    }

    await createProduct(newProductFormData);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-8">
          <div className="grid grid-cols-12  gap-x-16 gap-y-8">
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
                resetField={resetField}
                watch={watch}
              />
            </div>
            <div className="col-span-3 ">
              <ProductFormMainCategory
                control={control}
                setValue={setValue}
                resetField={resetField}
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
            <div className="col-span-3 col-start-7">
              <ProductFormBrand control={control} setValue={setValue} />
            </div>
            <div className="col-span-3 col-start-10">
              <ProductFormColor control={control} setValue={setValue} />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="cursor-default text-lg font-semibold">Images</h2>
            <div className="flex gap-x-8">
              <div className="h-40 w-40">
                <ProductFormImage
                  getValue={getValues}
                  name="productImage1"
                  control={control}
                  watch={watch}
                  isCreateSuccess={isSuccess}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="h-40 w-40">
                <ProductFormImage
                  getValue={getValues}
                  name="productImage2"
                  control={control}
                  watch={watch}
                  isCreateSuccess={isSuccess}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="h-40 w-40">
                <ProductFormImage
                  getValue={getValues}
                  name="productImage3"
                  control={control}
                  watch={watch}
                  isCreateSuccess={isSuccess}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="h-40 w-40">
                <ProductFormImage
                  getValue={getValues}
                  name="productImage4"
                  control={control}
                  watch={watch}
                  isCreateSuccess={isSuccess}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-8">
            {isLoading ? (
              <Loader />
            ) : (
              <Button type="submit" className="mx-auto min-w-40">
                Add Product
              </Button>
            )}
          </div>
        </form>
      </Form>
      <DevTool control={control} />
    </>
  );
};
export default AddProductForm;
