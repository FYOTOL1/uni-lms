import { api } from "../main";

const getAllSubjectsFn = async () => {
  const getSubjects = await api.get("/subjects");

  return getSubjects.data;
};

const getOneSubjectsFn = async (subjectCode: string) => {
  const getSubjects = await api.post(`/subjects/${subjectCode}`);

  return getSubjects.data;
};

export { getAllSubjectsFn, getOneSubjectsFn };
