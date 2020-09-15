import { MAX_FILE_SIZE_MB, PERMISSABLE_FILE_TYPES_MIME } from "../config/constants";
import { bytesToMegabytes } from "./util";

export const validateFileForResource = (file: File) => {
  if (bytesToMegabytes(file.size) > MAX_FILE_SIZE_MB) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE_MB}mb`);
  }

  if (!PERMISSABLE_FILE_TYPES_MIME.includes(file.type)) {
    throw new Error(`File MIME type not allowed`);
  }
};
