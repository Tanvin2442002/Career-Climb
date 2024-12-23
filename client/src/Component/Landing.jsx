

import Navbar from "./Navbar";

const Landing = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center items-center tracking-wider mt-20 gap-2">
                <p className="text-3xl text-center font-Poppins font-normal ">Achieve your dream Career with</p>
                <p className="text-center text-4xl font-Poppins font-semibold tracking-wider text-CG">CAREER CLIMB</p>
                <p className="text-center text-lg font-Poppins font-normal tracking-normal">Your career is your responsibility. Take charge of it with clarity and purpose.</p>
            </div>
        </div>
    );
}


export default Landing;