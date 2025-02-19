const Chartdata = (monthlyJobPosts, monthlyAccepted, monthlyRejected) => ({
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
  accepted: monthlyAccepted,
  rejected: monthlyRejected,
});

export default Chartdata;
