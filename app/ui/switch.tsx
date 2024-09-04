export default function Switch({
  isOn,
  handleToggle,
}: {
  isOn: boolean
  handleToggle: () => void
}) {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="checkbox"
          id="toggle"
          checked={isOn}
          onChange={handleToggle}
          className="sr-only"
        />
        <div
          className={`w-8 h-5 flex items-center cursor-pointer rounded-full ${
            isOn ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={handleToggle}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
              isOn ? "translate-x-3.5" : "translate-x-0.5"
            }`}
          />
        </div>
      </div>
    </div>
  )
}
