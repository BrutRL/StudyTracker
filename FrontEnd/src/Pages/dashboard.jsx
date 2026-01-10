import { userQuery } from "../Queries/userQueries";
import { subjectQuery, subjectQueryCount } from "../Queries/subjectQueries";
import {
  summaryQuery,
  allSessionQuery,
  sessionCount,
} from "../Queries/studysessionQueries";
import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { formatMinutes } from "../utils/hoursFormatter";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { FiTarget } from "react-icons/fi";

function Dashboard() {
  const { data: userData, isSuccess: userSuccess } = userQuery();
  const { data: summaryData, isSuccess: summarySuccess } = summaryQuery();
  const { data: subjectData, isSuccess: subjectSuccess } = subjectQuery();
  const { data: sessionLogs, isSuccess: sessionLogsSuccess } =
    allSessionQuery();
  const { data: sessionCounts, isSuccess: sessionCountSuccess } =
    sessionCount();
  const { data: subjectCount, isSuccess: subjectCountSuccess } =
    subjectQueryCount();

  return (
    <main className="space-y-3">
      <div>
        {userSuccess && (
          <h1 className="text-xl font-semibold">{`Hey ${userData.data?.name}`}</h1>
        )}
        <p className="text-gray-600">Let's see how you're doing</p>
      </div>

      <section className="space-y-3 sm:space-y-5 md:space-y-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
          <div className="flex gap-2">
            <GoClock className="h-5 w-5 mt-1" />
            <p className="text-lg font-semibold">Total time</p>
          </div>
          {summarySuccess && (
            <p className="font-bold text-2xl md:text-4xl">
              {formatMinutes(summaryData.data.total)}
            </p>
          )}
          <p>All time study hours</p>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600  p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
          <div className="flex gap-2">
            <CiCalendar className="h-6 w-6 mt-0.5" />
            <p className="text-lg font-semibold">Today</p>
          </div>
          {summarySuccess && (
            <p className="font-bold text-2xl md:text-4xl">
              {formatMinutes(summaryData.data.today)}
            </p>
          )}
          <p className="">Nice work</p>
        </div>
        <div className="relative overflow-hidden  bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
          <div className="flex gap-2">
            <FaArrowTrendUp className="h-5 w-5 mt-1" />
            <p className="text-lg font-semibold">This week</p>
          </div>
          {summarySuccess && (
            <p className="font-bold text-2xl md:text-4xl">
              {formatMinutes(summaryData.data.thisWeek)}
            </p>
          )}
          <p>Last 7 days</p>
        </div>
      </section>
      <h1 className="text-xl font-semibold text-left">Your Subjects</h1>
      <section className="space-y-3 sm:space-y-5 md:space-y-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
        <section className="grid grid-cols-1 md: gap-4 md:col-span-2">
          {subjectSuccess ? (
            subjectData.data.length > 0 ? (
              subjectData.data.map((subject) => (
                <div
                  key={subject._id}
                  className="p-4 bg-white rounded border rounded-xl border-gray-200 shadow hover:shadow-md transition"
                >
                  <p className="font-medium">{subject.name}</p>
                  <p className="text-gray-500 text-sm">{subject.description}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-6 text-gray-500 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 space-y-2">
                <div className="bg-white p-3 rounded-lg">
                  <FiBookOpen className="h-10 w-10 mb-2 " />
                </div>
                <p className="text-gray-700 text-lg">No subjects yet</p>
                <p className="text-center">
                  Start by creating a subject you want to study. Go to the
                  Subjects tab!
                </p>
              </div>
            )
          ) : (
            <p className="text-lg text-center font-semibold">
              Loading subjects...
            </p>
          )}
        </section>

        <section className="space-y-5">
          <div className="bg-white p-5 shadow-md rounded-lg space-y-3">
            <div className="flex gap-3">
              <FiTarget className="text-indigo-600 h-7 w-7" />
              <p className="text-lg">Quick Stats</p>
            </div>

            <div className="bg-indigo-100 rounded-xl border border-indigo-200 flex justify-between p-3">
              <div className="flex gap-2">
                <FiBookOpen className="h-5 w-5 text-indigo-500 mt-1" />
                <p className="text-gray-600">Subjects</p>
              </div>
              {subjectCountSuccess && (
                <p className="text-lg font-bold text-indigo-600">
                  {subjectCount.data}
                </p>
              )}
            </div>
            <div className="bg-green-100 rounded-xl border border-green-200 flex justify-between p-3">
              <div className="flex gap-2">
                <FiTarget className="h-5 w-5 text-green-500 mt-1" />
                <p className="text-gray-600">Sessions</p>
              </div>
              {sessionCountSuccess && (
                <p className="text-lg font-bold text-green-600">
                  {sessionCounts.data}
                </p>
              )}
            </div>
          </div>
          <div className="bg-white p-5 shadow-md rounded-lg space-y-5">
            <div className="flex gap-2">
              <GoClock className="h-6 w-6 mt-1 text-indigo-500" />
              <p className="text-lg font-semibold">Recent Sessions</p>
            </div>
            <div className="max-h-64 overflow-y-scroll scrollbar-hide space-y-3 p-2">
              {sessionLogsSuccess ? (
                sessionLogs.data.length > 0 ? (
                  sessionLogs.data.map((data) => (
                    <div
                      className="bg-gray-100 flex justify-between p-3 rounded-lg border border-transparent transition-all duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-300 hover:scale-[1.02]"
                      key={data._id}
                    >
                      <div className="flex gap-2">
                        <FiBookOpen className="h-10 w-10 mt-1 text-white rounded-md p-2 bg-emerald-500" />
                        <div>
                          <p className="font-semibold">{data.userId?.name}</p>
                          <p className="text-sm text-gray-700">
                            {new Date(data.date).toLocaleDateString("en-us", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold bg-emerald-500 p-2  rounded-lg text-sm text-white">{`${data.duration}ms`}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className=" flex flex-col justify-center items-center">
                    <GoClock className="h-15 w-15 bg-gray-200  p-3 rounded-full text-gray-500" />
                    <p className="text-gray-700">No session yet</p>
                    <p className="text-gray-500">
                      Start logging your study time!
                    </p>
                  </div>
                )
              ) : (
                <p className="text-center text-lg text-gray-700">Loading...</p>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
