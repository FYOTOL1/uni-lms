/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../main";

const fetchCalendars = async () => {
  const getCalendars = await api.get("/calendars");

  return getCalendars.data;
};

export { fetchCalendars };
