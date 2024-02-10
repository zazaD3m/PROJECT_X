import ProductFormText from "./ProductFormText";
import ProductFormMainCategory from "./ProductFormMainCategory";
import ProductFormSubCategory from "./ProductFormSubCategory";
import ProductFormGender from "./ProductFormGender";
import ProductFormBrand from "./ProductFormBrand";
import ProductFormColor from "./ProductFormColor";
import ProductFormImage from "./ProductFormImage";

import { Button } from "../../../../components/ui/button";
import { Form } from "../../../../components/ui/form";
import { Card } from "../../../../components/ui/card";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

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
  // productFirstImage: yup.mixed().required("Add first picture"),
  // productSecondImage: yup.mixed().required("Add second picture"),
});

const AddProductForm = () => {
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
    },
    resolver: yupResolver(addProductSchema),
    mode: "onSubmit",
  });

  const { handleSubmit, control, resetField, getValues, setValue, watch } =
    form;

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 grid-rows-3 gap-x-16 gap-y-8">
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
          <div className="col-span-12 row-span-2 bg-red-200"></div>
        </div>
        <div className="flex justify-center pt-4">
          <Button type="submit">Add product</Button>
        </div>
      </form>
    </Form>
  );
};
export default AddProductForm;
