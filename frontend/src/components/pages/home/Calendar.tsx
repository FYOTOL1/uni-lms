import { useFetchCalendars } from "../../../hooks/useCalendar";
import FromSelect from "../shared/FormSelect";
import { useFormik } from "formik";
import type { TMeRequest } from "../../../types/auth/authTypes";
import type {
  TCalendarSchemaType,
  TLectureCalendar,
  TSectionCalendar,
} from "../../../types/schema/CalendarSchemaType";

const Calendar = ({ user }: { user: TMeRequest }) => {
  const { calendars } = useFetchCalendars();

  const initialValues = {
    day: "",
    type: "",
    group: user?.userGroup || "all",
  };

  const { setFieldValue, values } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const daysOrder = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  const sortedCalendars = calendars
    ?.filter((f: TCalendarSchemaType) =>
      values.day && values.day != "all" ? f.dayName == values.day : f,
    )
    ?.filter((f: TCalendarSchemaType) =>
      values.group != "all" ? f.group == values.group : f,
    )
    ?.sort((a: TCalendarSchemaType, b: TCalendarSchemaType) => {
      return daysOrder.indexOf(a.dayName) - daysOrder.indexOf(b.dayName);
    })
    ?.map((e: TCalendarSchemaType) => {
      const sortedLectures = [...e.lectures].sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      );

      const sortedSections = [...e.sections].sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      );

      return { ...e, lectures: sortedLectures, sections: sortedSections };
    });

  return (
    <>
      <div className="w-full bg-white p-6 mt-8 rounded-lg">
        <h1 className="font-semibold text-xl">Calendar</h1>
        {/* Filtration */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <FromSelect
            setFieldValue={setFieldValue}
            defaultValue="day"
            values={values}
            choiceList={[
              "all",
              "saturday",
              "sunday",
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
            ]}
            styleWidth="w-30"
          />
          <FromSelect
            setFieldValue={setFieldValue}
            defaultValue="type"
            values={values}
            choiceList={["all", "lectures", "sections"]}
            styleWidth="w-25"
          />
          <FromSelect
            setFieldValue={setFieldValue}
            defaultValue="group"
            values={values}
            choiceList={["all", "a", "b", "c", "d"]}
            styleWidth="w-15"
          />
        </div>

        {/* Calendar */}

        {sortedCalendars?.length ? (
          sortedCalendars?.map((e: TCalendarSchemaType) => (
            <>
              {/* Lectures */}
              {values.type != "sections" &&
                e?.lectures?.map((l: TLectureCalendar) => (
                  <div className="w-full mt-4">
                    <div className="flex flex-wrap items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-purple-500">
                      {/* Date */}
                      <div className="flex flex-col items-center justify-center px-4 border-r border-gray-100 min-w-[100px]">
                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2 py-1 rounded-full mb-1">
                          {e.dayName}
                        </span>
                        <div className="text-gray-800 font-bold text-lg uppercase">
                          {Number(l.startTime.split(":")[0]) < 12
                            ? l.startTime + "AM"
                            : Number(l.startTime.split(":")[0]) -
                              12 +
                              ":" +
                              l.startTime.split(":")[1] +
                              "PM"}
                        </div>
                        <div className="text-gray-400 text-xs uppercase">
                          {Number(l.endTime.split(":")[0]) < 12
                            ? l.endTime + "AM"
                            : Number(l.endTime.split(":")[0]) -
                              12 +
                              ":" +
                              l.endTime.split(":")[1] +
                              "PM"}
                        </div>
                      </div>

                      {/* Lecture Details */}
                      <div className="flex-1 px-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-800 uppercase">
                            {l.subjectId.subjectCode}
                          </h3>
                          <span className="flex items-center justify-center text-[10px] px-2 h-5 bg-purple-100 text-purple-700 rounded border border-purple-200">
                            Lecture
                          </span>
                          <span className="flex items-center center gap-1 font-medium text-purple-700 bg-purple-100 px-4 h-5 text-[10px] border border-purple-200 rounded">
                            {e.group.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex sm:items-center flex-col sm:flex-row gap-4 text-sm text-gray-500 mt-1">
                          {/* Doctor Name*/}
                          <div className="flex items-center gap-1.5">
                            <i className="fa-solid fa-user-tie text-gray-400"></i>
                            <span>Dr. {l.doctorName}</span>
                          </div>

                          {/* Hall */}
                          <div className="flex items-center gap-1">
                            <i className="fa-solid fa-location-dot text-gray-400"></i>
                            <span className="flex items-center gap-1 font-medium text-gray-700">
                              Hall {l.hallCode.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Sections */}
              {values.type != "lectures" &&
                e?.sections?.map((l: TSectionCalendar) => (
                  <div className="w-full mt-4">
                    <div className="flex flex-wrap items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-blue-500">
                      {/* Date */}
                      <div className="flex flex-col items-center justify-center px-4 border-r border-gray-100 min-w-[100px]">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-purple-50 px-2 py-1 rounded-full mb-1">
                          {e.dayName}
                        </span>
                        <div className="text-gray-800 font-bold text-lg uppercase">
                          {Number(l.startTime.split(":")[0]) < 12
                            ? l.startTime + "AM"
                            : Number(l.startTime.split(":")[0]) -
                              12 +
                              ":" +
                              l.startTime.split(":")[1] +
                              "PM"}
                        </div>
                        <div className="text-gray-400 text-xs uppercase">
                          {Number(l.endTime.split(":")[0]) < 12
                            ? l.endTime + "AM"
                            : Number(l.endTime.split(":")[0]) -
                              12 +
                              ":" +
                              l.endTime.split(":")[1] +
                              "PM"}
                        </div>
                      </div>

                      {/* Lecture Details */}
                      <div className="flex-1 px-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-800 uppercase">
                            {l.subjectId.subjectCode}
                          </h3>
                          <span className="flex items-center justify-center text-[10px] px-2 h-5 bg-blue-100 text-blue-700 rounded border border-blue-200">
                            Section
                          </span>
                          <span className="flex items-center center gap-1 font-medium text-blue-700 bg-blue-100 px-4 h-5 text-[10px] border border-blue-200 rounded">
                            {e.group.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex sm:items-center flex-col sm:flex-row gap-4 text-sm text-gray-500 mt-1">
                          {/* Doctor Name*/}
                          <div className="flex items-center gap-1.5">
                            <i className="fa-solid fa-user-tie text-gray-400"></i>
                            <span>Eng. {l.assistantName}</span>
                          </div>

                          {/* Hall */}
                          <div className="flex items-center gap-1">
                            <i className="fa-solid fa-location-dot text-gray-400"></i>
                            <span className="flex items-center gap-1 font-medium text-gray-700">
                              Class Room {l.sectionCode.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ))
        ) : (
          <div className="py-2 mt-8 text-center font-semibold text-gray-800 ">
            No Calendars Founded!
          </div>
        )}
      </div>
    </>
  );
};

export default Calendar;
