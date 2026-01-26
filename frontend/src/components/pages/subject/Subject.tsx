import type { TSubjectSchemaType } from "../../../types/schema/SubjectSchemaType";

const subject = ({ subject }: { subject: TSubjectSchemaType }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 to-purple-50 p-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(88,28,135,0.35)]">
        {/* Hero */}
        <div className="bg-linear-to-r from-purple-700 to-purple-600 p-8 text-white">
          <h1 className="text-3xl font-bold">{subject?.subjectName}</h1>
          <p className="mt-1 opacity-90">
            {subject?.subjectCode} • {subject?.doctorName}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-xl bg-white/20 px-4 py-1 text-sm">
              ⏱️ {subject?.subjectHours} ساعات
            </span>
            {subject?.updatedAt && (
              <span className="rounded-xl bg-white/20 px-4 py-1 text-sm">
                📅 آخر تحديث:{" "}
                {new Date(subject?.updatedAt).toLocaleDateString("ar-EG")}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-12 p-8">
          {/* Description */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-purple-700">
              وصف المادة
            </h2>
            <p className="max-w-3xl leading-8 text-gray-700">
              {subject?.subjectDesc}
            </p>
          </section>

          {/* Lectures */}
          {subject?.lectures && subject?.lectures?.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-purple-700">
                المحاضرات
              </h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subject?.lectures &&
                  subject?.lectures.map((lec, index) => (
                    <li
                      key={index}
                      className="rounded-2xl border border-purple-200 bg-purple-50 px-5 py-4 font-medium text-purple-900"
                    >
                      {lec}
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {/* Sections */}
          {subject?.sections && subject?.sections?.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-purple-700">
                السكاشن
              </h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {subject?.sections &&
                  subject?.sections?.map((sec, index) => (
                    <li
                      key={index}
                      className="rounded-2xl border border-purple-200 bg-purple-50 px-5 py-4 text-purple-900"
                    >
                      {sec}
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {/* Assignments */}
          {subject?.assignments && subject?.assignments?.length > 0 && (
            <section>
              <h2 className="mb-5 text-2xl font-semibold text-purple-700">
                التكليفات
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {subject?.assignments &&
                  subject?.assignments.map((a) => (
                    <div
                      key={a._id}
                      className="overflow-hidden rounded-3xl border border-purple-200 bg-white shadow-md transition hover:-translate-y-1"
                    >
                      <img
                        src={a.imgUrl}
                        alt={a.assignmentTitle}
                        className="h-40 w-full object-cover"
                      />
                      <div className="space-y-2 p-4">
                        <h3 className="text-lg font-semibold text-purple-800">
                          {a.assignmentTitle}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {a.assignmentDesc}
                        </p>
                        <p className="text-sm font-medium text-purple-700">
                          ⏰ {new Date(a.deadline).toLocaleDateString("ar-EG")}
                        </p>
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            a.isDone
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {a.isDone ? "تم التسليم" : "لم يتم التسليم"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Book */}
          {subject?.book && (
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-purple-700">
                الكتاب
              </h2>
              <p className="text-lg text-gray-700">📘 {subject.book}</p>
            </section>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-6">
            <button className="rounded-2xl bg-purple-700 px-6 py-3 font-semibold text-white transition hover:bg-purple-800">
              إضافة Assignment
            </button>
            <button className="rounded-2xl border-2 border-purple-700 px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-50">
              رجوع للمواد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default subject;
