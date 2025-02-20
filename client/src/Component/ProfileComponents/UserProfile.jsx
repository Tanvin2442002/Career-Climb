import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPenToSquare, faCloudArrowUp, faEye } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import { supabase } from "../../Auth/SupabaseClient";
import Navbar from "../Navbar";
import Loader from "../../UI/UniversalLoader";
import user from '../../Assets/user.png';
import MCC from '../../Assets/MCC.png';
import EDUCATION from '../../Assets/education.png';

const url = process.env.REACT_APP_API_URL;


const xp = [
  { id: 1, logo: MCC, organization: "MIST Computer Club", position: "Assistant Secretary", startYear: "2024", endYear: "Present" },
  { id: 2, logo: MCC, organization: "MIST Computer Club", position: "Instructor", startYear: "2023", endYear: "Present" },
]


const Myprofile = () => {
  const [pdfPreview, setPdfPreview] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);


  const [profilee, setProfile] = useState({});
  const [userId, setUserId] = useState();
  const [Skills, setSkill] = useState([]);
  //const navigate = useNavigate();

  const [initialProfile, setInitialProfile] = useState(profilee);
  const [popupSkill, setPopupSkill] = useState([]); // Current skills being edited
  const [initialSkills, setInitialSkills] = useState([]); // Stores original skills
  const [educationPopupVisible, setEducationPopupVisible] = useState(false);
  const [educationList, setEducationList] = useState(profilee.Educations || []);
  const [popupEducationList, setPopupEducationList] = useState(profilee.Educations || []);
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    startYear: "",
    endYear: "",
    logo: "",
  });


  const fetchEmployee = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserId(storedUser?.uuid);

    if (!storedUser || !storedUser.uuid) {
      console.error("No employee UUID found in local storage");
      return;
    }

    try {
      const response = await fetch(`${url}/api/employee?id=${storedUser.uuid}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProfile(data[0]);

      // Extract and format education data
      if (data[0]?.education) {
        const formattedEducationList = data[0].education.map((educationString, index) => {
          const educationDetails = educationString.replace(/[()]/g, '').split(',');
          const [institution, degree, startYear, endYear] = educationDetails;

          return {
            id: index, // Assigning an index as an ID (replace with a unique ID if available)
            institution: institution.trim(),
            degree: degree.trim(),
            startYear: startYear.trim(),
            endYear: endYear.trim(),
          };
        });

        setEducationList(formattedEducationList); // Set formatted education list
      } else {
        setEducationList([]); // Set to an empty array if no education data is found
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };


  useEffect(() => {
    const cachedProfile = JSON.parse(localStorage.getItem("employeeProfile"));
    if (cachedProfile) setProfile(cachedProfile);

    fetchEmployee();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const file = document.getElementById('profilePic').files[0] || null;
    const fileName = `${userId}-${Date.now()}`;
    const { data, error } = await supabase.storage.from('profile_picture/Employee').upload(fileName, file);
    if (error) {
      toast.error("Failed to upated info!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const { data: publicUrlData } = supabase.storage.from('profile_picture/Employee').getPublicUrl(fileName);
    const publicUrl = publicUrlData.publicUrl;

    const tempProfile = profilee;
    tempProfile.profile_pic = publicUrl;
    setProfile(tempProfile);

    try {
      const response = await fetch(`${url}/api/employee-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profilee.name,
          phone: profilee.phone_no,
          bio: profilee.bio,
          id: userId,
          profile_pic: publicUrl,
        }),
      });


      if (response.ok) {
        setIsPopupOpen(false);
        toast.success("Profile Updated", {
          style: {
            backgroundColor: "rgb(195, 232, 195, 0.5)", // Sets background to green
            color: "black", // Sets text color to white
            fontWeight: "semibold",
          },
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });// Close the popup
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const openProfilePopup = () => {
    setInitialProfile(profilee);
    setIsPopupOpen(true);
  };

  const handleCancelProfile = () => {
    setProfile(initialProfile); // Restore to initial state
    setIsPopupOpen(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setCvUploading(true);
      const fileName = `${userId}-${Date.now()}`;
      fileName.replaceAll(' ', '_');
      const { data, error } = await supabase.storage.from('cv').upload(fileName, file);
      setCvUploading(false);
      if (error) {
        toast.error("CV upload failed. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('cv')
        .getPublicUrl(fileName);
      const publicUrl = publicUrlData.publicUrl;

      const response = await fetch(`${url}/api/upload-cv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          url: publicUrl,
        }),
      });

      if (response.ok) {
        toast.success("CV uploaded successfully!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("CV upload failed. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Please upload a valid pdf file", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleViewCV = async () => {
    const response = await fetch(`${url}/applicants/cv/${userId}`);
    const data = await response.json();
    if (!response.ok) {
      toast.error("Failed to fetch CV", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }
    if (data) {
      setPdfPreview(data.cv);
      setPopupVisible(true);
    }
    else {
      toast.error("No CV found", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };




  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const openEducationPopup = () => {
    setEducationPopupVisible(true);
    setPopupEducationList([...educationList]); // Initialize popup list with the current main list
  };

  const handleAddToPopupList = () => {
    setPopupEducationList([
      ...popupEducationList,
      { ...newEducation, id: Date.now() },
    ]);
    setNewEducation({
      institution: "",
      degree: "",
      startYear: "",
      endYear: "",
      logo: "",
    });
  };

  const handleRemoveFromPopupList = (id) => {
    setPopupEducationList(popupEducationList.filter((edu) => edu.id !== id));
  };

  const handleEducationSave = async () => {
    try {
      // Step 1: Delete existing education data
      const deleteResponse = await fetch(`${url}/api/delete-education`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId }),
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete previous education data.");
      }

      // Step 2: Sort the new education list by start year
      const sortedList = [...popupEducationList].sort(
        (a, b) => parseInt(b.startYear) - parseInt(a.startYear)
      );


      // Step 3: Update education data with the new list
      const responses = await Promise.all(sortedList.map(async (education) => {
        const response = await fetch(`${url}/api/update-education`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            education: education,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update education");
        }

        return response.json();
      }));

      // Step 4: Show success toast and refresh data
      toast.success("Education updated successfully!", {
        style: { backgroundColor: "rgb(195, 232, 195)", color: "black", fontWeight: "bold" },
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });

      setEducationPopupVisible(false); // Close the popup
      fetchEmployee(); // Fetch updated employee data
    } catch (error) {
      console.error("Error updating education:", error);
      toast.error("Failed to update education.");
    }
  };





  const handleEducationCancel = () => {
    setNewEducation({
      institution: "",
      degree: "",
      startYear: "",
      endYear: "",
      logo: "",
    });
    setEducationPopupVisible(false);
  };

  const [xpPopupVisible, setXpPopupVisible] = useState(false);
  const [xpList, setXpList] = useState(xp);
  const [popupXpList, setPopupXpList] = useState(xp);
  const [newXp, setNewXp] = useState({
    organization: "",
    position: "",
    startYear: "",
    endYear: "",
    description: "",
  });


  const openXpPopup = () => {
    setXpPopupVisible(true);
    setPopupXpList([...xpList]); // Initialize popup list with the current XP list
  };

  const handleAddToPopupXpList = () => {
    setPopupXpList([
      ...popupXpList,
      { ...newXp, id: Date.now() },
    ]);
    setNewXp({
      organization: "",
      position: "",
      startYear: "",
      endYear: "",
      description: "",
    });
  };

  const handleRemoveFromPopupXpList = (id) => {
    setPopupXpList(popupXpList.filter((xp) => xp.id !== id));
  };

  const handleXpSave = () => {
    setXpList([...popupXpList]); // Save the list to the main XP list
    setXpPopupVisible(false);
    toast.success("Changes Saved", {
      style: {
        backgroundColor: "rgb(195, 232, 195)", // Sets background to green
        color: "black", // Sets text color to white
        fontWeight: "semibold",
      },
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleXpCancel = () => {
    setNewXp({
      organization: "",
      position: "",
      startYear: "",
      endYear: "",
      description: "",
    });
    setXpPopupVisible(false);
  };


  const [skills, setSkills] = useState(Skills); // Initial skills list
  const [popupSkillsVisible, setPopupSkillsVisible] = useState(false); // Popup visibility
  const [popupSkills, setPopupSkills] = useState([...Skills]); // Temporary popup skills list
  const [newSkill, setNewSkill] = useState("");
  const [validSkill, setValidSkill] = useState(false);

  const [availableLogos] = useState([
    "11ty", "1password", "3dmax", "42", "actionscript", "ada", "adonisjs", "aftereffects", "aiui", "akka", "algolia", "alpinejs",
    "amazonamplify", "amazonaws", "android", "androidstudio", "angularjs", "ansible", "apache", "apachekafka", "appwrite", "arduino",
    "artstation", "astro", "atom", "azure", "babel", "backbonejs", "bamboo", "bash", "behance", "blender", "bootstrap", "bulma", "bun",
    "c", "canva", "cassandra", "chartjs", "circleci", "clojure", "cloudflare", "cmake", "codecov", "codeigniter", "codepen", "coffeescript",
    "composer", "confluence", "couchdb", "cpp", "csharp", "css3", "cypress", "d3js", "dart", "dbt", "deno", "dependabot", "devdotto",
    "devrant", "discord", "django", "docker", "dotnet", "dropwizard", "drupal", "electron", "elixir", "elm", "embeddedc", "emberjs",
    "envoyproxy", "erlang", "eslint", "expressjs", "figma", "firebase", "flask", "flutter", "fortran", "framer", "fsharp", "gatling",
    "gatsby", "gcc", "gcp", "gimp", "git", "github", "gitlab", "godot", "go", "googlechrome", "googledrive", "googlescholar", "gradle",
    "grafana", "graphql", "groovy", "grunt", "gulp", "handlebars", "haskell", "haxe", "heroku", "helm", "hibernate", "highcharts",
    "homebrew", "html5", "hugo", "ibmcloud", "illustrator", "inkscape", "ionic", "jasmine", "java", "javascript", "jest", "jenkins",
    "jetbrains", "jira", "jooq", "julia", "jupyter", "karma", "kotlin", "kubernetes", "labview", "laravel", "latex", "less", "linkedin",
    "linux", "lua", "magento", "markdown", "materialui", "matlab", "maya", "maven", "mdx", "meteor", "microsoftaccess", "microsoftazure",
    "microsoftexcel", "microsoftoffice", "microsoftpowerpoint", "microsoftsqlserver", "minio", "mocha", "mongodb", "monorepo", "mysql",
    "nestjs", "nextjs", "netlify", "nginx", "nim", "nodejs", "nodered", "npm", "nuxt", "objectivec", "ocaml", "opencv", "openfaas",
    "opengraph", "openscad", "openstack", "opera", "oracle", "pandas", "perl", "photoshop", "php", "pinescript", "platformio", "playwright",
    "plsql", "powershell", "postcss", "postgresql", "postman", "prettier", "prisma", "processing", "prometheus", "protobuf", "pug",
    "puppet", "purescript", "pycharm", "pypi", "python", "pytorch", "qt", "r", "rails", "react", "reactivex", "realm", "reasonml",
    "redis", "redshift", "redux", "renpy", "render", "rhino", "rocket", "rollupjs", "ros", "rust", "safari", "salesforce", "sass",
    "scala", "scikit-learn", "scipy", "scuttlebutt", "selenium", "sequelize", "shell", "sketch", "solidity", "sonarqube", "spring",
    "spss", "sqlite", "storybook", "styledcomponents", "stylus", "svelte", "swift", "symfony", "tailwindcss", "tensorflow", "terraform",
    "testinglibrary", "threejs", "tomcat", "towergit", "travisci", "typescript", "typo3", "ubuntu", "unity", "unrealengine", "vercel",
    "vim", "visualbasic", "visualstudio", "vuejs", "vulkan", "webassembly", "webflow", "webrtc", "webpack", "wechat", "windi", "windows",
    "wix", "wolframlanguage", "wordpress", "wyam", "xamarin", "xd", "xilinx", "xstate", "yarn", "yii", "zig", "zip"
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Filtered suggestions

  const openSkillsPopup = () => {
    setPopupSkillsVisible(true);
    setPopupSkills([...skills]); // Initialize popup with current skills
  };

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill) {
      const currentSkills = profilee.skills || [];
      if (!currentSkills.includes(newSkill)) {
        const updatedSkills = [...currentSkills, newSkill];
        setProfile({ ...profilee, skills: updatedSkills });
      }
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    // Remove skill directly from profilee.skills
    const updatedSkills = profilee.skills.filter(skill => skill !== skillToRemove);
    setProfile({ ...profilee, skills: updatedSkills });  // Update the profilee object
  };


  // Save changes and close popup
  const handleSaveSkills = async () => {
    try {
      // Step 1: Append new skills to the existing ones (from profilee.skills)
      const updatedSkills = [...new Set([...profilee.skills, ...popupSkills.map(skill => skill.logo)])];


      // Step 2: Update the skills in the database
      const updateResponse = await fetch(`${url}/api/update-skills`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // Employer ID
          skills: updatedSkills, // Append new skills to existing ones
        }),
      });
      // eivabe step by step comment likhe ke code kore @ZAIMA
      const updateData = await updateResponse.json();

      if (!updateResponse.ok) {
        throw new Error(updateData.error || "Failed to update skills");
      }
      setPopupSkillsVisible(false);  // Close the popup

      toast.success("Skills updated successfully!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // alert("Skills updated successfully!");
    } catch (error) {
      console.error("Error updating skills:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };



  // Cancel changes and close popup
  const handleCancelSkills = () => {
    setPopupSkills(initialSkills); // Reset to original skills
    setPopupSkillsVisible(false);
  };


  const handleSkillInput = (e) => {
    const input = e.target.value.trim();
    setNewSkill(input);

    // Filter suggestions that match the input and are not already added
    const filtered = availableLogos.filter(
      (logo) =>
        logo.startsWith(input.toLowerCase()) &&
        !popupSkills.some((skill) => skill.logo === logo)
    );
    setFilteredSuggestions(filtered);

    setValidSkill(filtered.includes(input));
  };

  // Select a suggestion
  const handleSelectSuggestion = (logo) => {
    setNewSkill(logo); // Set the input to the selected suggestion
    setValidSkill(true);
    setFilteredSuggestions([]); // Clear suggestions
  };

  const isAddButtonEnabled = () => {
    const { institution, degree, startYear, endYear } = newEducation;

    return (
      institution.trim().replace("",) !== "" &&
      degree.trim() !== "" &&
      startYear.trim() !== "" &&
      endYear.trim() !== ""
    );
  };



  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <div className="flex flex-col font-Poppins bg-background">
      <Navbar />
      <Toaster />
      <div className={`flex flex-col lg:flex-row w-full p-5`}>
        <div className="flex flex-col w-full lg:w-2/3 mr-5 gap-5">
          {/* Education Section */}
          <motion.section className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'backInOut' }}
          >
            <h3 className="text-xl font-semibold mx-3">Education</h3>
            <div className="rounded-xl p-3">
              {profilee.education && profilee.education.length > 0 ? (
                profilee.education.map((educationString, index) => {
                  // Parse the education string into an array
                  const educationDetails = educationString
                    .replace(/[()]/g, '') // Remove parentheses
                    .split(','); // Split by commas

                  const [institution, degree, startYear, endYear] = educationDetails;

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.15, ease: 'backInOut' }}
                      key={index}
                      className="education-item-container flex items-center bg-gray-100 border-2 border-gray-300 rounded-lg p-3 mb-4"
                    >
                      <div className="education-item flex items-center gap-4">
                        {/* Assuming a default logo since logo data isn't provided */}
                        <img
                          src={EDUCATION}
                          alt="Logo"
                          className="education-logo w-12 h-12"
                        />
                        <div className="education-details flex-1">
                          <h3 className="font-semibold text-lg">{institution}</h3>
                          <p>{degree}</p>
                          <p>
                            {startYear}–{endYear}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">No education data available</p>
              )}
            </div>
            <div
              onClick={openEducationPopup}
              className="mx-3 bg-green hover:bg-green-700 text-white rounded-md text-lg cursor-pointer w-28"
            >
              <FontAwesomeIcon icon={faPlus} className="ml-2" />
              <button className="p-1 text-white rounded-md text-base">
                Add More
              </button>
            </div>
          </motion.section>


          {/* Skills Section */}
          <motion.section
            className="mt-0"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'backInOut' }}
          >
            <h3 className="text-xl flex flex-row font-semibold mx-4">Skills</h3>
            <div className="flex flex-row flex-wrap justify-start items-center mx-3 p-4 mb-4 rounded-xl gap-0 border-2 border-gray-300 bg-green-opacity-10">
              {profilee.skills && profilee.skills.length > 0 ? (
                profilee.skills.map((skill, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.05, ease: 'backInOut' }}
                    key={index}  // Use index or a unique identifier
                    className="flex items-center p-2 rounded-xl border-green-opacity-30"
                  >
                    <img
                      src={`https://skillicons.dev/icons?i=${skill}`}
                      alt="Skill Logo"
                      className="skill-logo w-16 h-16"
                    />
                  </motion.div>
                ))
              ) : (
                <div>No skills to display</div> // Fallback if no skills exist
              )}
            </div>

            <div
              className="mx-3 bg-green hover:bg-green-700 text-white rounded-md text-lg cursor-pointer w-28"
              onClick={openSkillsPopup}
            >
              <FontAwesomeIcon icon={faPlus} className="ml-2" />
              <button className="p-1 text-white rounded-md text-base">
                Add More
              </button>
            </div>
          </motion.section>

          {/* Past Experience Section */}
          <motion.section
            className="experience mt-0"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'backInOut' }}
          >
            <h3 className="text-xl font-semibold mx-4">Past Experience</h3>
            <div className="rounded-xl p-3">
              {xpList.map((xp, index) => (
                <motion.div

                  className="experience-item-container flex items-center bg-gray-100 border-2 border-gray-300 rounded-lg p-3 mb-4"
                  initial={{ opacity: 0, x: -100 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'backInOut' }}
                  ref={ref}
                >
                  <div className="experience-item flex items-center gap-4">
                    <img src={MCC} alt="Logo"

                      className="experience-logo w-12 h-12"
                    />
                    <div className="experience-details flex-1">
                      <h3 className="font-semibold text-lg">{xp.organization}</h3>
                      <p>{xp.position}</p>
                      <p>{xp.startYear}-{xp.endYear}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              onClick={openXpPopup}
              className="mx-3 bg-green hover:bg-green-700 text-white rounded-md text-lg cursor-pointer w-28"
            >
              <FontAwesomeIcon icon={faPlus} className="ml-2" />
              <button className="p-1 text-white rounded-md text-base">
                Add More
              </button>
            </div>
          </motion.section>
        </div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'backInOut' }}
          className="order-first lg:order-none lg:w-1/3 lg:sticky lg:top-24 z-10 p-5 bg-green-50 rounded-xl shadow-lg h-auto md:h-[85vh] box-border"
        >
          <div className="profile-info text-center flex flex-col items-center justify-center">
            <img src={profilee.profile_pic ? profilee.profile_pic : user} alt="Profile" className="profile-picture w-24 h-24 rounded-full mb-2" />
            <h3 className="font-bold font-Bai_Jamjuree text-2xl">{profilee.name}</h3>
            <p>{profilee.email}</p>
            <p>📞 {profilee.phone_no}</p>
          </div>
          <div className="bio mt-2">
            <h3 className="text-lg font-semibold mb-2">BIO</h3>
            <textarea
              className="bio-textarea w-full h-32 border-0 rounded-md p-2 bg-gray-50"
              readOnly
              value={profilee.bio}
            ></textarea>
          </div>
          {/* CV Upload and View */}
          <div className="flex flex-col gap-0 mt-6">
            <div className="flex flex-row justify-evenly items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="md:m-3 mr-2 md:w-48 w-52 min-h-10 flex justify-center bg-gray-300 hover:shadow-lg items-center rounded-md text-lg cursor-pointer relative">
                {cvUploading && (
                  <div className="h-6 -mt-3">
                    <Loader />
                  </div>
                )}
                {!cvUploading && (
                  <>
                    <FontAwesomeIcon icon={faCloudArrowUp} className="ml-2" />
                    <input
                      type="file"
                      id="cvUpload"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      className="border-2 h-7 border-dashedrounded-md px-2 w-[200px] absolute top-0 left-0 opacity-0"
                    />
                    <span className="px-2 rounded-md text-base ">
                      Upload your CV
                    </span>
                  </>
                )}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={handleViewCV}
                className="md:m-3 bg-gray-300 hover:shadow-lg rounded-md text-lg cursor-pointer w-48 min-h-10 flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faEye} />
                <span className=" rounded-md text-base p-2">
                  View your CV
                </span>
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="md:mx-4 mt-2 bg-gray-300 hover:shadow-lg  rounded-md text-lg cursor-pointer min-h-10 flex justify-center items-center"
              onClick={openProfilePopup}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <span className=" rounded-md text-base p-2"
              >
                Edit Profile
              </span>
            </motion.div>

          </div>
        </motion.div >

        {popupVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div className="relative w-full h-full p-4 flex items-center justify-center">
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-12 text-red-600 text-xl font-bold hover:text-red-700"
                title="Close"
              >
                ✖
              </button>
              <div className="absolute top-4 right-4 text-gray-600">
                <span className="cursor-pointer">⋮</span>
              </div>
              <iframe
                src={pdfPreview}
                className="w-[90%] h-[90%] rounded-lg shadow-xl bg-white"
                title="CV Preview"
              ></iframe>
            </div>
          </div>
        )}

        {/* Profile Edit Popup */}
        <AnimatePresence>
          {isPopupOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'backInOut' }}
              exit={{ opacity: 0, y: 100, transition: { ease: 'anticipate', duration: 0.6 } }}
              className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm"
            >
              <div className="popup-content bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative z-60">
                <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

                <form className="flex flex-col justify-center items-center">
                  <div className="mb-4 w-full flex justify-center items-center">
                    <input type="file" id="profilePic" accept="image/*"  hidden />
                    <label

                      htmlFor="profilePic"
                      className=" text-sm text-center flex-col items-center justify-center font-medium mb-1 cursor-pointer"
                    >
                      <img src={profilee.profile_pic ? profilee.profile_pic : user} htmlFor="profilePic" alt="Profile" className="w-24 h-24 items-center rounded-full mb-2 border-2 cursor-pointer" />
                    </label>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={profilee.name}
                      onChange={(e) => setProfile({ ...profilee, name: e.target.value })}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="text"
                      value={profilee.phone_no}
                      onChange={(e) => setProfile({ ...profilee, phone_no: e.target.value })}
                      className="w-full border rounded-md p-2"
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      value={profilee.bio}
                      onChange={(e) => setProfile({ ...profilee, bio: e.target.value })}
                      className="w-full border rounded-md p-2"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      type="button"
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
                    >
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      type="button"
                      onClick={handleCancelProfile}
                      className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div >

      {/* Education Popup */}
      <AnimatePresence AnimatePresence >
        {educationPopupVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "backInOut" }}
            exit={{ opacity: 0, y: 100, transition: { ease: "anticipate", duration: 0.6 } }}
            className="popup fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="popup-content bg-white py-3 px-6 rounded-lg shadow-lg w-11/12 max-w-2xl relative z-60 overflow-y-auto">
              <h3 className="text-lg font-bold underline text-center uppercase font-Bai_Jamjuree mb-4">
                Edit Education
              </h3>

              {/* Existing Education List with Delete */}
              <div className="mb-4 border-b-2 border-b-gray-700 pb-2">
                <h4 className="font-semibold mb-2">Existing Institutions</h4>
                <div className="education-list-container max-h-44 overflow-y-scroll">
                  {popupEducationList.map((education) => (
                    <div
                      key={education.id}
                      className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded-md"
                    >
                      <div>
                        <h5 className="font-semibold">{education.institution}</h5>
                        <p>{education.degree}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromPopupList(education.id)}
                        className="bg-red-500 text-white p-1 rounded-md hover:bg-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Education Form */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Add New Education</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Institution</label>
                  <input
                    type="text"
                    value={newEducation.institution}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, institution: e.target.value })
                    }
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Degree</label>
                  <input
                    type="text"
                    value={newEducation.degree}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, degree: e.target.value })
                    }
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div className="mb-4 flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Start Year</label>
                    <input
                      type="text"
                      value={newEducation.startYear}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, startYear: e.target.value })
                      }
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">End Year</label>
                    <input
                      type="text"
                      value={newEducation.endYear}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, endYear: e.target.value })
                      }
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                </div>

                {/* Add Education Button */}
                <motion.button
                  whileHover={isAddButtonEnabled() ? { scale: 1.025 } : {}}
                  onClick={handleAddToPopupList}
                  disabled={!isAddButtonEnabled()}
                  className={`${isAddButtonEnabled() ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400"
                    } text-white p-2 rounded-md w-full mb-2`}
                >
                  Add Education
                </motion.button>

                {/* Save and Cancel Buttons */}
                <div className="flex justify-between gap-2">
                  <motion.button
                    whileHover={{ scale: 1.025 }}
                    onClick={handleEducationSave}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 w-1/2"
                  >
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.025 }}
                    onClick={handleEducationCancel}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 w-1/2"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >


      {/* XP Popup */}
      <AnimatePresence AnimatePresence >
        {xpPopupVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'backInOut' }}
            exit={{ opacity: 0, y: 100, transition: { ease: 'anticipate', duration: 0.6 } }}
            className="popup fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="popup-content bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative z-60 overflow-y-auto">
              <h3 className="text-lg text-center uppercase font-Bai_Jamjuree font-bold mb-4">Add More Experience</h3>

              {/* Existing Experience List with Delete */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Existing Experiences</h4>
                <div className="xp-list overflow-y-auto max-h-32" style={{ maxHeight: "200px" }}>
                  {popupXpList.map((xp) => (
                    <div key={xp.id} className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded-md">
                      <div>
                        <h5 className="font-semibold">{xp.organization}</h5>
                        <p>{xp.position}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromPopupXpList(xp.id)}
                        className="bg-red-500 text-white p-1 rounded-md hover:bg-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Experience Form */}
              <div className="mb-2">
                <h4 className="font-semibold mb-2">Add New Experience</h4>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Organization</label>
                  <input
                    type="text"
                    value={newXp.organization}
                    onChange={(e) =>
                      setNewXp({ ...newXp, organization: e.target.value })
                    }
                    className="w-full border rounded-md h-8 p-2"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <input
                    type="text"
                    value={newXp.position}
                    onChange={(e) =>
                      setNewXp({ ...newXp, position: e.target.value })
                    }
                    className="w-full border rounded-md p-2 h-8"
                  />
                </div>
                <div className="mb-2 flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Start Year</label>
                    <input
                      type="text"
                      value={newXp.startYear}
                      onChange={(e) =>
                        setNewXp({ ...newXp, startYear: e.target.value })
                      }
                      className="w-full border rounded-md p-2 h-8"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">End Year</label>
                    <input
                      type="text"
                      value={newXp.endYear}
                      onChange={(e) =>
                        setNewXp({ ...newXp, endYear: e.target.value })
                      }
                      className="w-full border rounded-md p-2 h-8"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newXp.description}
                    onChange={(e) =>
                      setNewXp({ ...newXp, description: e.target.value })
                    }
                    className="w-full border rounded-md h-12 p-2"
                  />
                </div>

                {/* Add Experience Button */}
                <motion.button
                  whileHover={{ scale: 1.025 }}
                  onClick={handleAddToPopupXpList}
                  disabled={
                    !newXp.organization ||
                    !newXp.position ||
                    !newXp.startYear ||
                    !newXp.endYear
                  }
                  className={`${!newXp.organization ||
                    !newXp.position ||
                    !newXp.startYear ||
                    !newXp.endYear
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-700'
                    } text-white h-8 rounded-md w-full mb-2`}
                >
                  Add Experience
                </motion.button>

                <div className="flex justify-between gap-2">
                  <motion.button
                    whileHover={{ scale: 1.025 }}
                    onClick={handleXpSave}
                    className="bg-green-500 text-white h-8 rounded-md hover:bg-green-700 w-1/2"
                  >
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.025 }}
                    onClick={handleXpCancel}
                    className="bg-red-500 text-white h-8 rounded-md hover:bg-red-700 w-1/2"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >


      {/* Skills Popup */}
      <AnimatePresence AnimatePresence >
        {popupSkillsVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'backInOut' }}
            exit={{ opacity: 0, y: 100, transition: { ease: 'anticipate', duration: 0.6 } }}
            className="popup fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="popup-content bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative z-60 overflow-y-auto">
              <h3 className="text-lg font-bold text-center font-Bai_Jamjuree uppercase mb-4">Add More Skills</h3>

              {/* Existing Skills with Delete */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Existing Skills</h4>
                <div className="skills-list overflow-y-auto max-h-40" style={{ maxHeight: "200px" }}>
                  {profilee.skills && profilee.skills.length > 0 ? (
                    profilee.skills.map((skill, index) => (
                      <div
                        key={index}  // You can use skill.id if it's available for a unique identifier
                        className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://skillicons.dev/icons?i=${skill}`}
                            alt={skill}
                            className="w-10 h-10"
                          />
                          <span>{skill}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveSkill(skill)}  // Pass skill itself if needed
                          className="bg-red-500 text-white p-1 rounded-md hover:bg-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div>No skills to display</div> // Fallback if no skills exist
                  )}
                </div>

              </div>

              {/* Add New Skill with Suggestions */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Add New Skill</h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter skill logo name"
                    value={newSkill}
                    onChange={handleSkillInput} // Updates suggestions dynamically
                    className="w-full border rounded-md p-2 mb-2"
                  />
                  {/* Suggestions Dropdown */}
                  {filteredSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded-md w-full shadow-lg">
                      {filteredSuggestions.map((logo) => (
                        <li
                          key={logo}
                          onClick={() => handleSelectSuggestion(logo)} // Fills input with selected logo
                          className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                          {logo}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={handleAddSkill} // Adds new skill to the list
                  className={`p-2 rounded-md w-full ${validSkill ? "bg-blue-500 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  disabled={!validSkill} // Disable button unless skill is valid
                >
                  Add Skill
                </button>
              </div>

              {/* Save and Cancel Buttons */}
              <div className="flex justify-between gap-2">
                <button
                  onClick={handleSaveSkills} // Save changes to main list
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 w-1/2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelSkills} // Cancel and close popup
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 w-1/2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >



    </div >
  );
};

export default Myprofile;
