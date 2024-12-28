import React, { useState } from 'react';
import Navbar from '../Navbar';
import Light from '../../Assets/Light.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Graph from './Graph';



const markdownData = `
graph TB
    A[CS Fresher] --> B{Explore Core Concepts}
    style A fill:#c6f7c6,stroke:#333,stroke-width:2px
    style B fill:#baf0ba,stroke:#333,stroke-width:2px

    B --> C[Choose Focus Area]
    style C fill:#b3e9b3,stroke:#333,stroke-width:3px

    C --> D[Software Engineering Path]
    style D fill:#a7e2a7,stroke:#333,stroke-width:2px
    C --> E[Data Science/ML Path]
    style E fill:#a7e2a7,stroke:#333,stroke-width:2px
    C --> F[Cybersecurity Path]
    style F fill:#a7e2a7,stroke:#333,stroke-width:2px
    C --> G[Game Development Path]
    style G fill:#a7e2a7,stroke:#333,stroke-width:2px
    C --> H[Web Development Path]
    style H fill:#a7e2a7,stroke:#333,stroke-width:2px
    C --> I[Networking/Systems Path]
    style I fill:#a7e2a7,stroke:#333,stroke-width:2px
    C --> J[Theory/Research Path]
    style J fill:#a7e2a7,stroke:#333,stroke-width:2px


    D --> D1[SWE Intern/Projects]
    style D1 fill:#9be09b,stroke:#333,stroke-width:2px
    D1 --> D2[Entry-Level SWE]
    style D2 fill:#94d994,stroke:#333,stroke-width:2px
    D2 --> D3[Mid-Level SWE]
    style D3 fill:#8cd18c,stroke:#333,stroke-width:2px
    D3 --> D4[Senior SWE]
     style D4 fill:#82ca82,stroke:#333,stroke-width:2px
    D4 --> D5[SWE Architect/Manager]
     style D5 fill:#7bc27b,stroke:#333,stroke-width:2px

    E --> E1[DS/ML Intern/Projects]
    style E1 fill:#9be09b,stroke:#333,stroke-width:2px
    E1 --> E2[Entry-Level Data Analyst/Scientist]
    style E2 fill:#94d994,stroke:#333,stroke-width:2px
     E2 --> E3[Mid-Level Data Analyst/Scientist]
     style E3 fill:#8cd18c,stroke:#333,stroke-width:2px
    E3 --> E4[Senior Data Analyst/Scientist]
     style E4 fill:#82ca82,stroke:#333,stroke-width:2px
    E4 --> E5[Data Science Architect/Manager]
     style E5 fill:#7bc27b,stroke:#333,stroke-width:2px


    F --> F1[Security Intern/Projects]
     style F1 fill:#9be09b,stroke:#333,stroke-width:2px
    F1 --> F2[Entry-Level Security Analyst]
    style F2 fill:#94d994,stroke:#333,stroke-width:2px
    F2 --> F3[Mid-Level Security Analyst]
    style F3 fill:#8cd18c,stroke:#333,stroke-width:2px
    F3 --> F4[Senior Security Analyst]
     style F4 fill:#82ca82,stroke:#333,stroke-width:2px
    F4 --> F5[Security Architect/Manager]
    style F5 fill:#7bc27b,stroke:#333,stroke-width:2px

    G --> G1[Game Dev Intern/Projects]
     style G1 fill:#9be09b,stroke:#333,stroke-width:2px
    G1 --> G2[Entry-Level Game Dev]
    style G2 fill:#94d994,stroke:#333,stroke-width:2px
     G2 --> G3[Mid-Level Game Dev]
    style G3 fill:#8cd18c,stroke:#333,stroke-width:2px
    G3 --> G4[Senior Game Dev]
    style G4 fill:#82ca82,stroke:#333,stroke-width:2px
     G4 --> G5[Game Dev Architect/Manager]
      style G5 fill:#7bc27b,stroke:#333,stroke-width:2px

    H --> H1[Web Dev Intern/Projects]
    style H1 fill:#9be09b,stroke:#333,stroke-width:2px
    H1 --> H2[Entry-Level Web Dev]
    style H2 fill:#94d994,stroke:#333,stroke-width:2px
    H2 --> H3[Mid-Level Web Dev]
    style H3 fill:#8cd18c,stroke:#333,stroke-width:2px
    H3 --> H4[Senior Web Dev]
     style H4 fill:#82ca82,stroke:#333,stroke-width:2px
    H4 --> H5[Web Dev Architect/Manager]
     style H5 fill:#7bc27b,stroke:#333,stroke-width:2px

    I --> I1[Networking Intern/Projects]
    style I1 fill:#9be09b,stroke:#333,stroke-width:2px
    I1 --> I2[Entry-Level Network/System Admin]
    style I2 fill:#94d994,stroke:#333,stroke-width:2px
     I2 --> I3[Mid-Level Network/System Admin]
    style I3 fill:#8cd18c,stroke:#333,stroke-width:2px
    I3 --> I4[Senior Network/System Admin]
    style I4 fill:#82ca82,stroke:#333,stroke-width:2px
    I4 --> I5[Networking Architect/Manager]
    style I5 fill:#7bc27b,stroke:#333,stroke-width:2px


    J --> J1[Graduate Studies]
     style J1 fill:#9be09b,stroke:#333,stroke-width:2px
    J1 --> J2[Post-Doc Research]
    style J2 fill:#94d994,stroke:#333,stroke-width:2px
    J2 --> J3[Professor/Industry Researcher]
    style J3 fill:#8cd18c,stroke:#333,stroke-width:2px
`;

const markdownSpecifiedData = `
graph TB
    subgraph Career_RoadMap [Fresher to Senior SWE]
      direction TB
        style Career_RoadMap fill:#f8f8ff,stroke:#333,stroke-width:1px;
    Start[Fresher] --> |1-2 Months, Basic Skills| Junior_SWE[Junior Software Engineer]
        Junior_SWE --> |2-3 Years, Dev Growth| Mid_SWE[Mid-Level SWE]
    Junior_SWE --> |1-2 Years, Focused Area| Specialist_SWE[Specialist SWE]
     Mid_SWE --> |3-5 Years, Leadership Focus| Senior_SWE[Senior Software Engineer]
       Mid_SWE --> |2-3 Years, Tech Focus| Architect_SWE[Software Architect]
       Specialist_SWE --> |2-3 Years, Expertise| Expert_SWE[Expert SWE]
       Senior_SWE --> |2-4 Years, Team Lead| Tech_Lead[Tech Lead]
        Senior_SWE -->|3-4 Years, Management| SWE_Managerial[SWE Management Path]
        Expert_SWE --> |2-3 Years, Strategy| Principal_SWE[Principal SWE]
        Architect_SWE --> |2-4 Years, Vision| Principal_Architect[Principal Architect]
      SWE_Managerial --> |1-2 Years, People Skills| Engineering_Manager[Engineering Manager]
        Tech_Lead --> |1-3 Years, Leadership| Engineering_Manager
      Principal_SWE -->|1-2 Years, High Level| Engineering_Manager
        Principal_Architect --> |1-2 Years, Solutions| Engineering_Manager
       style Start fill:#add8e6,stroke:#333,stroke-width:2px
       style Junior_SWE fill:#90ee90,stroke:#333,stroke-width:2px
        style Mid_SWE fill:#ffff00,stroke:#333,stroke-width:2px
        style Specialist_SWE fill:#a020f0,stroke:#333,stroke-width:2px
       style Expert_SWE fill:#800080,stroke:#333,stroke-width:2px
       style Architect_SWE fill:#008080,stroke:#333,stroke-width:2px
        style Principal_SWE fill:#000080,stroke:#333,stroke-width:2px
        style Principal_Architect fill:#00ffff,stroke:#333,stroke-width:2px
        style Senior_SWE fill:#ffa500,stroke:#333,stroke-width:2px
        style Tech_Lead fill:#ff7f50,stroke:#333,stroke-width:2px
        style SWE_Managerial fill:#d2691e,stroke:#333,stroke-width:2px
        style Engineering_Manager fill:#ff0000,stroke:#333,stroke-width:2px
        linkStyle 0,1,2,3,4,5,6,7,8,9,10,11,12,13 stroke:#333,stroke-width:1px;
    end
   %% --- Skills Sections ---
    subgraph Skills_Start [Fresher Skills]
        direction LR
        style Skills_Start fill:#f0f0f0,stroke:#333,stroke-width:1px;
        a1["Coding Basics"]
        a2["Data Structures"]
        a3["Algorithms"]
        a4["Learning Speed"]
        a5["SDLC Knowledge"]
        a6["Version Control"]
    end
    Start --> Skills_Start
    subgraph Skills_Junior_SWE [Junior SWE Skills]
        direction LR
        style Skills_Junior_SWE fill:#f0f0f0,stroke:#333,stroke-width:1px;
        b1["Language Skills"]
        b2["Design Knowledge"]
        b3["Clean Code"]
        b4["Debugging Skills"]
        b5["Team Work"]
        b6["Feature Ownership"]
        b7["Code Reviews"]
    end
    Junior_SWE --> Skills_Junior_SWE
   subgraph Skills_Mid_SWE [Mid-Level SWE Skills]
        direction LR
       style Skills_Mid_SWE fill:#f0f0f0,stroke:#333,stroke-width:1px;
        c1["Tech Expertise"]
        c2["Complex Features"]
        c3["Discussions"]
        c4["Mentoring"]
        c5["Project Ownership"]
        c6["Problem Solving"]
        c7["Business Sense"]
    end
    Mid_SWE--> Skills_Mid_SWE
    subgraph Skills_Specialist_SWE [Specialist SWE Skills]
        direction LR
        style Skills_Specialist_SWE fill:#f0f0f0,stroke:#333,stroke-width:1px;
        j1["Specialized Skills"]
        j2["Focused Development"]
        j3["Industry Focus"]
        j4["Research"]
    end
    Specialist_SWE--> Skills_Specialist_SWE
   subgraph Skills_Expert_SWE [Expert SWE Skills]
        direction LR
       style Skills_Expert_SWE fill:#f0f0f0,stroke:#333,stroke-width:1px;
        k1["Expert Skills"]
        k2["System Knowledge"]
        k3["Tech Research"]
        k4["Problem Solving"]
    end
    Expert_SWE--> Skills_Expert_SWE
   subgraph Skills_Architect_SWE [Architect SWE Skills]
        direction LR
      style Skills_Architect_SWE fill:#f0f0f0,stroke:#333,stroke-width:1px;
        l1["System Design"]
        l2["Architecture Patterns"]
        l3["Scalability"]
        l4["Tech Leadership"]
    end
    Architect_SWE--> Skills_Architect_SWE
    subgraph Skills_Principal_SWE [Principal SWE Skills]
        direction LR
       style Skills_Principal_SWE fill:#f0f0f0,stroke:#333,stroke-width:1px;
        m1["Tech Vision"]
        m2["Strategy"]
        m3["Industry Focus"]
        m4["Mentoring"]
    end
     Principal_SWE-->Skills_Principal_SWE
    subgraph Skills_Principal_Architect [Principal Architect Skills]
        direction LR
        style Skills_Principal_Architect fill:#f0f0f0,stroke:#333,stroke-width:1px;
        n1["Solution Vision"]
        n2["System Vision"]
        n3["Tech Innovation"]
        n4["Arch. Leadership"]
    end
     Principal_Architect--> Skills_Principal_Architect
    subgraph Skills_Senior_SWE [Senior SWE Skills]
         direction LR
       style Skills_Senior_SWE fill:#f0f0f0,stroke:#333,stroke-width:1px;
        d1["Multi-Tech Skills"]
        d2["System Design"]
        d3["Tech Direction"]
        d4["Lead & Mentor"]
        d5["Tech Guidance"]
        d6["Communication"]
        d7["Project Management"]
        d8["System Design"]
        d9["Prioritization"]
    end
    Senior_SWE--> Skills_Senior_SWE
    subgraph Skills_Tech_Lead [Tech Lead Skills]
        direction LR
        style Skills_Tech_Lead fill:#f0f0f0,stroke:#333,stroke-width:1px;
        e1["Tech Leadership"]
        e2["Project Delegation"]
        e3["Planning Skills"]
        e4["Stakeholder Comm"]
        e5["Tech Mentoring"]
        e6["Conflict Skills"]
       e7["Team Motivation"]
       e8["Domain Knowledge"]
    end
    Tech_Lead--> Skills_Tech_Lead
   subgraph Skills_SWE_Managerial [Management Track Skills]
      direction LR
       style Skills_SWE_Managerial fill:#f0f0f0,stroke:#333,stroke-width:1px;
       h1["Basic Mgmt Skills"]
       h2["Team Development"]
        h3["Performance Mgmt"]
        h4["Strategic Skills"]
    end
    SWE_Managerial-->Skills_SWE_Managerial
    subgraph Skills_Engineering_Manager [Manager Skills]
        direction TB
        style Skills_Engineering_Manager fill:#f0f0f0,stroke:#333,stroke-width:1px;
        f1["People Management"]
        f2["Performance Mgmt"]
        f3["Strategic Execution"]
        f4["Recruitment"]
        f5["Budget Management"]
        f6["Stakeholder Management"]
       f7["Process Improvement"]
      f8["Conflict Resolution"]
        f9["Company Awareness"]
    end
     Engineering_Manager--> Skills_Engineering_Manager

`;



const CareerRoadMap = () => {

    const [currentRole, setCurrentRole] = useState(null);
    const [targetRole, setTargetRole] = useState(null);

    const [mainData, setMainData] = useState();

    const setData = () => {
        (currentRole === null && targetRole === null) ? setMainData(markdownData) : setMainData(markdownSpecifiedData);
    }

    return (
        <div>
            <Navbar />
            <div className='p-4 align-center flex flex-col justify-center items-center'>
                <img src={Light} alt='Light' className='absolute left-0 top-10 w-1/12' />
                <h1 className='font-semibold text-3xl p-3' >Career RoadMap</h1>
                <p className='p-2'>Explore potential roles and plan your growth step-by-step !</p>
                <div className='flex justify-center items-center p-4 w-2/3'>
                    <input type='text' placeholder='Your current role(Fresher)'
                        className='p-2 m-2 border-2 rounded-md w-full' />
                    <input type='text' placeholder='Your target role(Software Engineer)'
                        className='p-2 m-2 border-2 rounded-md w-full' />
                    <button
                        onClick={() => {
                            setCurrentRole(document.querySelector('input[placeholder="Your current role(Fresher)"]').value);
                            setTargetRole(document.querySelector('input[placeholder="Your target role(Software Engineer)"]').value);
                            setData();
                        }}
                        className="flex justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all w-80 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700"
                    >
                        <span>View All Path!</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
            <Graph data={mainData} />
        </div>
    );
};

export default CareerRoadMap;
