import { api } from "../main";

const getAllSubjectsFn = async () => {
  const getSubjects = await api.get("/subjects");

  return getSubjects.data;
};

const getOneSubjectsFn = async (subjectCode: string) => {
  const getSubject = await api.post(`/subjects/${subjectCode}`);

  return getSubject.data;
};

export { getAllSubjectsFn, getOneSubjectsFn };
