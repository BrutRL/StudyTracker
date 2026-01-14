import { FiBookOpen } from "react-icons/fi";

function UpdateSubject({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  PRESET_COLORS,
  handleChange,
  handleColorSelect,
}) {
  return (
    <div className="bg-white shadow-lg w-full p-5 rounded-lg bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200">
      <div className="flex gap-3">
        <FiBookOpen className="h-10 w-10 mb-2 text-white rounded-xl bg-indigo-600 p-2" />
        <h1 className="text-black text-lg mt-1">Update Subject</h1>
      </div>

      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="text-gray-600 text-lg font-semibold">
            Subject Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-gray-600 text-lg font-semibold">
            Target Hours
          </label>
          <input
            type="text"
            name="targetHours"
            value={formData.targetHours}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-3 font-medium">
            Pick a Color
          </label>
          <div className="flex gap-3 flex-wrap">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                className="relative w-12 h-12 rounded-xl transition-all hover:scale-110 shadow-md"
                style={{ backgroundColor: color }}
              >
                {formData.color === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      ✓
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-5">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-lg text-white"
          >
            Update Subject
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border-2 border-gray-300 rounded-lg p-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSubject;
