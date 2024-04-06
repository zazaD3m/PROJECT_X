import { Router } from "express";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";
import { ThrowErr } from "../../utils/CustomError.js";

import brandRoutes from "./brandRoutes.js";
import colorRoutes from "./colorRoutes.js";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";
import saleRoutes from "./saleRoutes.js";
import sizeRoutes from "./sizeRoutes.js";
import imageRoutes from "./imageRoutes.js";
import cartRoutes from "./cartRoutes.js";
import orderRoutes from "./orderRoutes.js";

const router = Router();

router.use("/brands", authenticateUser, isAdmin, brandRoutes);
router.use("/colors", authenticateUser, isAdmin, colorRoutes);
router.use("/categories", authenticateUser, isAdmin, categoryRoutes);
router.use("/sizes", sizeRoutes);
router.use("/images", authenticateUser, isAdmin, imageRoutes);
router.use("/products", productRoutes);
router.use("/sales", saleRoutes);
router.use("/users", authenticateUser, userRoutes);
router.use("/carts", authenticateUser, cartRoutes);
router.use("/orders", authenticateUser, orderRoutes);

router.all("*", (req, res, next) => {
  ThrowErr.NotFound(`Can't find ${req.originalUrl} on the server!`);
});

export default router;
