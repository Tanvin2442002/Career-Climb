import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { ReactFlowProvider, useReactFlow, Background } from "reactflow";
import '@xyflow/react/dist/style.css';
import "../../index.css";
import useNodesEdges from "./Nodes&Edges"; // Import the custom hook
import Loader from "../../UI/Loader";


const RoadmapFlow = ({ current, destination, setSidebarVisible, setInfo, setLoading }) => {
    const { nodes, edges, height, loading, error } = useNodesEdges(current, destination);

    const [containerHeight, setContainerHeight] = useState(500);
    const reactFlowWrapper = useRef(null);
    const { fitView } = useReactFlow();

    useEffect(() => {
        const minHeight = 700; // Ensures at least 500px height
        const dynamicHeight = Math.max(nodes.length * 80, minHeight);
        setContainerHeight(dynamicHeight);
        setLoading(loading);
    }, [nodes]);

    useEffect(() => {
        setTimeout(() => {
            fitView({ padding: 0.5, duration: 1000 });
        }, 1000); // Delay to ensure proper calculation
    }, [nodes, edges]);


    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        console.log("Scroll Position:", scrollPosition);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleNodeClick = async (event, node) => {
        setSidebarVisible(true);
        const data = {
            current: current,
            destination: destination,
            details: node.data.label
        }
        setInfo(data);
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
            <div ref={reactFlowWrapper} className={`flex flex-col justify-center items-center`}>
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
            
        </>
    );
};

const Roadmap = ({ current, destination, setSidebarVisible, setInfo, setLoading }) => (
    <ReactFlowProvider>
        <RoadmapFlow
            current={current}
            destination={destination}
            setSidebarVisible={setSidebarVisible}
            setInfo={setInfo}
            setLoading={setLoading}
        />
    </ReactFlowProvider>

);

export default Roadmap;
