
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <nav className="flex font-Poppins justify-between items-center w-full h-12 px-10 bg-white bg-opacity-10 backdrop-blur-md shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-semibold tracking-wider">CAREER CLIMB</h1>
      <ul className="flex justify-center items-center space-x-5 mt-0">
        <li className="ml-5 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">Home</li>
        <li className="ml-5 cursor-pointer hover:border-b-2 hover: border-y-zinc-950 hover:font-medium">Jobs/Internship</li>
        <li className="ml-5 cursor-pointer hover:border-b-2 hover: border-y-zinc-950 hover:font-medium">Roadmap</li>
        <li className="ml-5 cursor-pointer hover:border-b-2 hover: border-y-zinc-950 hover:font-medium">Skill Gap Analysis</li>
      </ul>
      <div className="flex justify-center items-center space-x-5">
        <button className="flex justify-center items-center space-x-2  px-3 py-1 bg-black rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black ">
          <text> Log In </text>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <button className="flex justify-center items-center space-x-2  px-3 py-1 bg-black rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black">
          <text> Sign Up </text>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;