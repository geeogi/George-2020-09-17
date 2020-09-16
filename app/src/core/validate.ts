import {
  MAX_FILE_SIZE_MB,
  PERMISSABLE_FILE_TYPES_MIME,
} from "../config/constants";
import { bytesToMegabytes } from "./util";

export const validateFileForResource = (file: File) => {
  if (bytesToMegabytes(file.size) > MAX_FILE_SIZE_MB) {
    throw new Error(`File size must not exceed ${MAX_FILE_SIZE_MB}MB.`);
  }

  if (!PERMISSABLE_FILE_TYPES_MIME.includes(file.type)) {
    throw new Error(
      `File MIME type must be ${PERMISSABLE_FILE_TYPES_MIME.join(", ")}.`
    );
  }
};
