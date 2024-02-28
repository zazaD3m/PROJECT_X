/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

import { Button } from "../../../../components/ui/button";
import { Form } from "../../../../components/ui/form";
import Loader from "../../../../components/Loader";
import { useToast } from "../../../../components/ui/use-toast";
import { useCreateProductMutation } from "../../../../features/products/productsApiSlice";

const addProductSchema = yup.object().shape({
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
      productSize: "",
      productSizeType: "",
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

  const handleAddProduct = async (data) => {
    const newProduct = {};
    const slug = `${data.productBrand}-${data.productSubCategory}-${data.productColor}-for-${data.productGender}`;

    newProduct.color = data.productColor;
    newProduct.brand = data.productBrand;
    newProduct.description = data.productDescription;
    newProduct.size = data.productSize;
    newProduct.gender = data.productGender;
    newProduct.mainCategory = data.productMainCategory;
    newProduct.subCategory = data.productSubCategory;
    newProduct.price = data.productPrice;
    newProduct.title = data.productTitle;
    newProduct.slug = slug;
    newProduct.images = {};
    newProduct.images[1] = { ...data.productImage1, alt: slug };
    newProduct.images[2] = { ...data.productImage2, alt: slug };
    if (data.productImage3) {
      newProduct.images[3] = { ...data.productImage3, alt: slug };
    }
    if (data.productImage4) {
      newProduct.images[4] = { ...data.productImage4, alt: slug };
    }

    await createProduct(newProduct);
  };

  return (
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
              watch={watch}
              setValue={setValue}
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
                  isCreateProductSuccess={isSuccess}
                  getValue={getValues}
                  name="productImage1"
                  control={control}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="h-40 w-40">
                <ProductFormImage
                  isCreateProductSuccess={isSuccess}
                  getValue={getValues}
                  name="productImage2"
                  control={control}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="h-40 w-40">
                <ProductFormImage
                  isCreateProductSuccess={isSuccess}
                  getValue={getValues}
                  name="productImage3"
                  control={control}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
              <div className="h-40 w-40">
                <ProductFormImage
                  isCreateProductSuccess={isSuccess}
                  getValue={getValues}
                  name="productImage4"
                  control={control}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </div>
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
  );
};
export default AddProductForm;
