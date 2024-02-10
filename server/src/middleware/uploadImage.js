import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

import { currDir } from "../utils/currDir.js";

const __dirname = currDir(import.meta.url);
