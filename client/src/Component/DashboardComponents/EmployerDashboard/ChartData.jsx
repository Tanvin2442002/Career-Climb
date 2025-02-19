const Chartdata = (monthlyJobPosts, monthlyApplications, monthlyRecruited) => ({
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
  jobPosts: monthlyJobPosts,
  applications: monthlyApplications,
  recruited: monthlyRecruited,
});

export default Chartdata;
