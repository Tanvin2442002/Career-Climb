import { use, useEffect, useMemo, useState } from "react";
import ColorSelectorNode from "./[UIDetails]";
import useData from "./Data";

const useNodesEdges = (current, destination) => {

    var { data, loading, error } = useData(current, destination);

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [height, setHeight] = useState(0);
    
    const nodeTypes = useMemo(
        () => ({
            myCustomNode: ColorSelectorNode,
        }),
        [],
    );


    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (!data.length) {
            return;
        }
        let mainY = 50, detailYLeft = 75, detailYRight = 75, nodeDistance = 70;
        const newNodes = [];
        const newEdges = [];
        const centerX = width / 2 - 90;
        const Half = Math.floor(centerX / 2);

        newNodes.push({
            id: "start",
            position: { x: centerX, y: 10 },
            // data: { label: current },
            data: { label: current, className: "node" },
            style: { fontWeight: "bold", fontSize: "12px" },
            type: "myCustomNode",
        });

        data.forEach((node, index) => {
            let sizeOfDetails = node.details.length;
            const posY = ((sizeOfDetails) / 4) * (nodeDistance - 15);
            mainY += posY;

            newNodes.push({
                id: `${node.id}`,
                position: { x: centerX, y: mainY },
                data: { label: node.name, className: "node" },
                style: { backgroundColor: "#F6C794", fontWeight: "bold", fontSize: "12px" },
                sourcePosition: 'right',
                targetPosition: 'left',
                className: "node",
                type: "myCustomNode",
            });

            mainY += posY;
            let name = `node-side-${index % 5}`;

            if (node.details) {
                node.details.forEach((detail, index) => {
                    let position, sourcePosition, targetPosition;

                    if (index % 2 === 0) {
                        position = { x: centerX - Half - 200, y: detailYLeft };
                        detailYLeft += nodeDistance;
                        sourcePosition = 'right';
                        targetPosition = 'right';
                    } else {
                        position = { x: centerX + Half + 50, y: detailYRight };
                        detailYRight += nodeDistance;
                        sourcePosition = 'left';
                        targetPosition = 'left';
                    }

                    newNodes.push({
                        id: `${node.id}${index}${index}`,
                        position: position,
                        data: { label: detail, className: name },
                        sourcePosition: sourcePosition,
                        targetPosition: targetPosition,
                        type: "myCustomNode",
                        style: { backgroundColor: "#D3D3D3", fontWeight: "normal", fontSize: "10px" },
                        className: name,
                    });
                });
            }

            detailYLeft += 50;
            detailYRight += 50;
            const MaxY = Math.max(detailYLeft, detailYRight);
            detailYLeft = MaxY;
            detailYRight = MaxY;
            mainY = MaxY;
            setHeight(MaxY);
        });

        data.forEach((node) => {
            node.details.forEach((detail, index) => {
                let source = index % 2 === 0 ? `${node.id}${index}${index}` : `${node.id}`;
                let target = index % 2 === 0 ? `${node.id}` : `${node.id}${index}${index}`;
                newEdges.push({
                    id: `${node.id}${index}`,
                    source: source,
                    target: target,
                    animated: true,
                    arrowHeadType: "arrowclosed",
                    style: { stroke: "#B771E5" },
                    sourceHandle: "source-r",
                    targetHandle: "target-a",
                });
            });
        });

        newNodes.push({
            id: "end",
            position: { x: centerX, y: mainY },
            data: { label: destination, className: "node" },
            type: "myCustomNode",
        });

        newEdges.push({
            id: "start-end",
            source: "start",
            target: "end",
            animated: true,
            arrowHeadType: "arrowclosed",
            style: { stroke: "#B771E5", strokeWidth: "2px" },
            sourceHandle: "source-b",
            targetHandle: "target-b",
        });

        setNodes(newNodes);
        setEdges(newEdges);
    }, [data, current, destination]);

    return { nodes, edges, height, loading, error };
};

export default useNodesEdges;
