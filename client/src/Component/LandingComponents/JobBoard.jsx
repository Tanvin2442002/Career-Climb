import JobCard from './JobCard.jsx';
import Logo from '../../Assets/google.svg';
import Design from '../../Assets/Design.svg'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const JOBS = [
    {
        logo: Logo,
        date: '8 DEC, 2023',
        title: 'Software Engineer',
        type: 'FULL TIME',
        salary: '$10K-$15K',
        location: 'London, United Kingdom',
        description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
        logo: Logo,
        date: '8 DEC, 2023',
        title: 'Data Analyst',
        type: 'FULL TIME',
        salary: '$10K-$15K',
        location: 'London, United Kingdom',
        description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
        logo: Logo,
        date: '8 DEC, 2023',
        title: 'Lead Product Designer',
        type: 'FULL TIME',
        salary: '$10K-$15K',
        location: 'London, United Kingdom',
        description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
        logo: Logo,
        date: '8 DEC, 2023',
        title: 'Full-Stack Developer',
        type: 'FULL TIME',
        salary: '$10K-$15K',
        location: 'London, United Kingdom',
        description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
        logo: Logo,
        date: '8 DEC, 2023',
        title: 'UX Designer/Researcher',
        type: 'FULL TIME',
        salary: '$10K-$15K',
        location: 'London, United Kingdom',
        description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
        logo: Logo,
        date: '8 DEC, 2023',
        title: 'Software Engineer',
        type: 'FULL TIME',
        salary: '$10K-$15K',
        location: 'London, United Kingdom',
        description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
]

export function JobBoard() {
    return (
        <div className="mx-auto p-6 flex flex-col items-center">
            <img src={Design} alt="Design" className="w-1/2 h-20" />
            <div className="md:w-10/12 flex justify-between items-center mb-8 gap-5">
                <h2 className="text-xl md:text-3xl font-semibold font-Bai_Jamjuree">
                    Latest <span className="text-green-600">Jobs/Internship</span> Post
                </h2>
                <button className="flex justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700">
                    <span>Explore Now!</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>

            <div className="md:w-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {JOBS.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
        </div>
    )
}

export default JobBoard;

