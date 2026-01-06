import { GoClock } from "react-icons/go";
function StudySession() {
  return (
    <main className="space-y-5">
      <div>
        <h1 className="font-semibold text-2xl">Log Study Session</h1>
        <p className="text-gray-500">
          Record your study time and track your progress
        </p>
      </div>
      <section className="border-2 border-gray-300 shadow-lg rounded-lg p-5 ">
        <div className="flex gap-3">
          <GoClock className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white h-10 w-10 p-2 mt-1 rounded-lg" />
          <div>
            <p className="font-semibold">New Study Session</p>
            <p className="text-gray-500">Fill in the details below</p>
          </div>
        </div>
        <form action=""></form>
      </section>
    </main>
  );
}
export default StudySession;
