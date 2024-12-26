import AppImg from '../../Assets/Application.png';

const Application = () => {
    return (
        <div div className='flex flex-col md:flex-row-reverse justify-center items-center gap-8 p-5 bg-gradient-to-l from-background to-green-opacity-30 ' >
            <img src={AppImg} alt="application" className='md:w-2/5 ' />
            <div className='flex-col font-Bai_Jamjuree justify-between items-center gap-5 p-5 '>
                <h1 className='text-3xl font-semibold p-2 mb-5 border-b-2 border-b-green-opacity-80'>Track Your
                    Track Your
                    <span className='text-4xl font-bold p-2 text-green'>Job Applications</span>
                    with Ease
                </h1>
                <p className='text-lg font-light font-Poppins p-2 tracking-normal w-full text-start'>Feeling overwhelmed by the job application process? Our platform simplifies the process by providing a centralized location to track all your job and internship applications. With real-time updates, you can easily monitor the status of your applications at a glance.</p>

                <div className="font-Poppins ml-5 md:ml-10">
                    <p className='font-semibold text-xl text-green'>Centralized Tracking:
                        <span className='text-l font-normal text-black'> Keep all your job and internship applications organized in one place.</span></p>
                    <p className='font-semibold text-xl text-green'>Real-Time Updates:
                        <span className='text-l font-normal text-black'> Monitor the status of your applications (Pending, Accepted, Viewed, Rejected) at a glance.</span></p>
                </div>
            </div>
        </div >
    )
}

export default Application