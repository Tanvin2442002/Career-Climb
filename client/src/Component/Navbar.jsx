

const Navbar = () => {
    return (
        <nav className="flex font-Poppins justify-between items-center w-auto h-10 ml-10 mr-10">
            <h1 className="text-xl font-semibold tracking-widest">CAREER CLIMB</h1>
            <ul className="flex justify-center items-center space-x-5 mt-2">
                <li className="ml-5 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">Home</li>
                <li className="ml-5 cursor-pointer hover:border-b-2 hover: border-y-zinc-950 hover:font-medium">Jobs/Internship</li>
                <li className="ml-5 cursor-pointer hover:border-b-2 hover: border-y-zinc-950 hover:font-medium">Roadmap</li>
                <li className="ml-5 cursor-pointer hover:border-b-2 hover: border-y-zinc-950 hover:font-medium">Skill Gap Analysis</li>
            </ul>
            <div className="flex justify-center items-center space-x-5">
                <button className="relative font-Poppins z-10 px-3 h-auto py-1 bg-black rounded-md font-normal text-l text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black">
                    Log In
                </button>
                <button className="relative font-Poppins z-10 px-3 h-auto py-1 bg-black rounded-md font-normal text-l text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black">
                    Sign Up
                </button>
            </div>
        </nav>
    );
}

export default Navbar;