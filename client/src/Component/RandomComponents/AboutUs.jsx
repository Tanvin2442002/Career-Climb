import Navbar from "../Navbar";
import Skill from "../../Assets/skill.jpg"
import Hasnat from "../../Assets/Hasnat.jpg"
import Zaima from "../../Assets/zaima.jpg"

const AboutUs = () => { 

    const DevelopersInfo = [
        {
            image: Hasnat,
            name: "Yusuf Reza Hasnat",
            role: ["Team Lead","Frontend Developer", "Backend Developer"],
            linkedin: "https://www.linkedin.com/in/yusufrezahasnat",
            github: "https://github.com/hasnat0006",
            mail: "yusufrezahasant0006@gmail.com"
        },
        {
            image: Zaima,
            name: "Zaima Ahmed",
            role: ["Frontend Developer", "Backend Developer"],
            linkedin: "https://www.linkedin.com/in/yusufrezahasnat",
            github: "https://github.com/zaaaiiimaaa",
            mail: "yusufrezahasant0006@gmail.com"
        },
        {
            image: Hasnat,
            name: "Tanvir Sarkar Pallob",
            role: ["Frontend Developer", "Backend Developer"],
            linkedin: "https://www.linkedin.com/in/yusufrezahasnat",
            github: "https://github.com/Tanvin2442002",
            mail: "yusufrezahasant0006@gmail.com"
        },
        {
            image: Hasnat,
            name: "Nazifa Zahin Ifrit",
            role: ["Frontend Developer", "Backend Developer"],
            linkedin: "https://www.linkedin.com/in/yusufrezahasnat",
            github: "https://github.com/hasnat0006",
            mail: "yusufrezahasant0006@gmail.com"
        },
        {
            image: Hasnat,
            name: "Nabiha Parvez",
            role: ["Frontend Developer", "Backend Developer"],
            linkedin: "https://www.linkedin.com/in/yusufrezahasnat",
            github: "https://github.com/hasnat0006",
            mail: "yusufrezahasant0006@gmail.com"
        },
    ]

    const Images = [
        Hasnat,
        Skill,
        "../Assets/Hasnat.jpg",
    ]

    return (
        <div>
            <Navbar />
            <div>
                <div className="md:flex justify-between items-center py-5 px-10 ">
                    <div className="-my-10 ">
                        <p className="text-md font-md text-start p-4 ">
                            Finding the right job or internship can often feel like navigating a maze without a map. For many young professionals and students, the challenges include job-skill mismatches, a lack of personalized career guidance, and generic job suggestions that fail to align with their aspirations. This leads to wasted time, frustration, and missed opportunities.
                        </p>
                        <p className="text-md font-md text-start p-4">
                            Our mission is to provide a comprehensive and user-friendly platform that caters to the diverse needs of job seekers and employers alike. We believe that everyone deserves the opportunity to find a fulfilling career that matches their skills and passions. By offering personalized recommendations and actionable insights, we aim to make the job search process more efficient and less stressful.
                        </p>
                        <p className="text-md font-md text-start p-4">
                            At Career Climb, we understand these struggles and are committed to transforming the job search experience. By leveraging cutting-edge AI technology, we bridge the gap between skills and opportunities. Our platform empowers users to:
                        </p>
                    </div>
                    <img src = {Skill} alt="aboutus" className="object-cover h-96 rounded-3xl p-5" />
                    
                </div>
                <div className="px-10 -mt-10">
                    <p className="text-md font-md text-start p-4">
                        <ul className="list-disc pl-8">
                            <li>Receive tailored job and internship recommendations based on their unique skills and interests.</li>
                            <li>Access a wealth of resources, including resume-building tools, interview preparation guides, and career advice articles.</li>
                            <li>Connect with mentors and industry professionals for personalized guidance and support.</li>
                            <li>Stay updated with the latest job market trends and insights to make informed career decisions.</li>
                        </ul>
                    </p>
                    <p className="text-md font-md text-start p-4">
                        We don’t stop there. With features like real-time application tracking, verified company reviews, and performance feedback, we ensure that every step of the journey is transparent, efficient, and empowering.
                        Whether you’re a recent graduate seeking your first role, a professional looking to transition careers, or an employer aiming to connect with top talent, Career Climb is here to make your journey seamless and rewarding. Together, we’re building a future where every individual can climb higher and achieve their career aspirations with confidence.
                    </p>
                </div>
            </div>
            <div className="flex-col w-full justify-center items-center">
                <h1 className="text-4xl font-bold uppercase text-green font-Bai_Jamjuree underline-offset-2 underline text-center p-10">
                    Meet our developers
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap items-center justify-center">
                    {DevelopersInfo.map((developer) => (
                        <div className="relative flex-col justify-items-center p-2 items-center shadow-gray-400 shadow-lg rounded-lg m-2 bg-[#bfd4e074]">
                            <img src={developer.image} alt="developer" className="items-center h-36 rounded-full" />
                            <div className="w-full">
                                <h1 className="text-xl font-semibold underline-offset-4 font-Poppins uppercase tracking-wide text-center mt-5">{developer.name}</h1>
                                <ul className="text-md font-md text-center p-1 text-wrap mb-6">{developer.role.map((role) => (
                                    <li className="border-2 rounded-lg m-2 bg-gray-200 hover:bg-gray-300 border-gray-400">{role}</li>
                                ))}
                                </ul>
                            </div>
                            <div className="flex justify-evenly gap-2 absolute bottom-0 p-2">
                                <a href={"mailto:" + developer.mail} target="_blank" rel="noreferrer" 
                                    className="text-center hover:scale-110 rounded-md transform transition duration-300 ease-in-out "
                                
                                >
                                    <img src="https://img.shields.io/badge/Gmail-FF5722?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail badge"
                                        className="rounded-sm shadow-lg shadow-gray-300"
                                    />
                                </a>
                                <a href={developer.linkedin} target="_blank" rel="noreferrer"
                                    className="text-center hover:scale-110 rounded-md transform transition duration-300 ease-in-out"
                                >
                                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=blue" alt="LinkedIn badge" className="rounded-sm" />
                                </a>
                                <a href={developer.github} target="_blank" rel="noreferrer"
                                    className="text-center hover:scale-110 rounded-md transform transition duration-300 ease-in-out"
                                >
                                    <img src="https://img.shields.io/badge/Github-333333?style=for-the-badge&logo=github&logoColor=white" alt="Github badge" className="rounded-sm" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutUs;