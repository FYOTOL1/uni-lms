import { Request, Response } from "express";
import LectureSchema from "../models/LectureSchema";
import streamUpload from "../shared/uploadStream";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { TLectureSchemaType } from "../types/LectureSchemaTypes";

const getAllLectures = async (req: Request, res: Response) => {
  try {
    const getLectures = await LectureSchema.find().populate("subject");
    return res
      .status(200)
      .json({ message: "successfully!", lectures: getLectures });
  } catch (error: any) {
    console.log("LectureControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const postLecture = async (req: Request, res: Response) => {
  try {
    const { lectureName, lectureDesc, subject } = req.body;
    const file = req.file as Express.Multer.File;

    const uploadFile = (await streamUpload(file.buffer)) as UploadApiResponse;

    const fileUrl = uploadFile?.secure_url;
    const fileType = uploadFile?.format;

    if (!fileUrl)
      return res.status(400).json({ message: "Failed Upload File!" });

    const createLecture = (await LectureSchema.create({
      lectureName,
      lectureDesc,
      attachmentUrl: fileUrl,
      attachmentType: fileType,
      subject,
    })) as TLectureSchemaType;

    if (!createLecture)
      return res.status(400).json({ message: "something went wrong!" });

    return res
      .status(201)
      .json({ message: "successfully!", lecture: createLecture });
  } catch (error: any) {
    console.log("LectureControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

export { getAllLectures, postLecture };
