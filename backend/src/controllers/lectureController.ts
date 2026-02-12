import { Request, Response } from "express";
import LectureSchema from "../models/LectureSchema";
import streamUpload from "../shared/uploadStream";
import { UploadApiResponse } from "cloudinary";

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

    const uploadFile = (await streamUpload(
      file.buffer,
      "lectures",
    )) as UploadApiResponse;

    const attachmentUrl = uploadFile?.secure_url;

    if (!attachmentUrl)
      return res.status(400).json({ message: "Failed To Upload File!" });

    const createLecture = await LectureSchema.create({
      lectureName,
      lectureDesc,
      attachmentUrl,
      subject,
    });

    if (!createLecture)
      return res.status(400).json({ message: "something went wrong!" });

    return res
      .status(201)
      .json({ message: "Created Successfully!", lecture: createLecture });
  } catch (error: any) {
    console.log("LectureControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const updateLecture = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const file = req.file;

    if (file) {
      const uploadFile = (await streamUpload(
        file.buffer,
        "lectures",
      )) as UploadApiResponse;
      body.attachmentUrl = uploadFile.secure_url;
    }

    const updateLecture = await LectureSchema.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );

    return res.status(200).json({ message: "Lecture Updated Successfully" });
  } catch (error: any) {
    console.log("LectureControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const deleteLecture = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleteLec = await LectureSchema.findOneAndDelete({ _id: id });

    if (deleteLec)
      return res.status(200).json({ message: "Lecture Deleted Successfully" });

    return res.status(200).json({ message: "Lecture Updated Successfully" });
  } catch (error: any) {
    console.log("LectureControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

export { getAllLectures, postLecture, updateLecture, deleteLecture };
