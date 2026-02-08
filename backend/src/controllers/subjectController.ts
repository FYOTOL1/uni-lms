import { Request, Response } from "express";
import SubjectSchema from "../models/SubjectSchema";
import streamUpload from "../shared/uploadStream";
import { UploadApiResponse } from "cloudinary";

const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const findSubjects = await SubjectSchema.find();

    res.status(200).json({ message: "successfully!", subjects: findSubjects });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

const getOneSubject = async (req: Request, res: Response) => {
  try {
    const subjectCode = req.params.subjectCode;

    const findOneSubject = await SubjectSchema.findOne({ subjectCode });

    if (findOneSubject)
      return res
        .status(200)
        .json({ message: "Successfully!", subject: findOneSubject });

    return res.status(400).json({ message: "Failed" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

const postSubject = async (req: Request, res: Response) => {
  try {
    const book = req.file as Express.Multer.File;
    const body = req.body;
    body.subjectHours = Number(body.subjectHours);
    body.semester = Number(body.semester);

    const uploadBook = (await streamUpload(
      book.buffer,
      "subjects",
    )) as UploadApiResponse;

    const bookUrl = uploadBook.secure_url;

    if (!bookUrl)
      return res.status(400).json({ message: "Failed Upload Book!" });

    const createSubject = await SubjectSchema.create({
      ...body,
      book: bookUrl,
    });

    return res.status(201).json({
      message: "subject created successfully!",
      subject: createSubject,
    });
  } catch (error: any) {
    if (error?.code === 11000) {
      const field = Object.keys(error.keyValue)[0];

      return res
        .status(409)
        .json({ message: `${field} already exists!`, field });
    }

    console.log("Subject Controller: ", error?.message);
    res.status(500).json({ message: "internal server error" });
  }
};

const updateSubject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = req.file as Express.Multer.File;
    const body = req.body;
    let bookUrl;

    if (!id)
      return res.status(404).json({ message: "Subject id is Required!" });

    if (book) {
      const uploadBook = (await streamUpload(
        book.buffer,
        "subjects",
      )) as UploadApiResponse;

      bookUrl = uploadBook.secure_url;
    }

    const updateOne = await SubjectSchema.findOneAndUpdate(
      { _id: id },
      { $set: { ...body, book: bookUrl } },
    );

    if (updateOne)
      return res.status(200).json({
        message: "Updated Successfully!",
        subject: updateOne,
        body: body,
      });

    return res.status(400).json({ message: "Failed" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

export { postSubject, getAllSubjects, getOneSubject, updateSubject };
