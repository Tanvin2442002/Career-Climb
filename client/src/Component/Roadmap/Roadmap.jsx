import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { ReactFlowProvider, useReactFlow, Background } from "reactflow";
import '@xyflow/react/dist/style.css';
import "../../index.css";
import useNodesEdges from "./Nodes&Edges"; // Import the custom hook
import Loader from "../../UI/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const RoadmapFlow = ({ current, destination, setLoading }) => {
    const { nodes, edges, height, loading, error } = useNodesEdges(current, destination);

    const [containerHeight, setContainerHeight] = useState(500);
    const reactFlowWrapper = useRef(null);
    const { fitView } = useReactFlow();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [thinking, setThinking] = useState(false);
    const [introduction, setIntroduction] = useState({});
    const [importance, setImportance] = useState({});
    const [application, setApplication] = useState([]);
    const [resources, setResources] = useState([]);
    const [nextSteps, setNextSteps] = useState([]);


    useEffect(() => {
        const minHeight = 700; // Ensures at least 500px height
        const dynamicHeight = Math.max(nodes.length * 80, minHeight);
        setContainerHeight(dynamicHeight);
    }, [nodes]);

    useEffect(() => {
        setTimeout(() => {
            fitView({ padding: 0.5, duration: 1000 });
        }, 1000); // Delay to ensure proper calculation
    }, [nodes, edges]);

    useEffect(() => {
        setLoading(loading);
    }, [loading, setLoading]);



    const fetchDetails = async (role) => {
        try {
            const response = await fetch(`http://localhost:5000/roadmap/details?from=${current}&to=${destination}&details=${role}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received Response:", data.response);
            return data.response || [];
        } catch (error) {
            throw error;
        }
    }


    const handleNodeClick = async (event, node) => {
        setSidebarVisible(true);
        setThinking(true);
        setImportance({});
        setIntroduction({});
        setApplication([]);
        setResources([]);
        setNextSteps([]);
        const details = await fetchDetails(node.data.label);
        // const details = tempDetails[0];
        console.log("details:", details);
        details.map((info, index) => {
            console.log("info:", info);
            console.log(info.introduction);
            if (info.introduction) {
                setIntroduction(info.introduction);
            }
            if (info.importance) {
                setImportance(info.importance);
            }
            if (info.resources) {
                setResources(info.resources);
            }
            if (info.application) {
                setApplication(info.application);
            }
            if (info.nextSteps) {
                setNextSteps(info.nextSteps);
            }
        });
        setThinking(false);
        console.log("introduction:", introduction);
        console.log("importance:", importance);
        console.log("resources:", resources);
        console.log("application:", application);
        console.log("nextSteps:", nextSteps);
        console.log(node);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-start h-screen">
                <Loader message="Generating your roadmap..." />
            </div>
        );
    }
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div ref={reactFlowWrapper} className={`flex flex-col justify-center items-center ${sidebarVisible ? 'blur-md' : ''}`}>
                <div className="w-full bg-gray-100 overflow-auto" style={{ height: containerHeight }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        fitView
                        defaultViewport={{ x: 0, y: 0, zoom: 3 }}
                        zoomOnScroll={false}
                        zoomOnPinch={false}
                        panOnScroll={false}
                        nodesDraggable={false}
                        elementsSelectable={false}
                        panOnDrag={false}
                        zoomOnDoubleClick={false}
                        preventScrolling={false}
                        minZoom={1}
                        onNodeClick={handleNodeClick}
                    >
                        <Background />
                    </ReactFlow>
                </div>
            </div>
            {sidebarVisible && (
                <div className="flex absolute right-0 top-16 w-full min-h-[95vh] justify-center items-center">
                    {thinking && <Loader message="Thinking..." />}
                    {!thinking && (
                        <div className="p-4 absolute right-0 top-0 bg-gray-100 rounded-lg w-5/12 shadow-lg">
                            <h3 className="text-2xl font-bold text-green uppercase text-center font-Bai_Jamjuree underline tracking-wider p-2">DETAILS</h3>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">{introduction.title}:</h3>
                                <p>{introduction.description}</p>
                            </div>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">{importance.title}:</h3>
                                <p>{importance.description}</p>
                            </div>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">Resources:</h3>
                                {resources.map((resource, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-l">{resource.title}: <span className="font-normal">{resource.description}</span></p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">Application:</h3>
                                {application.map((app, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-l">{app.title}: <span className="font-normal">{app.description}</span></p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">Next Steps:</h3>
                                {nextSteps.map((step, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-l">{step.concept}: <span className="font-normal">{step.description}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <FontAwesomeIcon icon={faXmark} color="red" className="text-2xl absolute top-0 right-2 cursor-pointer" onClick={() => setSidebarVisible(false)} />
                </div>
            )}
        </>
    );
};

const Roadmap = ({ current, destination, setLoading }) => (
    <ReactFlowProvider>
        <RoadmapFlow current={current} destination={destination} setLoading={setLoading} />
    </ReactFlowProvider>

);

export default Roadmap;
