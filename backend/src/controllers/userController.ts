import { Request, Response } from "express";
import UserSchema from "../models/UserSchema";

const getAllStudents = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const getStudent = await UserSchema.find();
    return res.status(200).json({ message: "Successfully", users: getStudent });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const findAndUpdate = await UserSchema.findOneAndUpdate(
      { _id: body._id },
      { $set: body },
      {
        new: true,
        runValidators: true,
      },
    );

    if (findAndUpdate)
      return res
        .status(200)
        .json({ message: "Updated Successfully!", user: findAndUpdate });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findAndDelete = await UserSchema.findOneAndDelete({ _id: id });

    if (findAndDelete)
      return res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export { getAllStudents, updateUser, deleteUser };
