import { NextFunction, Request, Response } from "express";
import UserSchema from "../models/UserSchema";

const hasPermissionsMiddleware = (
  targetPermission:
    | "users"
    | "subjects"
    | "calendars"
    | "assignments"
    | "lectures"
    | "sections",
  permissionType: "canCreate" | "canEdit" | "canDelete",
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findUser = await UserSchema.findOne({ _id: req.user?._id });

      if (!findUser)
        return res.status(404).json({ message: "Unauthenticated" });

      if (
        findUser &&
        findUser.permissions[targetPermission]?.[permissionType] === true
      ) {
        return next();
      }

      return res.status(403).json({
        message: `Forbidden: You don't have permission to ${permissionType} in ${targetPermission}`,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Internal server error!",
        error: error.message,
      });
    }
  };
};

export default hasPermissionsMiddleware;
