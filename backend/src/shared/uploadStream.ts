import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from "../cloudinary";

const streamUpload = (fileBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "lectures", resource_type: "auto" },
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
