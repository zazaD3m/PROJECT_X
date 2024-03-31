import asyncHandler from "express-async-handler";

import Size from "../models/sizeModel.js";
import { ThrowErr } from "../utils/CustomError.js";

// @desc Create new size
// route POST /api/sizes/
export const createSize = asyncHandler(async (req, res) => {
  const { sizeType, sizeName } = req.body;
  const isDuplicate = await Size.findOne({ sizeType, sizeName });

  if (isDuplicate) {
    ThrowErr.Duplicate("this size already exists");
  }

  const newSize = await Size.create({ sizeType, sizeName });

  if (!newSize) {
    ThrowErr.ServerError();
  }

  return res.status(201).json(newSize);
});

// @desc Get all Sizes
// route GET /api/sizes/
export const getAllSizes = asyncHandler(async (req, res) => {
  let sizes = await Size.find().lean();

  if (!sizes) {
    ThrowErr.ServerError();
  }

  const toNumber = (str) => {
    const num = Number(str);
    return isNaN(num) ? str : num;
  };

  const convertSizesIntoObj = (s) => {
    // [{sizeType: "shoes", sizeNames: ["38", "40"]}]
    return s.reduce((acc, curr) => {
      const { sizeName, sizeType } = curr;
      const existingType = acc.find((item) => item.sizeType === sizeType);

      if (existingType) {
        existingType.sizeNames.push(toNumber(sizeName));
      } else {
        acc.push({ sizeType, sizeNames: [toNumber(sizeName)] });
      }

      return acc;
    }, []);
  };

  sizes = convertSizesIntoObj(sizes);

  res.status(200).json(sizes);
});

// @desc Get filtered-sizes
// route GET /api/sizes/filtered-sizes
export const getAllSizesForFilter = asyncHandler(async (req, res) => {
  let sizes = await Size.find().lean();

  if (!sizes) {
    ThrowErr.ServerError();
  }

  const toNumber = (str) => {
    const num = Number(str);
    return isNaN(num) ? str : num;
  };

  const newSizes = sizes
    .map((s) => toNumber(s.sizeName))
    .toSorted((a, b) => a - b);

  res.status(200).json(newSizes);
});

// @desc Delete size
// route DELETE /api/sizes/size/:sizeId
export const deleteSize = asyncHandler(async (req, res) => {
  const { sizeType, sizeName } = req.body;

  const size = await Size.findOneAndDelete({ sizeType, sizeName });

  if (!size) {
    ThrowErr.ServerError();
  }

  res.status(200).json(size);
});
