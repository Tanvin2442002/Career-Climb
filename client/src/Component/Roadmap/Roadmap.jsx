import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactFlow, { ReactFlowProvider, useReactFlow, Background, Controls } from "reactflow";
import 'reactflow/dist/style.css';
import "../../index.css";
import useNodesEdges from "./Nodes&Edges"; 
import Loader from "../../UI/Loader";
import Error from "../../UI/Error";

import ColorSelectorNode from "./[UIDetails]";


const RoadmapFlow = ({ current, destination, setSidebarVisible, setInfo, setLoading, load }) => {
    const { nodes, edges, height, loading, error } = useNodesEdges(current, destination);


    const nodeTypes = useMemo(
        () => ({
            myCustomNode: ColorSelectorNode,
        }),
        [],
    );

    const snapGrid = [20, 20];
    const [containerHeight, setContainerHeight] = useState(500);
    const reactFlowWrapper = useRef(null);
    

    useEffect(() => {
        const minHeight = 700; 
        const dynamicHeight = Math.max(nodes.length * 40, minHeight);
        setContainerHeight(dynamicHeight);
        setLoading(loading);
    }, [nodes, loading, setLoading]);



    const handleNodeClick = async (event, node) => {
        setSidebarVisible(true);
        const data = {
            current: current,
            destination: destination,
            details: node.data.label
        }
        setInfo(data);
    };

    if (loading || load) {
        return (
            <div className="flex justify-center items-start h-screen">
                <Loader message="Generating your roadmap..." />
            </div>
        );
    }
    if (error) {
        setLoading(false);
        return (
            <div>
                <Error message = " your roadmap :(" btn = {false} />
            </div>
        );

    }
    return (
        <>
            <div ref={reactFlowWrapper} className={`flex flex-col overflow-x-visible justify-center items-center`}>
                <div className="w-full md:w-[98vw] overflow-hidden bg-gray-100 rounded-md relative" style={{ height: containerHeight }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        // fitView
                        // initialViewState={{ x: 0, y: 0, zoom: 1 }}
                        nodeTypes={nodeTypes}
                        zoomOnScroll={false}
                        zoomOnPinch={false}
                        panOnScroll={false}
                        nodesDraggable={false}
                        // elementsSelectable={false}
                        zoomOnDoubleClick={false}
                        preventScrolling={false}
                        snapToGrid={true}
                        snapGrid={snapGrid}
                        // panOnDrag={false}
                        // minZoom={1}
                        onNodeClick={handleNodeClick}
                    >
                        <Background />
                        <Controls position="top"/>
                    </ReactFlow>
                </div>
            </div>
            
        </>
    );
};

const Roadmap = ({ current, destination, setSidebarVisible, setInfo, setLoading, load }) => (
    <ReactFlowProvider
    >
        <RoadmapFlow
            current={current}
            destination={destination}
            setSidebarVisible={setSidebarVisible}
            setInfo={setInfo}
            setLoading={setLoading}
            load={load}
        />
    </ReactFlowProvider>

);

export default Roadmap;
