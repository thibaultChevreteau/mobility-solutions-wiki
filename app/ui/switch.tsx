// components/Switch.js
export default function Switch({
  isOn,
  handleToggle,
}: {
  isOn: boolean
  handleToggle: () => void
}) {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-700">{isOn ? "On" : "Off"}</span>
      <div className="relative">
        <input
          type="checkbox"
          id="toggle"
          checked={isOn}
          onChange={handleToggle}
          className="sr-only"
        />
        <div
          className={`w-14 h-8 flex items-center cursor-pointer rounded-full ${
            isOn ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={handleToggle}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
              isOn ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </div>
      </div>
    </div>
  )
}
