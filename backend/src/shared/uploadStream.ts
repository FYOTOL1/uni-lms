import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from "../cloudinary";

const streamUpload = (
  fileBuffer: Buffer,
  folder: string,
  type: "auto" | "image" | "video" | "raw" = "auto",
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: type },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    stream.end(fileBuffer);
  });
};
export default streamUpload;
