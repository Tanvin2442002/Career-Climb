import Navbar from "../Navbar";
import Hero from "./Hero";
import Services from './Services';
import Career from "./Career";
import Footer from "./Footer";
import JobBoard from "./JobBoard";
import Application from "./Application";

const Landing = () => {

    return (
        <div>
            <Navbar />
            <Hero />
            <Services />
            <Career />
            <JobBoard />
            <Application />
            <Footer />
        </div>
    );
}


export default Landing;