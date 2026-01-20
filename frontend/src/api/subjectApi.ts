import { api } from "../main";

const getAllSubjectsFn = async () => {
  const getSubjects = await api.get("/subjects");

  return getSubjects.data;
};

export { getAllSubjectsFn };
