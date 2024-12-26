

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faRoute, faMagnifyingGlassChart, faMagnifyingGlassPlus} from '@fortawesome/free-solid-svg-icons'
import Kite from '../../Assets/Kite.svg';


const Services = () => {

    const Services = [
        {
            id: 1,
            title: 'Roadmap',
            description: 'Visualize your career journey with detailed role progressions and skill requirements.',
            icon: faRoute
        },
        {
            id: 2,
            title: 'Skill Gap Analysis',
            description: 'Identify missing skills and receive actionable recommendations to improve.',
            icon: faMagnifyingGlassChart
        },
        {
            id: 3,
            title: 'Job/Inter. offer',
            description: 'Explore tailored job and internship opportunities to grow your career.',
            icon: faMagnifyingGlassPlus
        },
        {
            id: 4,
            title: 'Hiring',
            description: 'Discover qualified candidates with the right skills for your team’s success.',
            icon: faMagnifyingGlassChart
        }
    ];


    return (
        <div>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-semibold text-center font-Bai Jamjuree mt-10">Our Services</h1>
                <div className="grid grid-cols-2 xl:grid-cols-4 xl:w-5/6 gap-4 p-5">
                    {Services.map(service => (
                        <div key={service.id} className="flex flex-col w-full justify-between items-center gap-3 p-5 bg-green-opacity-10 shadow-greenish rounded-lg">
                            <FontAwesomeIcon icon={service.icon} alt={service.title} className="h-10 w-10 top-0 text-green-opacity-80" />
                            <h2 className="text-xl font-semibold w-full text-green-700 text-center border-t-2 border-green-opacity-50">{service.title}</h2>
                            <p className="text-sm text-center">{service.description}</p>
                            <button className="flex justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700">
                                <span>Explore Now!</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <img src={Kite} alt="Kite" className="absolute rotate--180 w-20 right-1/4 md:w-1/8" />
        </div>
    );
}

export default Services;