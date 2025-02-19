const VerticalCard = ({ profile_pic, name, details }) => {
  return (
    <div className="w-full bg-[#E1E5E5] rounded-lg shadow-md p-6 ml-0 space-y-4 border border-gray-200">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={profile_pic}
          alt={`${name}'s profile`}
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <div className="flex justify-around w-full space-x-4"></div>
      </div>
      <hr className="border-gray-300 my-6" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Activities
        </h3>
        {details.map((activity, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-md"
          >
            <div className="text-gray-800">
              <p className="text-xs">{activity.details}</p>
            </div>
            <div className="w-5 h-5"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCard;
