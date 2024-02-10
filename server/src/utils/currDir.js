import path from "path";
import url from "url";

export const currDir = (fileurl) => {
  const __filename = url.fileURLToPath(fileUrl);
  return path.dirname(__filename);
};
