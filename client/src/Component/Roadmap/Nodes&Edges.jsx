import useData from "./Data";
import { useState, useEffect } from "react";

const useNodesEdges = (current, destination) => {

    const { data, loading, error } = useData(current, destination);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!data.length) {
            return;
        }
        let mainY = 140, detailYLeft = 75, detailYRight = 75, nodeDistance = 70;
        const newNodes = [];
        const newEdges = [];

        newNodes.push({
            id: "start",
            position: { x: 600, y: 10 },
            data: { label: current },
            type: "input",
            style: { fontWeight: "bold", fontSize: "12px" },
            className: "node",
        });

        data.forEach((node, index) => {
            let sizeOfDetails = node.details.length;
            const posY = ((sizeOfDetails) / 4) * (nodeDistance - 15);
            mainY += posY;

            newNodes.push({
                id: `${node.id}`,
                position: { x: 600, y: mainY },
                data: { label: node.name },
                style: { backgroundColor: "#F6C794", fontWeight: "bold", fontSize: "12px" },
                sourcePosition: 'right',
                targetPosition: 'left',
                className: "node",
            });

            mainY += posY;
            let name = `node-side-${index % 5}`;

            if (node.details) {
                node.details.forEach((detail, index) => {
                    let position, sourcePosition, targetPosition;

                    if (index % 2 === 0) {
                        position = { x: 300, y: detailYLeft };
                        detailYLeft += nodeDistance;
                        sourcePosition = 'right';
                        targetPosition = 'right';
                    } else {
                        position = { x: 900, y: detailYRight };
                        detailYRight += nodeDistance;
                        sourcePosition = 'left';
                        targetPosition = 'left';
                    }

                    newNodes.push({
                        id: `${node.id}${index}${index}`,
                        position: position,
                        data: { label: detail },
                        sourcePosition: sourcePosition,
                        targetPosition: targetPosition,
                        type: "default",
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
                    sourceHandle: "left",
                    targetHandle: "right",
                });
            });
        });

        newNodes.push({
            id: "end",
            position: { x: 600, y: mainY },
            data: { label: destination },
            type: "output",
            style: { backgroundColor: "#F6C794", fontWeight: "bold", fontSize: "12px" },
            className: "node-hover",
        });

        newEdges.push({
            id: "start-end",
            source: "start",
            target: "end",
            animated: true,
            arrowHeadType: "arrowclosed",
            style: { stroke: "#B771E5", strokeWidth: "2px" },
            sourceHandle: "right",
            targetHandle: "left",
        });

        setNodes(newNodes);
        setEdges(newEdges);
    }, [data, loading]);

    return { nodes, edges, height, loading, error };
};

export default useNodesEdges;
