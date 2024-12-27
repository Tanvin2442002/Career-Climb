import React, { use, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// Gemini api import here from env
const GEMINI_API = process.env.GEMINI_API_KEY;



const markdownData = `
graph LR
    A[Start: CS Fresher] --> B{Explore Core Concepts}
    style A fill:#c6f7c6,stroke:#333,stroke-width:2px
    style B fill:#baf0ba,stroke:#333,stroke-width:2px

    B --> C[Choose Focus Area]
    style C fill:#b3e9b3,stroke:#333,stroke-width:2px

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


// recieve data from CareerRoadmap.jsx
const Graph = ({ currentRole, targetRole }) => {
    const mermaidRef = useRef(null);
    console.log(currentRole, targetRole);
    useEffect(() => {
        const generateMermaid = async () => {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ markdownData }),
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    }, []);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            callback: function (id) {
                console.log(`Callback triggered for ID: ${id}`);
            },
            flowchart: {
                width: 800,
                height: 600,
                // ... other config options
            }
        });
        // Bind the click handlers dynamically
        mermaid.contentLoaded();

        // Custom event handlers for nodes
        window.handleNodeClick = (nodeTitle) => {
            console.log(`You clicked on: ${nodeTitle}`);
        };
        // Add event listeners to the nodes
        const addClickHandlers = () => {
            const nodes = document.querySelectorAll('.node');
            nodes.forEach(node => {
                node.addEventListener('click', () => {
                    const titleElement = node.querySelector('.label');
                    if (titleElement) {
                        const nodeTitle = titleElement.textContent;
                        window.handleNodeClick(nodeTitle);
                    } else {
                        console.error('Label element not found in node:', node);
                    }
                });
            });
        };

        // Ensure handlers are added after the content is loaded
        setTimeout(addClickHandlers, 1000);
    }, []);

    return (
        <div className='relative p-4 align-center flex flex-col justify-center items-start w-full  bg-slate-100'>
            <TransformWrapper
                defaultScale={1} defaultPositionX={200} defaultPositionY={100} wheel={{ step: 100 }}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div className="flex flex-col absolute z-10 right-0 top-0 justify-center items-center p-4 gap-2">
                            <button
                                onClick={() => zoomIn()}
                                className="justify-center items-center space-x-2 px-3 py-1 rounded-md font-normal text-sm shadow-lg transition-all w-12 h-10 duration-250 overflow-hidde group hover:shadow-xl hover:bg-blue-100"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                {/* <span>Zoom In</span> */}
                            </button>
                            <button
                                onClick={() => zoomOut()}
                                className="justify-center items-center space-x-2 px-3 py-1 rounded-md font-normal text-sm shadow-lg transition-all w-12 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-blue-100"
                            >
                                <FontAwesomeIcon icon={faMinus} />
                                {/* <span>Zoom Out</span> */}
                            </button>
                            <button
                                onClick={() => resetTransform()}
                                className="justify-center items-center space-x-2 px-3 py-1 rounded-md font-normal text-sm shadow-lg transition-all w-15 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-blue-100"
                            >
                                <span>Reset</span>
                            </button>

                        </div>
                        <TransformComponent >
                            <div className='mermaid w-[90vw]' ref={mermaidRef}>
                                {markdownData}
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
};

export default Graph;
