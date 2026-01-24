/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../main";

const fetchCalendars = async () => {
  try {
    const getCalendars = await api.get("/calendars");

    return getCalendars.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export { fetchCalendars };
