const generateWaveData = (length, amplitude = 10, frequency = 0.1) => {
  const data = [];
  for (let i = 0; i < length; i++) {
    const y = amplitude * Math.sin(frequency * i) + Math.random() * 5;
    data.push(Math.abs(Math.round(y))); 
  }
  return data;
};

const Chartdata = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  applications: generateWaveData(12, 30, 0.3), 
  jobPosts: generateWaveData(12, 20, 0.5), 
  profileViews: generateWaveData(12, 40, 0.2), 
};

export default Chartdata;
