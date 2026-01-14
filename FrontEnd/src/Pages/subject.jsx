import { useCallback, useState } from "react";
import {
  subjectQuery,
  createSubject,
  deleteSubject,
  updateSubject,
} from "../Queries/subjectQueries";
import { FiBookOpen } from "react-icons/fi";
import { formatMinutes } from "../utils/hoursFormatter";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import UpdateSubject from "../component/subject/updateSubject";
import CreateSubject from "../component/subject/createSubject";
function Subject() {
  const { data: subjects, isSuccess: subjectsSuccess } = subjectQuery();
  const createSubmitQuery = createSubject();
  const deleteQuery = deleteSubject();
  const updateQuery = updateSubject();
  const [formData, setFormData] = useState({
    name: "",
    targetHours: "",
    color: "",
  });
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const PRESET_COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316",
  ];

  const handleChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  });

  const handleColorSelect = useCallback((color) => {
    setFormData({ ...formData, color });
  });
  const createSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createSubmitQuery.mutate(formData);
    },
    [formData]
  );

  const deleteSubmit = useCallback((id) => {
    deleteQuery.mutate(id);
  });

  const updateSubmit = useCallback(
    (e) => {
      e.preventDefault();

      updateQuery.mutate({ id: formData._id, body: formData });
    },
    [formData]
  );
  return (
    <main className="space-y-5 relative">
      <section className="flex justify-between">
        <div>
          <h1 className="font-semibold text-2xl">My Subject</h1>
          <p className="text-gray-500">Manage what you're learning</p>
        </div>
        <button
          className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3  rounded-lg transition transform duration-300 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg hover:scale-105"
          onClick={() => setShowCreate(true)}
        >
          + New Subject
        </button>
      </section>
      {showCreate && (
        <CreateSubject
          formData={formData}
          setFormData={setFormData}
          PRESET_COLORS={PRESET_COLORS}
          handleChange={handleChange}
          handleColorSelect={handleColorSelect}
          onSubmit={createSubmit}
          onCancel={() => setShowCreate(false)}
        />
      )}

      {showUpdate && (
        <UpdateSubject
          formData={formData}
          setFormData={setFormData}
          PRESET_COLORS={PRESET_COLORS}
          handleChange={handleChange}
          handleColorSelect={handleColorSelect}
          onSubmit={updateSubmit}
          onCancel={() => setShowUpdate(false)}
        />
      )}

      {subjectsSuccess ? (
        subjects.data.length > 0 ? (
          <div className="space-y-3 md:space-y-0 grid grid-cols-1 md:grid-cols-3 gap-5">
            {subjects.data.map((data) => (
              <div
                key={data._id}
                className="border-2 border-gray-300 rounded-md p-5 relative rounded-xl"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1.5 rounded-t-xl"
                  style={{ backgroundColor: data.color }}
                />
                <div className="flex gap-3 border-b-1 pb-5 border-gray-200">
                  <div className="flex justify-between w-full">
                    <div className="flex gap-3">
                      <FiBookOpen
                        className="h-10 w-10 mt-1 text-white rounded-md p-2"
                        style={{ backgroundColor: data.color }}
                      />
                      <div>
                        <p>{data.name}</p>
                        <p>{`Target: ${formatMinutes(data.targetHours)}`}</p>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="transition transform duration-300 hover:bg-red-100 hover:text-red-700 hover:scale-105 p-2 rounded-full text-center"
                        onClick={() => deleteSubmit(data._id)}
                      >
                        <RiDeleteBin6Line className="text-red-500 h-5 w-5 text-center" />
                      </button>
                      <button
                        className="transition transform duration-300 hover:bg-indigo-100 hover:text-indigo-700 hover:scale-105 p-2 rounded-full text-center"
                        onClick={() => {
                          setShowUpdate(true);
                          setFormData(data);
                        }}
                      >
                        <FaRegEdit className="text-indigo-500 h-5 w-5 text-center" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  {new Date(data.createdAt).toLocaleDateString("en-us", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-6 text-gray-500 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 space-y-2">
            <div className="bg-white p-3 rounded-lg">
              <FiBookOpen className="h-10 w-10 mb-2 " />
            </div>
            <p className="text-gray-700 text-lg">No subjects yet</p>
            <p className="text-center">
              Create your first subject to start tracking your study progress
            </p>
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3  rounded-lg transition transform duration-300 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg hover:scale-105"
              onClick={() => setShowCreate(true)}
            >
              + Create First Subject
            </button>
          </div>
        )
      ) : (
        <p>Loading.....</p>
      )}
    </main>
  );
}

export default Subject;
