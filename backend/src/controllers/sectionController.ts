import { Request, Response } from "express";
import streamUpload from "../shared/uploadStream";
import { UploadApiResponse } from "cloudinary";
import SectionSchema from "../models/SectionSchema";

const getAllSections = async (req: Request, res: Response) => {
  try {
    const getSections = await SectionSchema.find().populate("subject");
    return res
      .status(200)
      .json({ message: "successfully!", sections: getSections });
  } catch (error: any) {
    console.log("SectionControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const postSection = async (req: Request, res: Response) => {
  try {
    const { sectionName, sectionDesc, subject } = req.body;
    const file = req.file as Express.Multer.File;

    const uploadFile = (await streamUpload(
      file.buffer,
      "sections",
    )) as UploadApiResponse;

    const attachmentUrl = uploadFile?.secure_url;

    if (!attachmentUrl)
      return res.status(400).json({ message: "Failed To Upload File!" });

    const createSection = await SectionSchema.create({
      sectionName,
      sectionDesc,
      attachmentUrl,
      subject,
    });

    if (!createSection)
      return res.status(400).json({ message: "something went wrong!" });

    return res.status(201).json({
      message: "Section Created Successfully!",
      section: createSection,
    });
  } catch (error: any) {
    console.log("SectionControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const updateSection = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const file = req.file;

    if (file) {
      const uploadFile = (await streamUpload(
        file.buffer,
        "sections",
      )) as UploadApiResponse;
      body.attachmentUrl = uploadFile.secure_url;
    }

    const update = await SectionSchema.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );

    return res.status(200).json({ message: "Section Updated Successfully" });
  } catch (error: any) {
    console.log("SectionControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const deleteSection = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleteLec = await SectionSchema.findOneAndDelete({ _id: id });

    if (deleteLec)
      return res.status(200).json({ message: "Section Deleted Successfully" });

    return res.status(200).json({ message: "Section Updated Successfully" });
  } catch (error: any) {
    console.log("SectionControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

export { getAllSections, postSection, updateSection, deleteSection };
