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

const addProductSchema = yup.object().shape({
  productTitle: yup.string().required("Product title is required"),
  productDescription: yup.string().required("Product description is required"),
  productPrice: yup
    .number()
    .typeError("Product price is required")
    .positive("Product price must be greater than 0"),
  productMainCategory: yup
    .string()
    .required("Product main category is required"),
  productSubCategory: yup.string().required("Product sub category is required"),
  productGender: yup.string().required("Product gender is required"),
  productBrand: yup.string().required("Product brand is required"),
  productColor: yup.string().required("Product color is required"),
  productImage1: yup
    .mixed()
    .nullable()
    .required("Product image is required")
    .test("fileSize", "The file should be less than 2.5mb", (value) => {
      return value && value.size <= 2500000;
    }),
  productImage2: yup
    .mixed()
    .nullable()
    .required("Product image is required")
    .test("fileSize", "The file should be less than 2.5mb", (value) => {
      return value && value.size <= 2500000;
    }),
  productImage3: yup
    .mixed()
    .nullable()
    .optional()
    .test("fileSize", "The file should be less than 2.5mb", (value) => {
      if (!value) return true;
      return value && value.size <= 2500000;
    }),
  productImage4: yup
    .mixed()
    .nullable()
    .optional()
    .test("fileSize", "The file should be less than 2.5mb", (value) => {
      if (!value) return true;
      return value && value.size <= 2500000;
    }),
});

const AddProductForm = () => {
  const { toast } = useToast();

  const [createProduct, { isSuccess, isError, data: newProductData }] =
    useCreateProductMutation({});

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
      reset({
        productTitle: "",
        productDescription: "",
        productPrice: "",
        productGender: newProductData.gender,
        productMainCategory: "",
        productSubCategory: "",
        productBrand: "",
        productColor: "",
        productImage1: null,
        productImage2: null,
        productImage3: null,
        productImage4: null,
      });
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

    newProductFormData.append("color", data.productColor);
    newProductFormData.append("brand", data.productBrand);
    newProductFormData.append("description", data.productDescription);
    newProductFormData.append("gender", data.productGender);
    newProductFormData.append("mainCategory", data.productMainCategory);
    newProductFormData.append("subCategory", data.productSubCategory);
    newProductFormData.append("price", data.productPrice);
    newProductFormData.append("title", data.productTitle);
    newProductFormData.append("images", data.productImage1);
    newProductFormData.append("images", data.productImage2);
    newProductFormData.append("images", data.productImage3);
    newProductFormData.append("images", data.productImage4);

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
                  name="productImage1"
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="h-40 w-40">
                <ProductFormImage
                  name="productImage2"
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="h-40 w-40">
                <ProductFormImage
                  name="productImage3"
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="h-40 w-40">
                <ProductFormImage
                  name="productImage4"
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit">Add product</Button>
          </div>
        </form>
      </Form>
      <DevTool control={control} />
    </>
  );
};
export default AddProductForm;
