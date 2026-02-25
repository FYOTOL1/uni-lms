import { Request, Response } from "express";
import streamUpload from "../shared/uploadStream";
import { UploadApiResponse } from "cloudinary";
import AssignmentSchema from "../models/AssignmentSchema";

const getAllAssignments = async (req: Request, res: Response) => {
  try {
    const getAssignments = await AssignmentSchema.find().populate("subject");
    return res
      .status(200)
      .json({ message: "successfully!", assignments: getAssignments });
  } catch (error: any) {
    console.log("AssignmentControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const postAssignment = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const file = req.file as Express.Multer.File;

    const uploadFile = (await streamUpload(
      file.buffer,
      "assignments",
    )) as UploadApiResponse;

    const attachmentUrl = uploadFile?.secure_url;

    if (!attachmentUrl)
      return res.status(400).json({ message: "Failed To Upload File!" });

    const createAssignment = await AssignmentSchema.create({
      ...body,
      attachmentUrl,
    });

    if (!createAssignment)
      return res.status(400).json({ message: "something went wrong!" });

    return res.status(201).json({
      message: "Assignment Created Successfully!",
      assignment: createAssignment,
    });
  } catch (error: any) {
    console.log("AssignmentControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const updateAssignment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const file = req.file;

    if (file) {
      const uploadFile = (await streamUpload(
        file.buffer,
        "assignments",
      )) as UploadApiResponse;
      body.attachmentUrl = uploadFile.secure_url;
    }

    const update = await AssignmentSchema.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );

    return res.status(200).json({ message: "Assignment Updated Successfully" });
  } catch (error: any) {
    console.log("AssignmentControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleteLec = await AssignmentSchema.findOneAndDelete({ _id: id });

    if (deleteLec)
      return res
        .status(200)
        .json({ message: "Assignment Deleted Successfully" });

    return res.status(200).json({ message: "Assignment Updated Successfully" });
  } catch (error: any) {
    console.log("AssignmentControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

export {
  getAllAssignments,
  postAssignment,
  updateAssignment,
  deleteAssignment,
};
