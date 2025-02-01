import React, { useState, useCallback } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodeId,
} from "reactflow";
// import "reactflow/dist/style.css";
import '@xyflow/react/dist/style.css';
import "../../index.css";

// import { nodes, edges } from "./Nodes&Edges";
import { nodes, edges } from "./temp";

console.log(nodes);
console.log(edges);


const Roadmap = () => {
    const handleNodeClick = (event, node) => {
        alert(`Clicked node ${node.data?.label}`);
    }

    return (
        <div className="h-[200vh] flex flex-col justify-center items-center">
            <div className={`h-[200vh] w-full bg-gray-100 overflow-hidden
                onWheel={handleWheel}`}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
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
                </ReactFlow>
            </div>

            {/* <div className="h-[200vh] w-full bg-green opacity-20">
                <h1>Hello</h1>
            </div> */}
        </div>
    );
};

export default Roadmap;
