import { Router } from "express";
// import { validate } from "../../middleware/validationMiddleware.js";
import { getAllUsers } from "../../controllers/userController.js";

const router = Router();

router.route("/").get(getAllUsers);

export default router;
