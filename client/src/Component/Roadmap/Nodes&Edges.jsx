// import nodeData from "./Data";

import { learningRoadmap as nodeData } from "./Data";

const ReactFlowNode = [];
const ReactFlowEdge = [];

var mainY = 140, detailYLeft = 75, detailYRight = 75, nodeDistance = 70;

ReactFlowNode.push({
    id: "start",
    position: { x: 600, y: 10 },
    data: { label: "START" },
    type: "input",
    style: { fontWeight: "bold", fontSize: "12px" },
    className: "node",
});


// push the middle nodes
nodeData.map((node, index) => {
    var sizeOfDetails = node.details.length;

    const posY = (((sizeOfDetails) / 4)) * (nodeDistance - 15);
    mainY = mainY + posY;
    ReactFlowNode.push({
        id: `${node.id}`,
        position: { x: 600, y: mainY },
        data: { label: node.name },
        style: { backgroundColor: "#F6C794", fontWeight: "bold", fontSize: "12px" },
        sourcePosition: 'right',
        targetPosition: 'left',
        className: "node",
    })
    mainY = mainY + posY;

    const name = `node-side-${index % 5}`;

    if (node.details) {
        node.details.forEach((detail, index) => {
            let position, sourcePosition, targetPosition;
            if (index % 2 === 0) {
                position = { x: 300, y: detailYLeft };
                detailYLeft = detailYLeft + nodeDistance;
                sourcePosition = 'right';
                targetPosition = 'right';
            } else {
                position = { x: 900, y: detailYRight };
                detailYRight = detailYRight + nodeDistance;
                sourcePosition = 'left';
                targetPosition = 'left';
            }
            ReactFlowNode.push({
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
})

console.log(ReactFlowNode);

nodeData.map((node) => {

    node.details.forEach((detail, index) => {
        var source = (index % 2 === 0) ? `${node.id}${index}${index}` : `${node.id}`;
        var target = (index % 2 === 0) ? `${node.id}` : `${node.id}${index}${index}`;
        ReactFlowEdge.push({
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


ReactFlowNode.push({
    id: "end",
    position: { x: 600, y: mainY },
    data: { label: "END" },
    type: "output",
    style: { backgroundColor: "#F6C794", fontWeight: "bold", fontSize: "12px" },
    className: "node-hover",
});

ReactFlowEdge.push({
    id: "start-end",
    source: "start",
    target: "end",
    animated: true,
    arrowHeadType: "arrowclosed",
    style: { stroke: "#B771E5", strokeWidth: "2px" },
    sourceHandle: "right",
    targetHandle: "left",
});

console.log(ReactFlowEdge);

export const nodes = ReactFlowNode;
export const edges = ReactFlowEdge;
