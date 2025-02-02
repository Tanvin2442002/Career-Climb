import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { ReactFlowProvider, useReactFlow, Background } from "reactflow";
import '@xyflow/react/dist/style.css';
import "../../index.css";

// import { nodes, edges } from "./Nodes&Edges";

import NodeUI from "./NodeUI";


const nodeTypes = {
    custom: NodeUI,
};


const RoadmapFlow = () => {
    const [containerHeight, setContainerHeight] = useState(500);
    const reactFlowWrapper = useRef(null);
    const { fitView } = useReactFlow();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    
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
    
    const handleNodeClick = (event, node) => {
        alert(`Clicked node ${node.data?.label}`);
    };
    
    return (
        <div ref={reactFlowWrapper} className="flex flex-col justify-center items-center" style={{ height: containerHeight }}>
            <div className="w-full bg-gray-100 overflow-auto" style={{ height: containerHeight }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                    defaultViewport={{x: 0, y: 0, zoom: 3}}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    panOnScroll={false}
                    nodesDraggable={false}
                    elementsSelectable={false}
                    panOnDrag={false}
                    nodeTypes={nodeTypes}
                    zoomOnDoubleClick={false}
                    preventScrolling={false}
                    minZoom={1}
                    onNodeClick={handleNodeClick}
                    >
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

const Roadmap = () => (
    <ReactFlowProvider>
        <RoadmapFlow />
    </ReactFlowProvider>
);

export default Roadmap;

export { nodeTypes };