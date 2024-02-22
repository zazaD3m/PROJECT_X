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
import { useEffect } from "react";
import { useToast } from "../../../../components/ui/use-toast";
import { useUpdateProductMutation } from "../../../../features/products/productsApiSlice";
import Loader from "../../../../components/Loader";
import { useParams } from "react-router-dom";

const editProductSchema = yup.object().shape({
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
  productImage1: yup.mixed().nullable().required("Product image is required"),
  productImage2: yup.mixed().nullable().required("Product image is required"),
  productImage3: yup.mixed().nullable().optional(),
  productImage4: yup.mixed().nullable().optional(),
});

const EditProductForm = ({ product }) => {
  const { toast } = useToast();
  const { productId } = useParams();
  console.log(productId);

  const [
    updateProduct,
    { isSuccess, isLoading, isError, data: updatedProductData },
  ] = useUpdateProductMutation();

  const form = useForm({
    defaultValues: {
      productTitle: product.title,
      productDescription: product.description,
      productPrice: product.price,
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
    resetField,
    setError,
    setValue,
    watch,
    clearErrors,
    getValues,
    getFieldState,
  } = form;

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast({
  //       variant: "success",
  //       title: `${updatedProductData.title}, has been update`,
  //     });
  //     resetField("productTitle");
  //     resetField("productDescription");
  //     resetField("productPrice");
  //     resetField("productImage1");
  //     resetField("productImage2");
  //     resetField("productImage3");
  //     resetField("productImage4");
  //   }
  //   if (isError) {
  //     toast({
  //       variant: "destructive",
  //       title: `Server Error, Try again`,
  //     });
  //   }
  // }, [isSuccess, isError]);

  const handleAddProduct = async (data) => {
    const updatedProduct = {};
    const slug = `${data.productBrand}-${data.productSubCategory}-${data.productColor}-for-${data.productGender}`;

    updatedProduct.color = data.productColor;
    updatedProduct.brand = data.productBrand;
    updatedProduct.description = data.productDescription;
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

    console.log("data=", data);
    console.log("updated product=", updatedProduct);

    await updateProduct({ productData: updatedProduct, productId });
  };

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
                  getValue={getValues}
                  getFieldState={getFieldState}
                  clearErrors={clearErrors}
                  page={"edit"}
                  productId={product._id}
                  imageIndex={1}
                  product={product}
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
                  getValue={getValues}
                  getFieldState={getFieldState}
                  page={"edit"}
                  productId={product._id}
                  imageIndex={2}
                  product={product}
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
                  getValue={getValues}
                  getFieldState={getFieldState}
                  page={"edit"}
                  productId={product._id}
                  imageIndex={3}
                  product={product}
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
                  getValue={getValues}
                  getFieldState={getFieldState}
                  page={"edit"}
                  productId={product._id}
                  imageIndex={4}
                  product={product}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-8">
            {isLoading ? (
              <Loader />
            ) : (
              <Button type="submit" className="mx-auto min-w-40">
                Update Product
              </Button>
            )}
          </div>
        </form>
      </Form>
      <DevTool control={control} />
    </>
  );
};
export default EditProductForm;
