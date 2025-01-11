const VerticalCard = ({ profilePic, userName, progressData, activities }) => {
  return (
    <div className="w-full bg-[#E1E5E5] rounded-lg shadow-md p-6 ml-0 space-y-4 border border-gray-200">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={profilePic}
          alt={`${userName}'s profile`}
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold text-gray-800">{userName}</h2>
        <div className="flex justify-around w-full space-x-4">
          {progressData.map((progress, index) => (
            <div key={index} className="relative flex flex-col items-center space-y-2">
              <svg
                className="w-20 h-20 -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-gray-200"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-blue-600"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress.percentage}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm font-bold text-blue-600">
                {progress.percentage}%
              </span>
              <div className="text-center text-sm text-gray-600">
                {progress.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-gray-300 my-6" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-md"
          >
            <div className="text-gray-800">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs">{activity.description}</p>
            </div>
            <div className="w-5 h-5">
              <img
                src={activity.icon}
                alt="Activity icon"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCard;
