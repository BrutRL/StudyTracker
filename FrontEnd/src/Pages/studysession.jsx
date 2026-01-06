import { GoClock } from "react-icons/go";
import { FiBookOpen } from "react-icons/fi";
import { allSessionQuery } from "../Queries/studysessionQueries";
import { subjectQuery } from "../Queries/subjectQueries";
function StudySession() {
  // const { data: sessionsData, isSuccess: sessionsSuccess } = allSessionQuery();
  const { data: subjectData, isSuccess: subjectSuccess } = subjectQuery();
  return (
    <main className="space-y-5">
      <div>
        <h1 className="font-semibold text-2xl">Log Study Session</h1>
        <p className="text-gray-500">
          Record your study time and track your progress
        </p>
      </div>

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
            <form action="" className="mt-5">
              <div>
                <p className="font-semibold text-gray-700">
                  Which subject did you study?
                </p>
                <select name="subjectId" id="">
                  {subjectData.data.map((data) => (
                    <option key={data._id}>{data.name}</option>
                  ))}
                </select>
              </div>
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
              💡 Go to the <strong className="text-yellow-900">Subjects</strong>{" "}
              tab to create your first subject
            </p>
          </div>
        )
      ) : (
        <p>Loading....</p>
      )}
    </main>
  );
}
export default StudySession;
