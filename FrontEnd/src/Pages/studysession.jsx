import { GoClock } from "react-icons/go";
import { FiBookOpen } from "react-icons/fi";
import {
  sessionCount,
  createSession,
  allSessionQuery,
  deleteSession,
  updateSession,
} from "../Queries/studysessionQueries";
import { subjectQuery } from "../Queries/subjectQueries";
import { useCallback, useState } from "react";
import { formatMinutes } from "../utils/hoursFormatter";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";
function StudySession() {
  const quickDurations = [25, 45, 60, 90];
  const [showUpdate, setShowUpdate] = useState(false);
  const create = createSession();
  const destroy = deleteSession();
  const update = updateSession();
  const { data: subjectData, isSuccess: subjectSuccess } = subjectQuery();
  const { data: studyCount, isSuccess: countSucess } = sessionCount();
  const { data: allSessions, isSuccess: sessionsSuccess } = allSessionQuery();
  const [formData, setFormData] = useState({
    subjectId: "",
    duration: "",
    notes: "",
    date: "",
  });
  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData],
  );
  const createSubmit = useCallback(
    (e) => {
      e.preventDefault();
      create.mutate(formData);
      setTimeout(() => {
        setFormData({
          subjectId: "",
          duration: "",
          notes: "",
          date: "",
        });
      }, 2000);
    },
    [formData],
  );

  const updateSubmit = useCallback(
    (e, id, data) => {
      e.preventDefault();
      update.mutate(id, data);
    },
    [formData],
  );
  const handleDelete = (id) => {
    destroy.mutate(id);
  };
  return (
    <main className="space-y-5 relative ">
      <div>
        <h1 className="font-semibold text-2xl">Log Study Session</h1>
        <p className="text-gray-500">
          Record your study time and track your progress
        </p>
      </div>

      <section className="md:grid grid-cols-2 gap-10">
        {subjectSuccess ? (
          subjectData.data.length > 0 ? (
            <div className="shadow-lg p-7 rounded-xl border border-gray-300">
              <div className="flex gap-3 border-b border-gray-200 pb-5">
                <GoClock className="text-white mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 h-10 w-10 p-2 rounded-xl" />
                <div>
                  <h1 className="font-semibold text-lg">New Study Session</h1>
                  <p className="text-gray-700 text-sm">
                    Fill in the details below
                  </p>
                </div>
              </div>
              <form action="" className="mt-5" onSubmit={createSubmit}>
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700">
                    Which subject did you study?
                  </p>
                  <select
                    name="subjectId"
                    id=""
                    className="w-full rounded-xl border-2 border-gray-300 p-3 focus:outline-none focus:border-indigo-600"
                    defaultValue=""
                    value={formData.subjectId}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      --Choose subject first--
                    </option>
                    {subjectData.data.map((data) => (
                      <option
                        key={data._id}
                        value={data._id}
                        className="rounded-lg"
                      >
                        {data.name}
                      </option>
                    ))}
                  </select>
                  <div>
                    <div className="space-y-3">
                      <label
                        htmlFor="duration"
                        className="font-semibold text-gray-700 "
                      >
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        name="duration"
                        onChange={handleChange}
                        value={formData.duration}
                        className="w-full rounded-xl mt-2 border-2 border-gray-300 p-3 focus:outline-none focus:border-indigo-600"
                        placeholder="e.g.45"
                      />
                      <div className="flex gap-3">
                        {quickDurations.map((data, index) => (
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, duration: data })
                            }
                            className="text-sm text-gray-700 bg-gray-100 p-2 border border-gray-200 rounded-xl hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-300"
                          >
                            {data}m
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="">
                      <label
                        htmlFor="duration"
                        className="font-semibold text-gray-700 "
                      >
                        When did you study?
                      </label>

                      <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        value={formData.date}
                        className="w-full rounded-xl mt-2 border-2 border-gray-300 p-3 focus:outline-none focus:border-indigo-600"
                        placeholder=""
                      />
                    </div>

                    <div className="space-y-3 mt-3">
                      <p className="font-semibold text-gray-700">
                        Session Notes{" "}
                        <span className="text-gray-500"> (optional)</span>
                      </p>
                      <textarea
                        name="notes"
                        onChange={handleChange}
                        id=""
                        value={formData.notes}
                        rows={7}
                        placeholder="What topics did you cover? How did it go? Any key takeaways?"
                        className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:border-indigo-700"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 p-3 w-full  rounded-lg transition transform duration-300 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg hover:scale-105"
                >
                  Log this session
                </button>
              </form>
            </div>
          ) : (
            <div className="border-2 border-yellow-500 rounded-xl p-5 bg-gradient-to-br from-yellow-50 to-orange-50 space-y-2">
              <div className="flex gap-3">
                <FiBookOpen className="bg-yellow-400 text-yellow-900 h-13 w-13 p-3 rounded-lg" />
                <h1 className="text-yellow-900 font-semibold text-lg mt-2">
                  No subjects found!
                </h1>
              </div>
              <p className="text-yellow-800">
                Before you can log a study session, you need to create at least
                one subject.
              </p>
              <p className="text-yellow-800 bg-yellow-100 rounded-xl p-3">
                💡 Go to the{" "}
                <strong className="text-yellow-900">Subjects</strong> tab to
                create your first subject
              </p>
            </div>
          )
        ) : (
          <p>Loading....</p>
        )}
        <section className="shadow-lg border border-gray-300 rounded-xl p-5">
          <div className="flex  gap-4 border-b border-gray-300 pb-6 ">
            <FiBookOpen className="bg-gradient-to-br from-green-600 to-emerald-600 text-white h-12 w-12 p-2 rounded-xl mt-1" />
            <div>
              <h1 className="font-bold text-lg">Session History</h1>
              {countSucess && (
                <p className="text-gray-500">{`${studyCount.data} total sessions`}</p>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {sessionsSuccess ? (
              allSessions.data.length > 0 ? (
                allSessions.data.map((data) => (
                  <div
                    key={data._id}
                    className="bg-gray-100 shadow-md rounded-xl border border-gray-300 p-5 mt-5 flex justify-between"
                  >
                    <div className="flex gap-4">
                      <GoClock className="bg-[#10B981] text-white h-10 w-10 p-2 rounded-xl mt-1" />
                      <div>
                        <p className="font-semibold text-lg">
                          {data.subjectId?.name}
                        </p>
                        <p>
                          {new Date(data.date).toLocaleDateString("en-us", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="bg-[#10B981] text-white rounded-xl p-2">
                        {formatMinutes(data.duration)}
                      </button>
                      <FaRegEdit
                        className="text-indigo-500 w-6 h-6 mt-3"
                        onClick={() => {
                          (setShowUpdate(true), setFormData(data));
                        }}
                      />
                      <RiDeleteBin6Line
                        className="text-red-500 w-6 h-6 mt-3"
                        onClick={() => handleDelete(data._id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center space-y-3 mt-19">
                  <GoClock className="bg-gray-200 h-15 w-15 p-3 rounded-xl  flex justify-self-center text-gray-500" />
                  <h1 className="font-semibold text-gray-700 text-xl ">
                    No sessions yet
                  </h1>
                  <p className="text-gray-500">
                    Your study sessions will appear here
                  </p>
                </div>
              )
            ) : (
              <p>Loading......</p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
export default StudySession;
