import React, { useEffect, useState } from "react";
const url = process.env.REACT_APP_API_URL;

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    applications: [],
    jobPosts: [],
    profileViews: [],
  });
  const [useruuid, setuuid] = useState("");
  useEffect(() => {
    const storeduuid = localStorage.getItem("user");
    const parseduser = JSON.parse(storeduuid);

    if (parseduser?.uuid) {
      setuuid(parseduser.uuid);
    } else {
      console.log("UUID not found");
    }
  }, []);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(
          `${url}/getchartdatatotaljobs/${useruuid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }
        const data = await response.json();
        console.log("Fetched Chart Data:", data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };
    fetchChartData();
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <div className="bg-green-opacity-10 rounded-lg shadow-md p-4 border border-gray-200 h-full overflow-hidden">
      <p className="text-lg font-semibold">Activity Overview</p>
      <div className="w-full h-[300px] lg:h-[400px] pt-4 mb-4">
        {/* Pass the fetched data to your LineChart component */}
        <LineChart data={chartData} />
      </div>
    </div>
  );
};

export default ChartComponent;
