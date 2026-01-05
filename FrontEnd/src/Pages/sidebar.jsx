import { useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import Dashboard from "./dashboard";
import StudySession from "./studysession";
import Profile from "./profile";
import Subject from "./subject";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const component = {
    dashboard: <Dashboard />,
    studysession: <StudySession />,
    profile: <Profile />,
    subject: <Subject />,
  };

  return (
    <main className="relative">
      <header className="shadow-md p-3 px-5 flex justify-between">
        <div className="flex gap-5">
          <span className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3  rounded-xl">
            <FiBookOpen className="text-white  w-5 h-5 " />
          </span>
          <h1 className="font-bold mt-2 text-lg md:text-xl">Study Tracker</h1>
        </div>
        <div className="p-2 hover:bg-gray-200 rounded-lg transition duration-300">
          <RxHamburgerMenu
            className=" h-7 w-7 text-gray-700 "
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg p-5 ">
          <span className="bg-white p-3 rounded-xl">
            <FiBookOpen className="text-indigo-600  w-7 h-7 " />
          </span>
          <div>
            <h1 className="font-semibold text-lg">Study Tracker</h1>
            <p className="text-sm">Your learninng journey</p>
          </div>
        </div>
        <ul className="space-y-3 flex-1 p-4">
          {[
            { key: "dashboard", label: "Dashboard" },
            { key: "subject", label: "Subject" },
            { key: "studysession", label: "Study Session" },
            { key: "profile", label: "Profile" },
          ].map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActive(item.key)}
                className={`block w-full text-left text-gray-700 font-semibold px-4 py-2 rounded-lg transition duration-200
                    ${
                      active === item.key
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : " hover:bg-gray-200 hover:scale-105"
                    }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="ml-5 p-6">{component[active]}</main>
    </main>
  );
}
export default Sidebar;
